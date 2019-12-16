
import pandas as pd
import random
import json
import ast
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

###### Get Functions #######


def get_title_from_index(index):
    return df["original_title"].iloc[index]


def get_index_from_title(title):
    return df[df["original_title"] == title].index[0]


def get_poster_path_from_index(index):
    return df["poster_path"].iloc[index]


def combine_features(row):
    try:
        return row["genres"] + " " + row["keywords"] + " " + row["director"]
    except ValueError as e:
        print(e)

############################


def init():
    # Step 2: Select Features
    features = ['genres', 'keywords', 'director']

    # Step 3: Create a column in DF which combines all selected features
    for feature in features:
        df[features] = df[features].fillna('')  # fills NaN with empty string

    df["combined_features"] = df.apply(
        combine_features, axis=1)  # <- rows, not cols
    # Step 4: Create count matrix from this new combined column
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(df["combined_features"])

    # Step 5: Compute the Cosine Similarity based on the count_matrix
    return cosine_similarity(count_matrix)


def getRecomendation(movie_user_likes):
    # Step 6: Get index of this movie from its title
    movie_index = get_index_from_title(movie_user_likes)
    print(cSimilarity[movie_index])
    return movie_index, getRecomendationList(cSimilarity[movie_index])


def getManyRecomendations(movie_indexes):
    # Loop through all indexes
    similar_movies_array = []
    # if using stars: for info in movie_raitings => info.index
    for index in movie_indexes:
        similar_movies_array.append(getRecomendationList(cSimilarity[index]))

    return chooseMovies(similar_movies_array, movie_indexes)

# importing the list, and/or the raiting
 # if weighting:
    # (star: 1-2, listOfSimiliarMovies), if len(movie_indexes) < 2, resort and set reverse=False
    # (star: 3, listOfSimiliarMovies), if len(movie_indexes) < 2, use similar_movie_list[len(similar_movie_list)/2][:10]
    # (star: 4-5, listOfSimiliarMovies), return top 10 or w/e


def chooseMovies(similar_movie_list, movie_indexes):
    # A list of similiarlities to other movies, sorted with highest similiariteis first.
    moviesToRecommend = set()
    # design choise: choosing 4 movies from the latest added, 4 old ones.
    if(len(movie_indexes) == 1):
        for i in range(1, 9):
            moviesToRecommend.add(
                (get_title_from_index(similar_movie_list[0][i][0])))
    else:
        # Take 4 random movies from older ones.
        moviesToRecommend = set()
        for i in range(1, 5):
            # take a random movie then select a random of the 5 most similar in the lists
            sizeOfSet = len(moviesToRecommend)
            while(True):
                randMovie = random.randint(0, len(movie_indexes)-1)
                randSimilar = random.randint(1, 5)
                moviesToRecommend.add(get_title_from_index(
                    similar_movie_list[randMovie][randSimilar][0]))
                if(sizeOfSet < len(moviesToRecommend)):
                    break

        for i in range(1, 5):
            sizeOfSet = len(moviesToRecommend)
            counter = 0
            while(True):
                randMovie = random.randint(0, len(movie_indexes)-1)
                counter = counter + 1
                moviesToRecommend.add(get_title_from_index(
                    similar_movie_list[-1][counter][0]))
                if(sizeOfSet < len(moviesToRecommend)):
                    break

    return formatMovieList(list(moviesToRecommend))


def formatMovieList(moviesToRecommend):
    toReturn = []
    random.shuffle(moviesToRecommend)
    for movie in moviesToRecommend:
        movieIndex = get_index_from_title(movie)
        toReturn.append(
            {
                "id": str(movieIndex),
                "title": movie,
                "path": get_poster_path_from_index(movieIndex)
            }
        )
    return toReturn


def getRecomendationList(cosineMatrix):
    similar_movies = list(enumerate(cosineMatrix))
    # Step 7: Get a list of similar movies in descending order of similarity score
    return sorted(similar_movies, key=lambda x: x[1], reverse=True)


def getRandomMovie():
    rand = random.randint(1, len(df))

    df_temp = df.iloc[[rand]]
    return {'original_title': df_temp.iloc[0]['original_title'], 'poster_path': "http://image.tmdb.org/t/p/w185" + df_temp.iloc[0]['poster_path']}


def formatMovieSelect(movieToSelect):
    toReturn = []
    for movie in movieToSelect:
        toReturn.append(
            {
                "id": str(movie[0]),
                "title": movie[1],
                "path": "http://image.tmdb.org/t/p/w185" + movie[2]
            }
        )
    return toReturn


def getMovieSelection():
    movieSelectList = []

    for i in range(0, 3):
        for genre in topGenres:
            movieSelectList.append(topGenres[genre][i])

    return formatMovieSelect(movieSelectList)

    # Read topGenres.json
with open('./src/data/topGenres.json') as json_file:
    topGenres = json.load(json_file)

# Step 1: Read CSV File
df = pd.read_csv("./src/data/trim_movie_database_with_firstGenre.csv",
                 low_memory=False, index_col=0)
df = df.reset_index()

df = df.fillna("")


cSimilarity = init()
