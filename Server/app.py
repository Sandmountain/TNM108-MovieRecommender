#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for
import requests
import json
from flask_cors import CORS, cross_origin
from src.learn import getRandomMovie, getRecomendation, getManyRecomendations, getMovieSelection, getSingleMovieSelection

app = Flask(__name__, static_url_path="")
# cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
movieList = ''
movieListArray = []
movieFeatures = []
CORS(app, resources=r'/*', headers='Content-Type')

movieBlackList = []


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)

# Updates the new information aobut the user
@app.route('/add_movie', methods=['POST'])
@cross_origin()
def add_movie():
    if not request.json or not 'title' in request.json:
        abort(400)

    if(request.json["recommend"] == True):
        movieFeatures.append(getRecomendation(request.json['title'])[0])
        movieListArray = getManyRecomendations(movieFeatures, movieBlackList)
    else:
        movieBlackList.append(request.json['title'])
        # Update with last added values without the blacklist
        movieListArray = getManyRecomendations(movieFeatures, movieBlackList)

    response = app.response_class(
        response=json.dumps(movieListArray),
        status=200,
        mimetype='application/json'
    )
    return response

# Adding movies to find similarity with
@app.route('/add_movies', methods=['POST'])
@cross_origin()
def add_movies():

    for movie in request.json:
        print(getRecomendation(movie['title'])[0])
        movieFeatures.append(getRecomendation(movie['title'])[0])

    movieListArray = getManyRecomendations(movieFeatures, movieBlackList)

    response = app.response_class(
        response=json.dumps(movieListArray),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/movies')
@cross_origin()
def movies():
    newMovie = getRandomMovie()
    if(newMovie in movieBlackList):
        movies()

    return newMovie, 201

# Get movie selection
@app.route('/movieSelection')
@cross_origin()
def movieSelection():
    moviesToSelect = getMovieSelection()
    response = app.response_class(
        response=json.dumps(moviesToSelect),
        status=200,
        mimetype='application/json'
    )
    return response

# Get movie selection
@app.route('/SingleMovieSelection')
@cross_origin()
def SingleMovieSelection():
    moviesToSelect = getSingleMovieSelection()
    response = app.response_class(
        response=json.dumps(moviesToSelect),
        status=200,
        mimetype='application/json'
    )
    return response


if __name__ == '__main__':
    app.run(debug=True)
