from utils.database import connect_db, close_db_connection

async def get_all_employees():
    conn = await connect_db()
    if conn:
        try:
            employees = await conn.fetch("SELECT id, name, email, hire_date department_id FROM management.employees")
            return [{"id": emp["id"], "name": emp["name"], "email": emp["email"], "department_id": emp["department_id"], "hire_date": emp["hire_date"]} for emp in employees]
        finally:
            await close_db_connection(conn)
    else:
        return {"error": "Failed to connect to the database"}

