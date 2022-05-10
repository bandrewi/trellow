from flask import Blueprint, jsonify
from flask_login import current_user
from app.models import db, User, Board

board_routes = Blueprint('boards', __name__)


# @board_routes.route('/')
# def boards():
#     user = User.query.get(current_user.id)
#     boards = {'boards': []}
