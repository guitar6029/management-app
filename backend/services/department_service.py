from utils.database import connect_db, close_db_connection

async def get_all_departments():
    conn = await connect_db()
    if conn:
        try:
            departments = await conn.fetch("SELECT id, name FROM management.departments")
            return [{"id": dept["id"], "name": dept["name"]} for dept in departments]
        finally:
            await close_db_connection(conn)
    else:
        return {"error": "Failed to connect to the database"}
