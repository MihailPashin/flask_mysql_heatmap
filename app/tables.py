#from app import db

from datetime import datetime
from sqlalchemy.orm import relationship,backref
from sqlalchemy import *
from app.db_init import Base

class Raions(Base):
    __tablename__ = 'objects_estate'
    id = Column(Integer, primary_key=True)
    name = Column(String(80),  nullable=False)
    coord_x = Column(Float,primary_key=True)
    coord_y = Column(Float,primary_key=True)

    def __repr__(self):
        return f"<Raions(name='{self.name}', department='{self.coord_x}', '{self.coord_y}' )>"
    
class Group_Home(Base):
    __tablename__ = 'groups_home'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(80), unique=True, nullable=False)

    def __repr__(self):
        return f"<Group(name='{self.id}', Title='{self.name}')>"

class Summary(Base):
    __tablename__ = 'summary'
    id = Column(Integer, primary_key=True, autoincrement=True)
    raions_id = Column(Integer, ForeignKey('objects_estate.id'))
    group_id = Column(Integer, ForeignKey('groups_home.id'))
    likeness = Column(Integer)
    raions = relationship("Raions", backref=backref('summary', cascade="all, delete-orphan"))
    group = relationship("Group_Home", backref=backref('summary', cascade="all, delete-orphan"))

