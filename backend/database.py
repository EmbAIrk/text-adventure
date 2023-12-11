import pymysql
import random
import string

class Database:
    def __init__(self):
        try:
            self.connection=pymysql.connect(host='localhost',
                                            user='root',
                                            password='',
                                            db='textadventure')
            self.cursor = self.connection.cursor()
        except pymysql.OperationalError:
            raise Exception("Database is not running or can not be found.")


    def fetch_data(self, id):
        '''
        Fetches given data from database
        
        Args:
            id (string): id of data in db
        
        Returns:
            context and notes from database
        '''
        # p1 and p2 are required, but don't mean anything. callproc requires these placeholders for the OUT vars, 
        # but they are replaced by the function with @_FetchData_1 and @_FetchData_2
        self.cursor.callproc('FetchData',(id,"p1","p2"))
        self.cursor.execute("SELECT @_FetchData_1, @_FetchData_2")
        result = self.cursor.fetchone()
        context = result[0]
        notes = result[1]
        if (context and notes):
            return {"context": result[0], "notes": result[1]}
        else:
            return None


    def save_data(self, context, notes):
        '''
        Stores given data in database
        
        Args:
            context (list): list of dictionaries that represent the context
            notes (string): information from notes area 
            
        Returns:
            string : id of where data was stored
        '''
        id = ''.join(random.choices(string.ascii_letters, k=16))
        self.cursor.callproc('SaveData',(id,context,notes))
        self.connection.commit()
        return id
    
    
    def close_connection(self):
        '''
        Disconnects database cursor and database.
        '''
        self.cursor.close()
        self.connection.close()
    
