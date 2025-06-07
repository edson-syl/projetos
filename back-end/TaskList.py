import psycopg2
import datetime


client = psycopg2.connect(
    dbname="TaskList",
    user="postgres",
    password="password",
    host="::1",
    port="5432"
)
cursor = client.cursor()


cursor.execute("""CREATE TABLE IF NOT EXISTS tasks(
               id SERIAL PRIMARY KEY,
               name TEXT NOT NULL,
               date DATE,
               status TEXT NOT NULL
)""")


cursor.execute("""CREATE TABLE IF NOT EXISTS tasks_completed(
               id SERIAL PRIMARY KEY,
               name TEXT NOT NULL,
               date DATE,
               status TEXT NOT NULL
)""")

client.commit()


while True:
    print("-"*80)
    print('TASK LIST \n[1]Add task \n[2]View pending tasks \n[3]View Completed task \n[4]Quit')
    print("-"*80)
    option = input("Your option: ").strip()

    
    if option == "1":
        taskname = input("Task name: ").strip().capitalize()
        taskdate = input("Completion date (MM-DD-YYYY): ")
        taskdatetime = datetime.datetime.strptime(taskdate, "%m-%d-%Y").date()
        cursor.execute("INSERT INTO tasks (name, date, status) VALUES (%s, %s, %s)", 
                       (taskname, taskdatetime, "in progress"))
        client.commit()

    
    elif option == "2":
        cursor.execute('SELECT * FROM tasks')
        pendingtasks = cursor.fetchall()
        for task in pendingtasks:
            taskid = task[0]
            name = task[1]
            date = task[2].strftime("%m/%d/%Y")
            status = task[3]
            print(f"[{taskid}]-{name} [Deadline to complete: ({date}) Status: {status}]")
            optionchecked = input("Mark as completed? [1]YES [2]NO: ").strip()

            if optionchecked == "1":
                taskchecked = input("Task number: ")
                cursor.execute("""INSERT INTO tasks_completed (name, date, status)
                               SELECT name, date, %s FROM tasks WHERE id = %s""", 
                               ("completed", taskchecked))
                cursor.execute("DELETE FROM tasks WHERE id = %s", (taskchecked,))
                client.commit()

    
    elif option == "3":
        cursor.execute("SELECT * FROM tasks_completed")
        completedtasks = cursor.fetchall()
        for task in completedtasks:
            taskid = task[0]
            taskname = task[1]
            taskdate = task[2].strftime("%m/%d/%Y")
            taskstatus = task[3]
            print(f"[{taskid}]-{taskname} [Deadline to complete: ({taskdate}) Status: {taskstatus}]")
        client.commit()

    
    else:
        print("TaskList closed! See you next time!")
        break


cursor.close()
client.close()
