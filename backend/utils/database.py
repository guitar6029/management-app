import psycopg
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

def connect_db():
    try:
        conn = psycopg.connect(
            dbname=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT')
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

def close_db_connection(conn):
    if conn:
        conn.close()