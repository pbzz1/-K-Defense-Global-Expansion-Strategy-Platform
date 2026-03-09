from flask import Blueprint, request, jsonify
from services.marketstack import get_global_stock

global_stock_bp = Blueprint("global_stock", __name__)

@global_stock_bp.route("/api/global/stock")
def global_stock():
    symbol = request.args.get("symbol")
    data = get_global_stock(symbol, "2025-01-01", "2025-12-24")
    return jsonify(data)
