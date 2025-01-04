import psycopg
from utils.database import connect_db, close_db_connection

def get_all_marketing():
    conn = connect_db()
    if conn:
        cur = conn.cursor()
        cur.execute("SELECT id, campaign_name, start_date, end_date, budget, target_audience, channels, goals, performance_metrics, status, created_at, investment_focus, technology_used, regulatory_compliance, risk_management_strategy, client_segment FROM management.marketing")
        marketing = cur.fetchall()
        cur.close()
        close_db_connection(conn)
        return [{"id": market_item[0],
                 "campaign_name": market_item[1],
                 "start_date": market_item[2],
                 "end_date": market_item[3],
                 "budget": market_item[4],
                 "target_audience": market_item[5],
                 "channels": market_item[6],
                 "goals": market_item[7],
                 "performance_metrics": market_item[8],
                 "status": market_item[9],
                 "created_at": market_item[10],
                 "investment_focus": market_item[11],
                 "technology_used": market_item[12],
                 "regulatory_compliance": market_item[13],
                 "risk_management_strategy": market_item[14],
                 "client_segment": market_item[15]} for market_item in marketing]
    else:
        return {"error": "Failed to connect to the database"}
