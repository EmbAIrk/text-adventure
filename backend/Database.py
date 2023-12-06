import pymysql
import random
import string

class Database:
    def __init__(self):
        self.connection=pymysql.connect(host='localhost',
                                        user='root',
                                        password='',
                                        db='textadventure')
        self.cursor = self.connection.cursor()


    def fetch_data(self, id):
        '''
        Fetches given data from database
        
        Args:
            id (string): id of data in db
            
        Returns:
            context and notes from database
        '''
        self.cursor.callproc('FetchData',(id))
        return self.cursor.fetchall()

    

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
    
    def close_connection(self):
        self.cursor.close()
        self.connection.close()
    