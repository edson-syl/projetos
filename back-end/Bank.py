import random

limitesaque = 3
transacoes = []

class Cliente:

    def __init__(self, nome, idade, conta, saldo=1500):
        self.nome = nome
        self.idade = idade
        self.conta = conta
        self.saldo = saldo

    def criarConta(self):
        global cliente
        nome = str(input('Informe seu nome: '))
        idade = str(input('Informe sua idade: '))
        conta = random.randint(1000000, 9999999)
        cliente = Cliente(nome, idade, conta)
        print(f'Sua conta foi criada, {cliente.nome}! o numero da sua agencia: {cliente.conta}')
        return cliente

    def sacarDinheiro(self):
        global transacoes
        valor = int(input('Qual valor deseja sacar? '))
        if self.saldo >= valor:
            self.saldo -= valor
            transacoes.append(f'Sacou R${valor},00.')
        else:
            print('Saldo insuficiente! Tente novamente.')

    def depositarDinheiro(self):
        global transacoes
        valor = int(input('Qual valor deseja depositar? '))
        self.saldo += valor
        transacoes.append(f'Depositou R${valor},00.')

    def extratoDinheiro(self):
        global transacoes
        for t in transacoes:
            print(t)
        print(f'Seu saldo atual: R${self.saldo},00')
cliente = Cliente('Indefinido', 0, 00000000)

#SISTEMA DO BANCO
while True:
    print('-'*30)
    print('Banco 24h')
    print('Conta[1]\nSacar[2]\nDepositar[3]\nExtrato[4]\nSair[5]')
    option = int(input('Qual sua escolha: '))
    print('-'*30)
    if option == 1:
        cliente.criarConta()
    elif option == 2:
        if limitesaque >= 1:
            cliente.sacarDinheiro()
            limitesaque -= 1
        else:
            print('Limite de saque alcancado!')
    elif option == 3:
        cliente.depositarDinheiro()
    elif option == 4:
        cliente.extratoDinheiro()
