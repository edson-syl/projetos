from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import unicodedata
import re
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ultimo_contexto = {"intencao": None, "ultimo_valor_calculado": None}

class ChatRequest(BaseModel):
    message: str


# Keywords
investment_keys = [
    "investir", "investimento", "aplicar",
    "aporte", "rendimento", "rentabilidade",
    "lucro", "juros", "retorno",
    "montante", "capital", "cdb"
]

loan_keys = [
    "emprestimo", "financiamento",
    "credito", "divida", "cartao",
    "parcela", "prestacao", "taxa"
]

budget_keys = [
    "orcamento", "gasto", "despesa",
    "renda", "salario", "economia",
    "receita", "reserva"
]

forbidden_topics = [
    "capital da",
    "presidente",
    "governador",
    "historia",
    "geografia",
    "quem foi",
    "onde fica",
    "populacao",
    "pais",
    "buraco negro",
    "sistema politico"
]


# Utils
def remover_acentos(texto: str) -> str:
    return ''.join(
        c for c in unicodedata.normalize("NFD", texto)
        if unicodedata.category(c) != "Mn"
    )

def palavra_exata(palavra, mensagem):
    return re.search(rf"\b{palavra}\b", mensagem)

def assunto_proibido(mensagem: str) -> bool:
    return any(p in mensagem for p in forbidden_topics)

def normalizar_numero_br(numero_str: str) -> float:
    return float(numero_str.replace(".", "").replace(",", "."))

def juros_compostos(valor: float, taxa: float, meses: int) -> float:
    return valor * (1 + taxa / 100) ** meses

def saldo_orcamento(renda: float, despesas: float) -> float:
    return renda - despesas

def eh_cumprimento(mensagem: str) -> bool:
    return mensagem.strip() in ["oi", "ola", "bom dia", "boa tarde", "boa noite"]

def pergunta_opinativa(mensagem: str) -> bool:
    gatilhos = ["vale a pena", "compensa", "e muito", "e alto", "e bom", "vale"]
    return any(g in mensagem for g in gatilhos)

def tem_contexto_financeiro(mensagem: str) -> bool:
    for lista in [investment_keys, loan_keys, budget_keys]:
        for palavra in lista:
            if palavra_exata(palavra, mensagem):
                return True
    return False


# Fixed responses
def respostas_fixas(mensagem: str):

    if palavra_exata("cdb", mensagem):
        return (
            "CDB (Certificado de Depósito Bancário) é um investimento "
            "de renda fixa onde você empresta dinheiro ao banco "
            "e recebe juros em troca."
        )

    if palavra_exata("investimento", mensagem) or palavra_exata("investir", mensagem):
        return (
            "Investimento é a aplicação de dinheiro com o objetivo "
            "de obter retorno financeiro no futuro."
        )

    if palavra_exata("emprestimo", mensagem):
        return (
            "Empréstimo é quando uma instituição financeira "
            "cede dinheiro a alguém, que deverá devolver "
            "o valor com juros."
        )

    if palavra_exata("orcamento", mensagem):
        return (
            "Orçamento é o planejamento das receitas e despesas "
            "para manter controle financeiro."
        )

    if palavra_exata("juros", mensagem) and not re.search(r"\d", mensagem):
        return (
            "Juros são a remuneração paga pelo uso do dinheiro ao longo do tempo. "
            "Podem ser simples ou compostos."
        )

    if "capital investido" in mensagem:
        return "Capital investido é o valor inicial aplicado em um investimento."

    return None


# Extraction
def extrair_valor(mensagem: str):
    match = re.search(r"(\d[\d\.,]*)", mensagem)
    return normalizar_numero_br(match.group(1)) if match else None

def extrair_taxa(mensagem: str):
    match = re.search(r"(\d[\d\.,]*)\s*%", mensagem)
    return normalizar_numero_br(match.group(1)) if match else None

def extrair_meses(mensagem: str):
    match = re.search(r"(\d+)\s*(mes|meses)", mensagem)
    return int(match.group(1)) if match else None

def extrair_orcamento(mensagem: str):
    renda = re.search(r"(renda|salario|ganho)\D*(\d[\d\.,]*)", mensagem)
    despesa = re.search(r"(despesa|gasto)\D*(\d[\d\.,]*)", mensagem)
    if renda and despesa:
        return (
            normalizar_numero_br(renda.group(2)),
            normalizar_numero_br(despesa.group(2))
        )
    return None


# Ollama
def perguntar_ollama(prompt_usuario: str, modo_calculo: bool = False):
    try:
        resp = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi3:mini",
                "prompt": f"""
                Você é um assistente financeiro objetivo e direto.
                Responda de forma clara, sem enrolação.
                Se não souber algo, diga que não sabe.
                Não invente informações.
                Não saia do tema financeiro.

                Pergunta: {prompt_usuario}

                Resposta:
                """,
                "stream": False,
                 "options": {
                    "temperature": 0.3,
                    "num_predict": 200,
                    "top_p": 0.9
                }
            },
            timeout=90
        )
        return resp.json().get("response", "").strip()
    except:
        return "No momento não consegui acessar o modelo de IA. Tente novamente."


# Intent
def identificar_intencao(mensagem: str) -> str:
    contador_investimento = sum(1 for p in investment_keys if p in mensagem)
    contador_emprestimo = sum(1 for p in loan_keys if p in mensagem)
    contador_orcamento = sum(1 for p in budget_keys if p in mensagem)

    if contador_investimento > contador_emprestimo and contador_investimento > contador_orcamento:
        return "INVESTIMENTO"

    elif contador_emprestimo > contador_investimento and contador_emprestimo > contador_orcamento:
        return "EMPRESTIMO"

    elif contador_orcamento > contador_investimento and contador_orcamento > contador_emprestimo:
        return "ORCAMENTO"

    elif (contador_investimento + contador_emprestimo + contador_orcamento) == 0:
        return "NENHUMA"

    else:
        return "MULTIPLA"


@app.post("/chat")
def chat(msg: ChatRequest):
    global ultimo_contexto

    mensagem_original = msg.message
    mensagem = remover_acentos(mensagem_original.lower())

    # Forbidden check
    if assunto_proibido(mensagem):
        return {"response": (
            "Sou um assistente financeiro e só posso responder perguntas sobre investimentos, orçamento ou empréstimos.\n\n"
            "Se quiser, posso:\n"
            "- Simular um investimento\n"
            "- Calcular juros\n"
            "- Explicar um produto financeiro\n"
            "- Analisar orçamento\n\n"
            "Como posso te ajudar dentro da área financeira?"
        )}

    # Greetings
    cumprimentos = ["oi", "ola", "opa", "e ai", "bom dia", "boa tarde", "boa noite"]
    if mensagem.strip() in cumprimentos:
        return {"response": (
            "Olá! 👋\nSou um assistente financeiro.\n"
            "Posso ajudar com investimentos, juros, orçamento ou explicar produtos financeiros.\n\n"
            "O que você gostaria de simular hoje?"
        )}

    intencao = identificar_intencao(mensagem)
    valor = extrair_valor(mensagem)
    taxa = extrair_taxa(mensagem)
    meses = extrair_meses(mensagem)

    # Calculation
    if valor and taxa and meses:
        resultado = juros_compostos(valor, taxa, meses)

        ultimo_contexto.update({
            "intencao": intencao,
            "ultimo_valor_calculado": resultado
        })

        if pergunta_opinativa(mensagem):
            return {
                "response": (
                    f"Valor final: R$ {resultado:.2f}\n\n"
                    "Agora, se vale a pena depende do risco, inflação e alternativas disponíveis.\n"
                    "Para renda fixa, essa taxa pode ser considerada atrativa se estiver acima da média do mercado."
                )
            }

        return {"response": f"Valor final: R$ {resultado:.2f}"}

    # Budget
    if intencao == "ORCAMENTO":
        dados = extrair_orcamento(mensagem)
        if dados:
            renda, despesas = dados
            saldo = saldo_orcamento(renda, despesas)

            ultimo_contexto.update({
                "intencao": "ORCAMENTO",
                "ultimo_valor_calculado": saldo
            })

            return {"response": f"Saldo final: R$ {saldo:.2f}"}

    # Concept questions
    if intencao in ["INVESTIMENTO", "EMPRESTIMO", "ORCAMENTO"]:
        return {"response": perguntar_ollama(mensagem_original, modo_calculo=False)}

    # Fixed answers
    resposta_fixa = respostas_fixas(mensagem)
    if resposta_fixa:
        return {"response": resposta_fixa}

    # Rate only
    taxa_isolada = extrair_taxa(mensagem)

    if taxa_isolada and not (valor and meses):
        
        if taxa_isolada < 1:
            analise = "é considerada baixa para padrões mensais."
        elif 1 <= taxa_isolada <= 2:
            analise = "é considerada moderada para renda fixa."
        elif 2 < taxa_isolada <= 5:
            analise = "é considerada alta para renda fixa tradicional."
        else:
            analise = "é extremamente alta e exige atenção ao risco envolvido."

        return {
            "response": (
                f"{taxa_isolada}% ao mês {analise}\n\n"
                "É importante avaliar risco, inflação e tipo de investimento."
            )
        }

    # Default block
    return {"response": (
        "Sou um assistente financeiro e só posso responder perguntas sobre investimentos, orçamento ou empréstimos.\n\n"
        "Se quiser, posso:\n"
        "- Simular um investimento\n"
        "- Calcular juros\n"
        "- Analisar orçamento\n\n"
        "Como posso te ajudar dentro da área financeira?"
    )}