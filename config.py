import os
import mysql.connector



class Config(object):
    # ...

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://admin:seizures@0.0.0.0:8080/kostroma_heatmap'
    POSTS_PER_PAGE = 4  
