from app import db
from datetime import datetime
from sqlalchemy.orm import relationship,backref

class Raions(db.Model):
    __tablename__ = 'objects_estate'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80),  nullable=False)
    coord_x = db.Column(db.Float,primary_key=True)
    coord_y = db.Column(db.Float,primary_key=True)

    def __repr__(self):
        return f"<Raions(name='{self.name}', department='{self.coord_x}', '{self.coord_y}' )>"
    
class Group_Home(db.Model):
    __tablename__ = 'groups_home'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f"<Group(name='{self.id}', Title='{self.name}')>"

class Summary(db.Model):
    __tablename__ = 'summary'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    raions_id = db.Column(db.Integer, db.ForeignKey('objects_estate.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('groups_home.id'))
    likeness = db.Column(db.Integer)
    raions = relationship("Raions", backref=backref('summary', cascade="all, delete-orphan"))
    group = relationship("Group_Home", backref=backref('summary', cascade="all, delete-orphan"))

