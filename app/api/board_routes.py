from flask import Blueprint, jsonify
from flask_login import current_user
from app.models import db, User, Board

board_routes = Blueprint('boards', __name__)


@board_routes.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
# GET
def boards():
    user = User.query.get(current_user.id)
    # query data comes back in a list of class instances
    boards = [board.to_dict() for board in user.boards]
    return jsonify(boards)
