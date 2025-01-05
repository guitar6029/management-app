import asyncpg
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

async def connect_db():
    try:
        conn = await asyncpg.connect(
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME'),
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT')
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database : {e}")
        return None

async def close_db_connection(conn):
    if conn:
        await conn.close()
