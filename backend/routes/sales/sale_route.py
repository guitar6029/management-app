from flask import Blueprint, jsonify
from services.sales_service import get_all_sales

bp = Blueprint('sales', __name__)

@bp.route('/sales', methods=['GET'])
def get_sales():
    sales = get_all_sales()
    return jsonify(sales)