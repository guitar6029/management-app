from flask import Blueprint, jsonify
import asyncio
from services.department_service import get_all_departments, get_all_employees_by_department

bp = Blueprint('departments', __name__)

@bp.route('/departments', methods=['GET'])
async def fetch_departments():
    departments_data = await get_all_departments()
    return jsonify(departments_data)



# get list of employees by department
@bp.route('/departments/<int:department_id>/employees', methods=['GET'])
async def get_employees_by_department(department_id):
    employees = await get_all_employees_by_department(department_id)
    return jsonify(employees)