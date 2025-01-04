from flask import Blueprint, jsonify
import asyncio
from services.sales_service import get_all_sales

bp = Blueprint('sales', __name__)

@bp.route('/sales', methods=['GET'])
async def get_sales():
    sales = await get_all_sales()
    return jsonify(sales)