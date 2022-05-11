from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    order = IntegerField('order', validators=[DataRequired()])
