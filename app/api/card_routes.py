from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, User, Board, Card
from app.forms import CardForm

card_routes = Blueprint('cards', __name__)

# GET ALL CARDS
#need trailing slash 
@card_routes.route('/')
@login_required
def cards():
    user = User.query.get(current_user.id)
    cards = {'cards': [card.to_dict() for card in user.cards]}

    return cards

# CREATE A CARD
#need trailing slash 
@card_routes.route('/', methods=['POST'])
@login_required
def new_card():
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_card = Card(
            order = form.order.data,
            title = form.title.data,
            description = form.description.data,
            user_id = current_user.id,
            list_id = request.json['list_id']
        )
        
        db.session.add(new_card)
        db.session.commit()

        return new_card.to_dict()

    if form.errors:
        return {"errors": form.errors}, 400

# UPDATE A CARD
@card_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_card(id):
    card = Card.query.get(id)
    title = request.json['title']

    description = ''
    if ('description' in request.json):
        description = request.json['description']

    if (title != ''):
        card.order = request.json['order']
        card.title = title
        card.description = description

        db.session.commit()

        return card.to_dict()
    else:
        return {"errors":
        {"title": "Please provide a title"}
        }, 400
# @card_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_card(id):
#     card = Card.query.get(id)
    
#     card.order = request.json['order']
#     card.title = request.json['title']
#     card.description = request.json['description']

#     db.session.commit()

#     return card.to_dict()

# DELETE A CARD
@card_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_card(id):
    card = Card.query.get(id)

    db.session.delete(card)
    db.session.commit()

    return {"Message": "Card deleted successfully"}