import random

saldo = 1500
cliente = {'Nome': 'Indefinido', 'Agencia': 0000000 }
operacoes = []
limitesaques = 3


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

def extratoValor():
    print('='*30)
    global operacoes
    for operacao in operacoes:
        print(operacao)
    print(f'Seu saldo atual: R${saldo},00.')
    print('='*30)

while True:   
    print('-'*30)
    print('Banco 24h')
    print('Conta[1]\nSacar[2]\nDepositar[3]\nExtrato[4]\nSair[5]')
    option = int(input('Qual sua escolha: '))
    print('-'*30)
    if option == 1:
        if cliente['Nome'] == 'Indefinido':
           option = input('Voce nao tem conta corrente! Deseja abrir uma? S/N: ')
           if option == 'S' or 's':
               nome = str(input('Qual seu nome? '))
               cliente['Nome'] = nome
               for i in range(7):
                   num = int(random.randint(0, 9))
                   cliente['Agencia'] = cliente['Agencia'] *10 + num
        else:
            print('Sua conta: ')
            for dado in cliente.values():
                print(dado)
    elif option == 2:
        if limitesaques >= 1:
            print('-'*30)
            num = int(input('Qual valor deseja sacar?'))
            sacarValor(num)
            limitesaques -= 1
            operacoes.append(f"Voce sacou R${num},00.")
            print('-'*30)
        else:
            print('Voce ja realizou o numero maximo de saques por dia!')
    elif option == 3:
        print('-'*30)
        num = int(input('Quanto deseja depositar? '))
        depositarValor(num)
        operacoes.append(f'Voce depositou R${num},00.')
        print('-'*30)
    elif option == 4:
        extratoValor()
    elif option == 5:
        break
    else:
        print('Escolha invalida! Tente Novamente.')
    
