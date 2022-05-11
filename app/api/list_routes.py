from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User, List
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)

# GET ALL LISTS
@list_routes.route('/')
@login_required
def lists():
    user = User.query.get(current_user.id)
    lists = {'lists': [list.to_dict() for list in user.lists]}
    
    return jsonify(lists)


@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def new_list(id):
    list = List.query.get(id)

    list.title = request.json['title']
    list.order = request.json['order']


    db.session.commit()
    return new_list.to_dict()

# DELETE A LIST
@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    list = List.query.get(id)

    db.session.delete(list)
    db.session.commit()

    return {"Message": "List deleted successfully"}