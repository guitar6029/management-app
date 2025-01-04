import psycopg
from utils.database import connect_db, close_db_connection

def get_all_marketing():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM management.marketing")
        marketing = cur.fetchall()
        cur.close()
        close_db_connection(conn)
        return marketing
    else:
        return {"error": "Failed to connect to the database"}