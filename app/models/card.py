from .db import db
from sqlalchemy.sql import func


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    user = db.relationship('User', back_populates='cards')
    list = db.relationship("List", back_populates='cards')

    def to_dict(self):
        return {
            'id': self.id,
            'order': self.order,
            'title': self.title,
            'description': self.description,
            'user_id': self.user_id,
            'list_id': self.list_id,
            'board_id': self.list.board_id
            # 'created_at': self.created_at
            # 'updated_at': self.updated_at
        }
