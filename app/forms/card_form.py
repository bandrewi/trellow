from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class CardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please provide a title')])
    description = TextAreaField('description')
    order = IntegerField('order', validators=[DataRequired()])
