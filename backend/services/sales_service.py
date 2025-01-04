import psycopg
from utils.database import connect_db, close_db_connection

def get_all_sales():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT id, TO_CHAR(date_of_sale, 'YYYY-MM-DD') AS date_of_sale, amount FROM management.sales")
        sales = cur.fetchall()
        cur.close()
        close_db_connection(conn)
        return [{"id": sale[0], "date_of_sale": sale[1], "amount": sale[2]} for sale in sales]
    else:
        return {"error": "Failed to connect to the database"}
