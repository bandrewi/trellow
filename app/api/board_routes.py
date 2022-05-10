from flask import Blueprint, jsonify, request
from flask_login import current_user
from app.models import db, User, Board
from app.forms import BoardForm

board_routes = Blueprint('boards', __name__)


@board_routes.route('/')
def boards():
    user = User.query.get(current_user.id)
    # query data comes back in a list of class instances
    boards = [board.to_dict() for board in user.boards]
    return jsonify(boards)


@board_routes.route('/', methods=['POST'])
def new_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_board = Board(
            title=form.title.data,
            user_id=current_user.id
        )

        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict()

    if form.errors:
        return form.errors, 403
