from flask import Blueprint, jsonify
from flask_login import current_user
from app.models import db, User, Board

card_routes = Blueprint('cards', __name__)
