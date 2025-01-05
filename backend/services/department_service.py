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

async def get_all_employees_by_department(department_id):
    conn = await connect_db()
    if conn:
        try:
            employees = await conn.fetch("SELECT id, name, email, department_id, hire_date, position FROM management.employees WHERE department_id = $1", department_id)
            return [{"id": emp["id"], "name": emp["name"], "email": emp["email"], "department_id": emp["department_id"], "hire_date": emp["hire_date"], "position": emp["position"]} for emp in employees]
        finally:
            await close_db_connection(conn)
    else:
        return {"error": "Failed to connect to the database"}
