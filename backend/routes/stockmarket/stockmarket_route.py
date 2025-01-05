from flask import Blueprint, jsonify
import aiohttp
import asyncio
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

bp = Blueprint("stockmarket", __name__)

async def get_stock_information(ticker):
    url = f"http://api.marketstack.com/v1/tickers/{ticker}"
    params = {
        'access_key': os.getenv('MARKETSTACK_API_KEY')
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            if response.status == 200:
                data = await response.json()
                return data['data']  # Adjust based on the structure of the API response
            else:
                return []

async def get_list_currencies():
    url = "http://api.marketstack.com/v1/currencies"
    params = {
        'access_key': os.getenv('MARKETSTACK_API_KEY'),
        'limit': 100,
        'offset': 0
    }

    async with aiohttp.ClientSession() as session:
        async with session.get(url, params=params) as response:
            if response.status == 200:
                data = await response.json()
                return data['data']  # Adjust based on the structure of the API response
            else:
                return []

@bp.route("/stockmarket/currencies", methods=["GET"])
async def get_currencies():
    currencies = await get_list_currencies()
    return jsonify(currencies)

@bp.route("/stockmarket/ticker/<string:ticker>", methods=["GET"])
async def get_ticker(ticker):
    stock_info = await get_stock_information(ticker)
    return jsonify(stock_info)
