from flask import Blueprint, jsonify
from services.department_service import get_all_departments

bp = Blueprint('departments', __name__)

@bp.route('/departments', methods=['GET'])
def get_departments():
    departments = get_all_departments()
    return jsonify(departments)
