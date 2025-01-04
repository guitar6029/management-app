from flask import Blueprint, jsonify
from services.employee_service import get_all_employees

bp = Blueprint('employees', __name__)

@bp.route('/employees', methods=['GET'])
def get_employees():
    employees = get_all_employees()
    return jsonify(employees)