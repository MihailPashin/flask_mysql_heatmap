import json
from sqlalchemy.orm import sessionmaker

from sqlalchemy import MetaData
import math


def load_database(engine, app):
    with app.app_context():
        print('load_database')
        Session = sessionmaker()
        Session.configure(bind=engine)
        session = Session()

        groups_zhilya = []
        metadata = MetaData()
        metadata.reflect(bind=engine)
        print(metadata.tables)

        try:
            with open('app/storage/groups.json', encoding='utf-8') as f:
                groups = json.load(f)
                print('thats fine')

            for k, v in enumerate(groups):
                print(f'groups_zhilya {k},{v}')
                stmt = metadata.tables['groups_home'].insert().values(id=v['group_id'], name=v['Group'])
                session.execute(stmt)
                session.commit()

            with open('app/storage/objects_nedvizhimost.json',  encoding='utf-8') as f:
                objects_nedvizhimost = json.load(f)
                print('thats fine')

            for k, v in enumerate(objects_nedvizhimost):
                print(f'objects_nedvizhimost {k},{v}')
                stmt = metadata.tables['objects_estate'].insert().values(id=v['object_id'],
                                                                         name=v['title'], coord_x=v['coord_X'],
                                                                         coord_y=v['coord_Y'])
                session.execute(stmt)
                session.commit()

            with open('app/storage/final_result.json', encoding='utf-8') as f:
                summary = json.load(f)
                print('thats fine')

            for k, v in enumerate(summary):
                print(f'summary {k},{v}')
                stmt = metadata.tables['summary'].insert().values(raions_id=v['object_id'],
                                                                  group_id=v['group_id'],
                                                                  likeness=math.ceil(v['x_scaled']))
                session.execute(stmt)
                session.commit()


        except Exception as e:
            print(f"An error occurred: {e}")
            session.rollback()
        finally:
            session.close()
