from utils.database import connect_db, close_db_connection

def get_all_employees():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT id, name, email, department_id FROM management.employees")
        employees = cur.fetchall()
        cur.close()
        conn.close()
        close_db_connection(conn)
        return [{"id": emp[0], "name": emp[1], "email": emp[2], "department_id": emp[3]} for emp in employees]
    else:
        return {"error": "Failed to connect to the database"}