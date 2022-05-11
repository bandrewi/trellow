from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User, List
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)

# GET ALL LISTS
#need trailing slash 
@list_routes.route('/')
@login_required
def lists():
    user = User.query.get(current_user.id)
    lists = {'lists': [list.to_dict() for list in user.lists]}

    return lists

# CREATE A LIST
#need trailing slash 
@list_routes.route('/', methods=['POST'])
@login_required
def new_list():
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List(
            order = form.order.data,
            title = form.title.data,
            user_id = current_user.id,
            board_id = request.json['board_id']
        )

        db.session.add(new_list)
        db.session.commit()

        return new_list.to_dict()

    if form.errors:
        return {"errors": form.errors}, 400


# UPDATE A LIST
@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_list(id):
    list = List.query.get(id)
    title = request.json['title']
    
    if (title != ''):
            list.order = request.json['order']
            list.title = title
            db.session.commit()
            return list.to_dict()
    else:
        return {"errors":
        {"title": "Please provide a title"}
        }, 400

# DELETE A LIST
@list_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_list(id):
    list = List.query.get(id)

    db.session.delete(list)
    db.session.commit()

    return {"Message": "List deleted successfully"}