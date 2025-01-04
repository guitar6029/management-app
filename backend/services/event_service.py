import psycopg
from utils.database import connect_db, close_db_connection

def get_all_events():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT id, description, date_of_event, mandatory, event_info FROM management.events")
        events = cur.fetchall()
        cur.close()
        close_db_connection(conn)
        return [{"id": event[0], "description": event[1], "date_of_event": event[2], "mandatory": event[3], "event_info": event[4]} for event in events]
    else:
        return {"error": "Failed to connect to the database"}