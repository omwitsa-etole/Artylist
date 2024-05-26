import mysql.connector
from mysql.connector import Error

class DatabaseManager:
    #HOST = 'localhost'
    #DATABASE = 'fuel_dev'
    #USER = 'root'
    #PASSWORD = ''
    HOST = 'us-cluster-east-01.k8s.cleardb.net'
    DATABASE = 'heroku_58be2b765398fae'
    USER = 'bfce925e1451e3'
    PASSWORD = '581027cd'

    @staticmethod
    def connect():
        """Establishes a connection to the MySQL database."""
        try:
            connection = mysql.connector.connect(
                host=DatabaseManager.HOST,
                database=DatabaseManager.DATABASE,
                user=DatabaseManager.USER,
                password=DatabaseManager.PASSWORD
            )
            if connection.is_connected():
                return connection
        except Error as e:
            print(f"Error while connecting to MySQL: {e}")
            return None

    @staticmethod
    def create_table():
        """Creates a sample table."""
        conn = DatabaseManager.connect()
        if conn is None:
            return

        try:
            pass
        except Error as e:
            print(f"Error creating table: {e}")
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def insert(stmt):
        """Inserts a new record into the users table."""
        conn = DatabaseManager.connect()
        if conn is None:
            return None

        try:
            cursor = conn.cursor()
            cursor.execute(stmt)
            conn.commit()
            print(f"Inserted row ID: {cursor.lastrowid}")
            
        except Error as e:
            print(f"Error inserting record: {e}")
            return None
        finally:
            cursor.close()
            conn.close()
            return True

    @staticmethod
    def update(stmt):
        """Updates an existing record in the users table."""
        
        conn = DatabaseManager.connect()
        if conn is None:
            return None

        try:
            cursor = conn.cursor()
            cursor.execute(stmt)
            conn.commit()
            
            print(f"Updated rows: {cursor.rowcount}")
        except Error as e:
            print(f"Error updating record: {e}")
            return None
        finally:
            cursor.close()
            conn.close()
            return True
    @staticmethod
    async def query(stmt):
        conn = DatabaseManager.connect()
        if conn is None:
            return
        result = None
        try:
            cursor = conn.cursor()
            cursor.execute(stmt)
            result = cursor.fetchall()
            
        except Error as e:
            print(f"Error finding record: {e}")
            return None
        finally:
            cursor.close()
            conn.close()
            return result
    @staticmethod
    def find(user_id):
        """Finds a record in the users table by ID."""
        conn = DatabaseManager.connect()
        if conn is None:
            return

        try:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * FROM users WHERE id = %s
            ''', (user_id,))
            result = cursor.fetchone()
            if result:
                print(f"Found user: ID={result[0]}, Name={result[1]}, Age={result[2]}")
            else:
                print("User not found.")
        except Error as e:
            print(f"Error finding record: {e}")
        finally:
            cursor.close()
            conn.close()

