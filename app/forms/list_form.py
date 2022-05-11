from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please provide a title')])
    order = IntegerField('order', validators=[DataRequired()])
