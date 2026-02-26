import unicodedata


def remover_acentos(texto: str) -> str:
    return ''.join(
        c for c in unicodedata.normalize("NFD", texto)
        if unicodedata.category(c) != "Mn"
    )


investment_keys = [
    "investir",
    "investimento",
    "investindo",
    "aplicar",
    "aplicacao",
    "aporte",
    "rendendo",
    "rendimento",
    "rentabilidade",
    "lucro",
    "juros",
    "retorno",
    "montante",
    "capital",
    "cdb"

]

loan_keys = [
    "emprestimo",
    "emprestado",
    "financiamento",
    "credito",
    "divida",
    "cartao",
    "parcela",
    "parcelamento",
    "prestacao",
    "juros",
    "banco",
    "taxa",
    "saldo",
    "contrato"
]

budget_keys = [
    "orcamento",
    "gasto",
    "despesa",
    "renda",
    "salario",
    "economia",
    "economizar",
    "controle",
    "planejamento",
    "balanco",
    "receita",
    "reserva"
]


def identificar_intencao(mensagem: str) -> str:
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

    if (
        contador_investimento > contador_emprestimo
        and contador_investimento > contador_orcamento
    ):
        return "INVESTIMENTO"

    elif (
        contador_emprestimo > contador_investimento
        and contador_emprestimo > contador_orcamento
    ):
        return "EMPRESTIMO"

    elif (
        contador_orcamento > contador_investimento
        and contador_orcamento > contador_emprestimo
    ):
        return "ORCAMENTO"

    elif (contador_investimento + contador_emprestimo + contador_orcamento) == 0:
        return "NENHUMA"

    else:
        return "MULTIPLA"