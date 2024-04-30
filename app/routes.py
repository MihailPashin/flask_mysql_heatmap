# -*- coding: utf-8 -*-
from app import app
from flask import render_template,url_for,redirect, flash,request

from app.tables import Raions,Group_Home,Summary

from datetime import datetime

import os



@app.route('/')
@app.route('/begin')
def index():
    return render_template("index.html")

    
