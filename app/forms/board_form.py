from tokenize import String
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class BoardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please provide a title')])
