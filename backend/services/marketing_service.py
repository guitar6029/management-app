from utils.database import connect_db, close_db_connection

async def get_all_marketing():
    conn = await connect_db()
    if conn:
        try:
            marketing = await conn.fetch("SELECT id, campaign_name, start_date, end_date, budget, target_audience, channels, goals, performance_metrics, status, created_at, investment_focus, technology_used, regulatory_compliance, risk_management_strategy, client_segment FROM management.marketing")
            return [{"id": market_item["id"],
                     "campaign_name": market_item["campaign_name"],
                     "start_date": market_item["start_date"],
                     "end_date": market_item["end_date"],
                     "budget": market_item["budget"],
                     "target_audience": market_item["target_audience"],
                     "channels": market_item["channels"],
                     "goals": market_item["goals"],
                     "performance_metrics": market_item["performance_metrics"],
                     "status": market_item["status"],
                     "created_at": market_item["created_at"],
                     "investment_focus": market_item["investment_focus"],
                     "technology_used": market_item["technology_used"],
                     "regulatory_compliance": market_item["regulatory_compliance"],
                     "risk_management_strategy": market_item["risk_management_strategy"],
                     "client_segment": market_item["client_segment"]} for market_item in marketing]
        finally:
            await close_db_connection(conn)
    else:
        return {"error": "Failed to connect to the database"}
