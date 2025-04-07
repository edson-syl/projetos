import psycopg2
from tabulate import tabulate

# Establish a connection to the PostgreSQL database
client = psycopg2.connect(
    dbname = "Stock",
    user = "postgres",
    password = "inara1203",
    host = "::1",
    port = "5432"
)

# Create a cursor object to interact with the database
cursor = client.cursor()

# Infinite loop for the menu-driven interface
while True:
    print('-'*15)
    print('STOCK')
    print('-'*15)
    print('[1]View stock\n[2]Add item\n[3]Delete item\n[4]Update item\n[5]Quit')
    option = input('Your option: ')

    # Option 1: View stock
    if option == '1':
        # Create the table if it doesn't already exist
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS products(
                name TEXT NOT NULL,
                price FLOAT,
                amount INT)""")
        client.commit()
        print('-'*15)
        # Fetch all data from the table
        cursor.execute("SELECT * FROM products")
        head = ['NAME', 'PRICE', 'AMOUNT']
        data = cursor.fetchall()
        # Display data in a formatted table
        print(tabulate(data, headers=head, tablefmt='grid'))
        print('-'*15)

    # Option 2: Add a new product to the stock
    elif option == '2':
        # Ensure the table exists before inserting data
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS products(
            name TEXT NOT NULL,
            price FLOAT,
            amount INT)""")
        client.commit()  
        # Get product details from user
        name = input('Product name: ')
        price = float(input('Your price: '))
        amount = int(input('Your quantity: '))
        # Insert the product into the table
        cursor.execute('INSERT INTO products (name, price, amount) VALUES (%s, %s, %s)', (name, price, amount))
        client.commit()

    # Option 3: Delete a product from the stock
    elif option == '3':
        name = input('Product name: ')
        # Check if the product exists
        cursor.execute("SELECT * FROM products WHERE name = %s", (name,))
        if cursor.fetchone():
            # If it exists, delete it
            cursor.execute('DELETE FROM products WHERE name = %s', (name,))
            print('Product deleted successfully!')
            client.commit()
        else:
            print('Product not found')
    
    # Option 4: Update an existing product's price or amount
    elif option == '4':
        option = input('[1]Update price\n[2]Update amount\n:')
        name = input('Product name: ')
        if option == '1':
            # Update price
            newprice = float(input('New price: '))
            cursor.execute('UPDATE products SET price = %s WHERE name =%s', (newprice, name,))
            print('Item updated successfully!')
            client.commit()
        else:
            # Update amount
            newamount = int(input('New quantity: '))
            cursor.execute('UPDATE products SET amount = %s WHERE name = %s', (newamount, name,))
            print('Item updated successfully!')
            client.commit()

    # Option 5 or any other input: Quit the program
    else:
        print('Stock closed!')
        break
