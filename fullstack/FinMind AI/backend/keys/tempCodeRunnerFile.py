import unicodedata

def remover_acentos(texto):
    return ''.join(
        c for c in unicodedata.normalize("NFD", texto)
        if unicodedata.category(c) != "Mn"
    )


investment_keys = [
    "investir",
    "investindo",
    "investimento",
    "aplicar",
    "aplicacao",
    "colocar",
    "deixar rendendo",
    "rende",
    "render",
    "rentabilidade",
    "ao ano",
    "ao mes",
    "por mes",
    "por ano",
    "quanto vira",
    "quanto ganharia"
    ]

loan_keys = [
        "emprestimo",
        "emprestado",
        "financiamento",
        "pegar",
        "pegar no banco",
        "parcelas",
        "prestacao",
        "pagar por mes",
        "quanto vou pagar",
        "divida",
        "valor da parcela",
        "taxa do banco"
]

budget_keys = [
        "orcamento",
        "gasto",
        "gastos",
        "despesa",
        "despesas",
        "renda",
        "salario",
        "sobrou",
        "economizar",
        "controle financeiro",
        "organizar dinheiro",
        "quanto estou gastando",
        "planejamento"
]




def identificar_intencao(mensagem: str):

    contador_investimento = 0
    contador_emprestimo = 0
    contador_orcamento = 0

    msg = mensagem.lower()

    for palavra in investment_keys:
        if palavra in msg:
            contador_investimento += 1
    for palavra in loan_keys:
        if palavra in msg:
            contador_emprestimo += 1
    for palavra in budget_keys:
        if palavra in msg:
            contador_orcamento += 1

    if contador_investimento > contador_orcamento and contador_investimento > contador_emprestimo:
        print("INVESTIMENTO")
    elif contador_emprestimo > contador_investimento and contador_emprestimo > contador_orcamento:
        print("EMPRESTIMO")
    elif contador_orcamento > contador_investimento and contador_orcamento > contador_emprestimo:
        print("ORCAMENTO")
    elif ( contador_investimento + contador_emprestimo + contador_orcamento) == 0:
        print("NENHUMA")
    else:
        print("MULTIPLA")

identificar_intencao(remover_acentos("Estou pensando em pegar um empréstimo para investir e melhorar minha renda."))

