from flask import Blueprint, jsonify
import asyncio
from services.department_service import get_all_departments

bp = Blueprint('departments', __name__)

@bp.route('/departments', methods=['GET'])
async def fetch_departments():
    departments_data = await get_all_departments()
    return jsonify(departments_data)
