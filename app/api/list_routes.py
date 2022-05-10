from flask import Blueprint, jsonify
from flask_login import current_user
from app.models import db, User, Board

list_routes = Blueprint('lists', __name__)
