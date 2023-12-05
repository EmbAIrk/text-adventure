from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session
import random
import string

class Database:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        self.session = Session(self.engine)

    def execute_query(self, query, params=None):
        '''
        Executes given query on database
        
        Args:
            query (string): actual query
            params (dict): dictionary of parameters
            
        Returns:
            result of executed query
        '''
        with self.session.begin() as connection:
            result = connection.execute(text(query), params)
        return result

    def fetch_data(self, id):
        '''
        Fetches given data from database
        
        Args:
            id (string): id of data in db
            
        Returns:
            context and notes from database
        '''
        query = "EXEC FetchData :id"
        result = self.execute_query(query, params={"id": id})
        return result.fetchone()

    def save_data(self, context, notes):
        '''
        Stores given data in database
        
        Args:
            context (list): list of dictionaries that represent the context
            notes (string): information from notes area 
            
        Returns:
            string : id of where data was stored
        '''
        id = ''.join(random.choices(string.ascii_letters, k=20))
        query = "EXEC SaveData :id, :context, :notes"
        self.execute_query(query, params={"id": id, "context": context, "notes": notes})
        return id