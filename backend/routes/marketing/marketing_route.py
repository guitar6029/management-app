from flask import Blueprint, jsonify
import asyncio
from services.marketing_service import get_all_marketing

bp = Blueprint("marketing", __name__)

@bp.route("/marketing", methods=["GET"])
async def get_marketing():
    marketing = await get_all_marketing()
    return jsonify(marketing)