from app.api.auth_routes import login
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Board, List
from app.forms import BoardForm, ListForm

board_routes = Blueprint('boards', __name__)

# GET ALL BOARDS
#need trailing slash 
@board_routes.route('/')
@login_required
def boards():
    user = User.query.get(current_user.id)
    # query data comes back in a list of class instances
    boards = {'boards': [board.to_dict() for board in user.boards]}

    return boards

# CREATE A BOARD
#need trailing slash 
@board_routes.route('/', methods=['POST'])
@login_required
def new_board():
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_board = Board(
            title = form.title.data,
            user_id = current_user.id
        )

        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict()

    if form.errors:
        return {"errors": form.errors}, 400

# UPDATE A BOARD
@board_routes.route('/<int:id>', methods=['PUT'])
@login_required  # method not allowed instead of unauthorized
def edit_board(id):
    board = Board.query.get(id)
    title = request.json['title']

    if (title != ''):
        board.title = title
        db.session.commit()
        return board.to_dict()
    else:
        return {"errors":
        {"title": "Please provide a title"}
        }, 400

# DELETE A BOARD
@board_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_board(id):
    board = Board.query.get(id)

    db.session.delete(board)
    db.session.commit()

    return {"Message": "Board deleted successfully"}

# # CREATE A LIST
# @board_routes.route('/<int:id>/lists', methods=['POST'])
# @login_required
# def new_list(id):
#     form = ListForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         new_list = List(
#             order=form.order.data,
#             title=form.title.data,
#             user_id=current_user.id,
#             board_id=id
#         )

#         db.session.add(new_list)
#         db.session.commit()

#         return new_list.to_dict()