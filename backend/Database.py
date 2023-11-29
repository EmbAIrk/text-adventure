from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session

class Database:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        self.session = Session(self.engine)

    def execute_query(self, query, params=None):
        with self.session.begin() as connection:
            result = connection.execute(text(query), params)
        return result

    def get_save_data(self, key):
        query = "EXEC GetSaveData :key"
        result = self.execute_query(query, params={"key": key})
        return result.fetchone()

    def save_data(self, key, data):
        query = "EXEC SaveData :key, :data"
        self.execute_query(query, params={"key": key, "data": data})
        return key