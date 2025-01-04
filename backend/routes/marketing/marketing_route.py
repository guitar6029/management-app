from flask import Blueprint, jsonify
from services.marketing_service import get_all_marketing

bp = Blueprint("marketing", __name__)

@bp.route("/marketing", methods=["GET"])
def get_marketing():
    marketing = get_all_marketing()
    return jsonify(marketing)