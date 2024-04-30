import os
import mysql.connector



class Config(object):
    # ...

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://admin:seizures@localhost:3306/kostroma_heatmap'
    POSTS_PER_PAGE = 4  
