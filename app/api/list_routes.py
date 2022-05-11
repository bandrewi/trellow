from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User, List
from app.forms import ListForm

list_routes = Blueprint('lists', __name__)


@list_routes.route('/')
@login_required
def lists():
    user = User.query.get(current_user.id)
    lists = {'lists': [list.to_dict() for list in user.lists]}
    return jsonify(lists)


@list_routes.route('/<int:id>', methods=['POST'])
@login_required
def new_list(id):
    form = ListForm
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_list = List(
            order=form.order.data,
            title=form.title.data,
            user_id=current_user.id,
            board_id=id
        )
