#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for
import requests
from src.learn import getRandomMovie

app = Flask(__name__, static_url_path="")
movieList = ''


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


# Updates the new information aobut the user
@app.route('/add_movie', methods=['POST'])
def add_movie():
    if not request.json or not 'title' in request.json:
        abort(400)

    return jsonify({'task': request.json['title']}), 201


# Gets the movies depending on current user
@app.route('/movies')
def movies():
    res = requests.get('https://jsonplaceholder.typicode.com/users')
    newMovie = getRandomMovie()
    movieList = movieList + newMovie
    if len(res.content) == 0:
        abort(404)
    return "Your random movie from our database is: " + newMovie, 201


if __name__ == '__main__':
    app.run(debug=True)