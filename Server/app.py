#!flask/bin/python
from flask import Flask, jsonify, abort, request, make_response, url_for
import requests
<<<<<<< HEAD
from src.learn import getRandomMovie, getRecomendation

=======
from flask_cors import CORS, cross_origin
from src.learn import getRandomMovie
>>>>>>> 781b0a50c200afe6a5ce80c0f5cd054bdbd8ad25

app = Flask(__name__, static_url_path="")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

movieList = ''
movieListArray = []
movieFeatures = []


@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({'error': 'Bad request'}), 400)

# Updates the new information aobut the user
@app.route('/add_movie', methods=['POST'])
def add_movie():
    if not request.json or not 'title' in request.json:
        abort(400)

<<<<<<< HEAD
    movieListArray.append(request.json['title'])
    movieFeatures.append(getRecomendation(request.json['title'])[0])

    print(movieFeatures)
    return "hello", 201
=======
    movieListArray.append(jsonify({'task': request.json['title']}))

    return movieListArray, 201
>>>>>>> 781b0a50c200afe6a5ce80c0f5cd054bdbd8ad25


# Gets the movies depending on current user
@app.route('/movies')
@cross_origin()
def movies():
    #res = requests.get('https://jsonplaceholder.typicode.com/users')
    newMovie = getRandomMovie()
    # if len(res.content) == 0:
    #     abort(404)
    return newMovie, 201


if __name__ == '__main__':
    app.run(debug=True)
