from app import db
from datetime import datetime


class Raions(db.Model):
    __tablename__ = 'objects_estate'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    coord_x = db.Column(db.Float,primary_key=True)
    coord_y = db.Column(db.Float,primary_key=True)
    
class Group_Home(db.Model):
    __tablename__ = 'groups_home'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)


class Summary(db.Model):
    __tablename__ = 'summary'
    id = db.Column(db.Integer, primary_key=True)
    raions_id = db.Column(db.Integer, db.ForeignKey('objects_estate.id'),primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups_home.id'),primary_key=True)
    likeness = db.Column(db.Integer)


