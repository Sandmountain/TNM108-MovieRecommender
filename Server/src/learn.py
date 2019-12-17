
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
        return row["original_title"] + " " + row["director"] + " " + row["keywords"] + " " + row["firstGenre"] + " " + str(row["budget"])
    except ValueError as e:
        print(e)

############################


def init():
    # Step 2: Select Features
    features = ['director', "keywords", "original_title", "firstGenre", "budget"]

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
   
    return movie_index, getRecomendationList(cSimilarity[movie_index])


def getManyRecomendations(movie_indexes, movieBlackList):
    # Loop through all indexes
    similar_movies_array = []
    # if using stars: for info in movie_raitings => info.index
    for index in movie_indexes:
        similar_movies_array.append(getRecomendationList(cSimilarity[index]))

    return chooseMovies(similar_movies_array, movie_indexes, movieBlackList)

# importing the list, and/or the raiting
 # if weighting:
    # (star: 1-2, listOfSimiliarMovies), if len(movie_indexes) < 2, resort and set reverse=False
    # (star: 3, listOfSimiliarMovies), if len(movie_indexes) < 2, use similar_movie_list[len(similar_movie_list)/2][:10]
    # (star: 4-5, listOfSimiliarMovies), return top 10 or w/e


def chooseMovies(similar_movie_list, movie_indexes, movieBlackList):
    # A list of similiarlities to other movies, sorted with highest similiariteis first.
    
    moviesToRecommend = set()
    # design choise: choosing 4 movies from the latest added, 4 old ones.
    if(len(movie_indexes) == 1):

        similarIDX = 1
        # Runs until the list is filled with 8 elements
        while len(moviesToRecommend) < 12:
            movieToAdd = get_title_from_index(
                similar_movie_list[0][similarIDX][0])
            if(movieToAdd in movieBlackList):
                similarIDX = similarIDX + 1
            else:
                similarIDX = similarIDX + 1
                moviesToRecommend.add(movieToAdd)
    else:
        # Take 4 random movies from older ones.
        moviesToRecommend = set()
        for i in range(1, 10):
            # take a random movie then select a random of the 5 most similar in the lists
            sizeOfSet = len(moviesToRecommend)
            similarIDX = 1
            while(True):
                randMovie = random.randint(0, len(movie_indexes)-1)
                movieToAdd = get_title_from_index(
                    similar_movie_list[randMovie][similarIDX][0])

                if(movieToAdd in movieBlackList):
                    similarIDX = similarIDX + 1
                else:
                    similarIDX = similarIDX + 1
                    moviesToRecommend.add(movieToAdd)

                if(sizeOfSet < len(moviesToRecommend)):
                    break
        # Movies from the latest one added
        for i in range(1, 4):
            sizeOfSet = len(moviesToRecommend)
            similarIDX = 1
            while(True):
                movieToAdd = get_title_from_index(
                    similar_movie_list[-1][similarIDX][0])

                if(movieToAdd in movieBlackList):
                    similarIDX = similarIDX + 1
                else:
                    similarIDX = similarIDX + 1
                    moviesToRecommend.add(movieToAdd)

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

    return {'original_title': df_temp.iloc[0]['original_title'], 'poster_path': "http://image.tmdb.org/t/p/w185" + df_temp.iloc[0]['poster_path'], 'overview': df_temp.iloc[0]['overview']}


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
            movieIDX = random.randint(0,9)
            movieSelectList.append(topGenres[genre][movieIDX])

    return formatMovieSelect(movieSelectList)


def getSingleMovieSelection():
    movieSelectList = []
    df_pop_sorted = df.sort_values(
        by=['popularity'], ascending=False).head(100)
    print(df_pop_sorted[['original_title', 'popularity']].head(5))

    movieSelectList = df_pop_sorted[[
        "id", "original_title", 'poster_path']].values.tolist()

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
