from flask import Blueprint, jsonify
import asyncio
from services.event_service import get_all_events

bp = Blueprint("events", __name__)

@bp.route("/events", methods=["GET"])
async def get_events():
    events = await get_all_events()
    return jsonify(events)