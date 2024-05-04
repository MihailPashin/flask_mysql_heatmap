from flask import Flask,g
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.dataloader import load_database
from app.db_init import Base, db_session, engine
from app.tables import Raions,Group_Home,Summary
from sqlalchemy import MetaData,text
from flask import jsonify


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



@app.route('/api/data')
def get_data_from_database():
    try:
        # Получаем данные из базы данных из таблицы Raions Районов
        raions_data = db_session.query(Raions).all()
        # Преобразуем данные в список для JSON
        raions_list = [{'id': raion.id, 'name': raion.name, 'coord_x': raion.coord_x, 'coord_y': raion.coord_y} for raion in raions_data]

        # Получаем данные из базы данных из таблицы Summary Общая таблица
        summary_data = db_session.query(Summary).all()
        # Преобразуем данные в список для JSON
        summary_list = [{'id': summary.id, 'raions_id': summary.raions_id, 'group_id': summary.group_id, 'likeness': summary.likeness} for summary in summary_data]

        # Получаем данные из базы данных Group_Home Таблица с группами
        group_data = db_session.query(Group_Home).all()
        # Преобразуем данные в список для JSON
        group_list = [{'id': group.id, 'name': group.name} for group in group_data]
        db_session.close();
        # Возвращаем данные в формате JSON
        return jsonify({'raions': raions_list, 'summary': summary_list, 'groups': group_list})

    except Exception as e:
        # Если произошла ошибка, возвращаем ошибку в формате JSON
        return jsonify({'error': str(e)})

from app import routes







