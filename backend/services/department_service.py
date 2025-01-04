from utils.database import connect_db, close_db_connection

def get_all_departments():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT id, name FROM management.departments")
        departments = cur.fetchall()
        cur.close()
        conn.close()
        close_db_connection(conn)
        return [{"id": dept[0], "name": dept[1]} for dept in departments]
    else:
        return {"error": "Failed to connect to the database"}
