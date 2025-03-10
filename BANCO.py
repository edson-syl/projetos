saldo = 1500
operacoes = []


def sacarValor(valor):
    global saldo
    if saldo > valor:
        saldo -= valor
        return saldo
    else: 
        print('Saldo Insuficiente!')

def depositarValor(valor):
    global saldo
    valor + saldo
    return saldo

while True:   
    print('Banco 24h')
    print('Sacar[1]\nDepositar[2]\nExtrato[3]\nSair[4]')
    option = int(input('Qual sua escolha: '))
    if option == 1:
        num = int(input('Qual valor deseja sacar?'))
        sacarValor(num)
        operacoes.append(f"Voce sacou R${num},00.")
    elif option == 2:
        num = int(input('Quanto deseja depositar? '))
        depositarValor(num)
        operacoes.append(f'Voce depositou R${num},00.')
    elif option == 3:
        print('='*30)
        for operacao in operacoes:
            print(operacao)
        print(f'Seu saldo atual: R${saldo},00.')
        print('='*30)
    else:
        print('Escolha invalida! Tente Novamente.')
    