from utils.database import connect_db, close_db_connection

async def get_all_sales():
    conn = await connect_db()
    if conn:
        try:
            sales = await conn.fetch("SELECT id, TO_CHAR(date_of_sale, 'YYYY-MM-DD') AS date_of_sale, amount FROM management.sales")
            return [{"id": sale["id"], "date_of_sale": sale["date_of_sale"], "amount": sale["amount"]} for sale in sales]
        finally:
            await close_db_connection(conn)
    else:
        return {"error": "Failed to connect to the database"}
