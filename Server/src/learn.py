
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
        #return  row["top_cast"] + " " + row["director"]
        return row["genres"] + row["top_cast"] + " " + row["keywords"] + " " + row["director"]
    except ValueError as e:
        print(e)
    
############################


def init():
    # Step 2: Select Features
    features = ['genres', 'top_cast', 'keywords', 'director']
    #features = ['top_cast', 'director']

    # Step 3: Create a column in DF which combines all selected features
    for feature in features:
        df[features] = df[features].fillna('')  # fills NaN with empty string

    df["combined_features"] = df.apply(combine_features, axis=1)  # <- rows, not cols
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

def getManyRecomendations(movie_indexes, movieBlackList):
    #Loop through all indexes
    similar_movies_array = []
    #if using stars: for info in movie_raitings => info.index
    for index in movie_indexes:
        similar_movies_array.append(getRecomendationList(cSimilarity[index]))

    return chooseMovies(similar_movies_array, movie_indexes, movieBlackList)

#importing the list, and/or the raiting
 #if weighting: 
    #(star: 1-2, listOfSimiliarMovies), if len(movie_indexes) < 2, resort and set reverse=False
    #(star: 3, listOfSimiliarMovies), if len(movie_indexes) < 2, use similar_movie_list[len(similar_movie_list)/2][:10]
    #(star: 4-5, listOfSimiliarMovies), return top 10 or w/e
def chooseMovies(similar_movie_list, movie_indexes, movieBlackList):
    #A list of similiarlities to other movies, sorted with highest similiariteis first.
    moviesToRecommend = set()
    #design choise: choosing 4 movies from the latest added, 4 old ones.
    if(len(movie_indexes) == 1):
        similarIDX = 1
        #Runs until the list is filled with 8 elements
        while len(moviesToRecommend) < 8:
            movieToAdd = get_title_from_index(similar_movie_list[0][similarIDX][0])
            if(movieToAdd in movieBlackList):
                similarIDX = similarIDX + 1
            else:
                similarIDX = similarIDX + 1
                moviesToRecommend.add(movieToAdd)
    else:
    # Take 4 random movies from older ones.
        moviesToRecommend = set()
        for i in range(1, 7):
            #take a random movie then select a random of the 5 most similar in the lists
            sizeOfSet = len(moviesToRecommend)
            similarIDX = 1
            while(True):
                randMovie = random.randint(0, len(movie_indexes)-1)
                movieToAdd = get_title_from_index(similar_movie_list[randMovie][similarIDX][0])
                
                if(movieToAdd in movieBlackList):
                    similarIDX = similarIDX + 1 
                else:
                    similarIDX = similarIDX + 1 
                    moviesToRecommend.add(movieToAdd)
                
                if(sizeOfSet < len(moviesToRecommend)):
                    break
        # Movies from the latest one added
        for i in range(1, 3):   
            sizeOfSet = len(moviesToRecommend)
            similarIDX = 1
            while(True):
                movieToAdd = get_title_from_index(similar_movie_list[-1][similarIDX][0])
                
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
    print("Rand index: ", rand)

    df_temp = df.iloc[[rand]]
    print("Df test good req\n", df_temp.iloc[0]['original_title'])
    return {'original_title': df_temp.iloc[0]['original_title'], 'poster_path': "http://image.tmdb.org/t/p/w185" + df_temp.iloc[0]['poster_path']}


# Step 1: Read CSV File
df = pd.read_csv("./src/data/trim_movie_database_with_firstGenre.csv",
                 low_memory=False, index_col=0)
df = df.reset_index()

cSimilarity = init()
