from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ListForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
