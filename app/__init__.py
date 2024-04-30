from flask import Flask,g
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.dataloader import load_database
from app.db_init import Base, db_session, engine
from app.tables import Raions,Group_Home,Summary
from sqlalchemy import MetaData,text


app =Flask(__name__)
app.config.from_object(Config)


def init_db():

    Base.metadata.create_all(bind=engine,checkfirst=True)
    print("Initialized the db")
    db=SQLAlchemy(app)

    with engine.connect() as conn:
        result = conn.execute(text('select True from summary limit 1'))
        result=result.scalar()
    print(f'{result}')
    if result:
        print('Its alright')
    else:
   
        print('Adding_Data')    
        load_database(engine,app)
        print('Data has been added')


init_db()

from app import routes






