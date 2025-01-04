from flask import Flask
from flask_cors import CORS
from routes.departments.department_route import bp as departments_bp
from routes.employees.employee_route import bp as employees_bp
from routes.sales.sale_route import bp as sales_bp
from routes.events.event_route import bp as events_bp
from routes.marketing.marketing_route import bp as marketing_bp


app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(departments_bp, url_prefix='/api')
app.register_blueprint(employees_bp, url_prefix='/api')
app.register_blueprint(sales_bp, url_prefix='/api')
app.register_blueprint(events_bp, url_prefix='/api')
app.register_blueprint(marketing_bp, url_prefix='/api')

@app.route('/')
def hello_world():
    return "Welcome to the Management App! 🚀🚀🚀 "

if __name__ == '__main__':
    app.run(debug=True)
