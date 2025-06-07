import psycopg2
from tabulate import tabulate

client = psycopg2.connect(
    dbname = "Stock",
    user = "postgres",
    password = "password",
    host = "::1",
    port = "5432"
)

cursor = client.cursor()

while True:
    print('-'*15)
    print('STOCK')
    print('-'*15)
    print('[1]View stock\n[2]Add item\n[3]Delete item\n[4]Update item\n[5]Quit')
    option = input('Your option: ')

    
    if option == '1':
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS products(
                name TEXT NOT NULL,
                price FLOAT,
                amount INT)""")
        client.commit()
        print('-'*15)
        
        cursor.execute("SELECT * FROM products")
        head = ['NAME', 'PRICE', 'AMOUNT']
        data = cursor.fetchall()
        
        print(tabulate(data, headers=head, tablefmt='grid'))
        print('-'*15)

    
    elif option == '2':
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS products(
            name TEXT NOT NULL,
            price FLOAT,
            amount INT)""")
        client.commit()  
        
        name = input('Product name: ')
        price = float(input('Your price: '))
        amount = int(input('Your quantity: '))
        
        cursor.execute('INSERT INTO products (name, price, amount) VALUES (%s, %s, %s)', (name, price, amount))
        client.commit()

    
    elif option == '3':
        name = input('Product name: ')
        
        cursor.execute("SELECT * FROM products WHERE name = %s", (name,))
        if cursor.fetchone():
            
            cursor.execute('DELETE FROM products WHERE name = %s', (name,))
            print('Product deleted successfully!')
            client.commit()
        else:
            print('Product not found')
    
    
    elif option == '4':
        option = input('[1]Update price\n[2]Update amount\n:')
        name = input('Product name: ')
        if option == '1':
            
            newprice = float(input('New price: '))
            cursor.execute('UPDATE products SET price = %s WHERE name =%s', (newprice, name,))
            print('Item updated successfully!')
            client.commit()
        else:
            
            newamount = int(input('New quantity: '))
            cursor.execute('UPDATE products SET amount = %s WHERE name = %s', (newamount, name,))
            print('Item updated successfully!')
            client.commit()

    
    else:
        print('Stock closed!')
        break
