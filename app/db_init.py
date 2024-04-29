from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os


basedir = os.path.abspath(os.path.dirname(__file__))
# Поменяем, если перейдём на другую БД 
engine = create_engine('sqlite:///app.db')

Base = declarative_base()
db_session = scoped_session(sessionmaker(bind=engine ))


