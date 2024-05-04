from app import app
from app.db_init import Base, engine
from sqlalchemy import MetaData,text
from flask import jsonify

@app.route('/layers', methods=['GET'])
def layers():
    with engine.connect() as conn:
        sql_query = """
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', gh.id,
                            'name', gh.name,
                            'coordinates', (
                                SELECT JSON_ARRAYAGG(
                                    JSON_OBJECT(
                                        'raions_id', s.raions_id,
                                        'likeness', s.likeness
                                    )
                                )
                                FROM summary s
                                WHERE s.group_id = gh.id
                            )
                        )
                     )
                    FROM (
                        select * from groups_home gh group by id order by id asc
                    ) gh;
                """
        result = conn.execute(text(sql_query))
        return jsonify(result)

#То есть наверно первым эндпоинтом будет /getting_layers
#А вторым наверно /getting_layers/<int:layer_id>

@app.route('/layers/<int:layer_id>', methods=['GET'])
def get_layer(layer_id):
    layer = filter(lambda t: t['id'] == layer_id, layers)
    if len(layer) == 0:
        abort(404)
    return jsonify({'layer': layer[0]})


@app.route('/getting_layers', methods=['GET'])
def getting_layers():
    with engine.connect() as conn:
        result = conn.execute(text('SSELECT JSON_ARRAYAGG(JSON_OBJECT('id',gh.id,\'name\',gh.name,\'coordinates\',(SELECT JSON_ARRAYAGG(JSON_OBJECT(\'raions_id\',s.raions_id,\'likeness\',s.likeness)) FROM summary s WHERE s.group_id=gh.id))) FROM (select * from groups_home gh group by id order by id asc) gh;'))
        data = [dict(row) for row in result.fetchall()]
        conn.close()
        return jsonify(data)

@app.route('/fast_points')
def get_data_from_database():
    try:
        # Получаем данные из базы данных из таблицы ObjectsEstate
        objects_data = db_session.query(Raions).all()
        # Преобразуем данные в список для JSON
        objects_list = [{'id': obj.id, 'name': obj.name, 'coord_x': obj.coord_x, 'coord_y': obj.coord_y} for obj in objects_data]

        # Получаем данные из базы данных из таблицы Summary
        summary_data = db_session.query(Summary).all()
        # Преобразуем данные в список для JSON
        summary_list = [{'id': summary.id, 'raions_id': summary.raions_id, 'group_id': summary.group_id, 'likeness': summary.likeness} for summary in summary_data]


        # Получаем данные из базы данных
        group_data = db_session.query(Group_Home).all()
        # Преобразуем данные в список для JSON
        data = [{'name': group.name} for group in group_data]

        # Возвращаем данные в формате JSON
        return jsonify(data, objects_list, summary_list)

    except Exception as e:
        # Если произошла ошибка, возвращаем ошибку в формате JSON
        return jsonify({'error': str(e)})

