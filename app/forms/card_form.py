from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired


class CardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please provide a title')])
    description = TextField('description')
    order = IntegerField('order', validators=[DataRequired()])
