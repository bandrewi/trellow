from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def first_name_letters_only(form, field):
    name = field.data
    if (not name.isalpha()):
        raise ValidationError('First name can only contain letters.')

def last_name_letters_only(form, field):
    name = field.data
    if (not name.isalpha()):
        raise ValidationError('Last name can only contain letters.')

class SignUpForm(FlaskForm):
    first_name = StringField('firstname', validators=[DataRequired(), first_name_letters_only])
    last_name = StringField('lastname', validators=[DataRequired(), last_name_letters_only])
    email = StringField('email', validators=[DataRequired(), Email('Please provide a valid email.'), user_exists])
    password = StringField('password', validators=[DataRequired()])
