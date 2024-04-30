from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
import mysql.connector

basedir = os.path.abspath(os.path.dirname(__file__))
# Поменяем, если перейдём на другую БД 
engine = create_engine("mysql+mysqlconnector://admin:seizures@localhost/kostroma_heatmap",
    connect_args = {
        "port": 3306
    })

Base = declarative_base()
db_session = scoped_session(sessionmaker(bind=engine ))


