from flask import Blueprint, jsonify
import asyncio
from services.employee_service import get_all_employees

bp = Blueprint('employees', __name__)

@bp.route('/employees', methods=['GET'])
async def get_employees():
    employees = await get_all_employees()
    return jsonify(employees)