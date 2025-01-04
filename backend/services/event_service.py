from utils.database import connect_db, close_db_connection

async def get_all_events():
    conn = await connect_db()
    if conn:
        try:
            events = await conn.fetch("SELECT id, description, date_of_event, mandatory, event_info FROM management.events")
            return [{"id": event["id"],
                     "description": event["description"],
                     "date_of_event": event["date_of_event"],
                     "mandatory": event["mandatory"],
                     "event_info": event["event_info"]} for event in events]
        finally:
            await close_db_connection(conn)
    else:
        return {"error": "Failed to connect to the database"}
