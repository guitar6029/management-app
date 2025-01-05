from flask import Flask
from flask_cors import CORS
from routes.departments.department_route import bp as departments_bp
from routes.employees.employee_route import bp as employees_bp
from routes.sales.sale_route import bp as sales_bp
from routes.events.event_route import bp as events_bp
from routes.marketing.marketing_route import bp as marketing_bp
from routes.stockmarket import stockmarket_bp
import asyncio
import hypercorn.asyncio
import hypercorn.config

app = Flask(__name__)

# Configure CORS with specific origins
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register blueprints
app.register_blueprint(departments_bp, url_prefix='/api')
app.register_blueprint(employees_bp, url_prefix='/api')
app.register_blueprint(sales_bp, url_prefix='/api')
app.register_blueprint(events_bp, url_prefix='/api')
app.register_blueprint(marketing_bp, url_prefix='/api')
app.register_blueprint(stockmarket_bp, url_prefix='/api')


@app.route('/')
def hello_world():
    return "Welcome to the Management App! 🚀🚀🚀"

if __name__ == '__main__':
    config = hypercorn.config.Config()
    config.bind = ["localhost:5000"]
    asyncio.run(hypercorn.asyncio.serve(app, config))
