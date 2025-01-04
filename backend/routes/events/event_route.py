from flask import Blueprint, jsonify
from services.event_service import get_all_events

bp = Blueprint("events", __name__)

@bp.route("/events", methods=["GET"])
def get_events():
    events = get_all_events()
    return jsonify(events)