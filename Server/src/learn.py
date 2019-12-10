
import pandas as pd
import random
import json
import ast
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

###### helper functions. Use them when needed #######
def get_title_from_index(index):
    return df["original_title"].iloc[index]

def get_index_from_title(title):
    #print(title)
    #return df[df.original_title == title]["original_title"].values[0]
    return df[df.original_title == title].index.values.astype(int)[0]


def combine_features(row):
    try:
        return row["genres"] + row["top_cast"] + " " + row["keywords"] + " " +  row["director"]
    except ValueError as e:
        #pass
        print(e)
        #print("Error:", row)

##################################################

def init():
    # Step 2: Select Features
    features = ['genres', 'top_cast', 'keywords', 'director']

    # Step 3: Create a column in DF which combines all selected features
    for feature in features:
        df[features] = df[features].fillna('')  # fills NaN with empty string

    df["combined_features"] = df.apply(combine_features, axis=1)  # <- rows, not cols
   


def getRecomendation(movie_user_likes = "Toy Story"):
    # Step 4: Create count matrix from this new combined column
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(df["combined_features"])

    # Step 5: Compute the Cosine Similarity based on the count_matrix
    cSimilarity = cosine_similarity(count_matrix)
    
    #Save to or have in memory?
    #np.save("cosine.npy", cSimilarity)

    # Step 6: Get index of this movie from its title
    movie_index = get_index_from_title(movie_user_likes)


    #print(df["combined_features"][movie_index])
    similar_movies = list(enumerate(cSimilarity[movie_index]))

    # Step 7: Get a list of similar movies in descending order of similarity score
    return sorted(similar_movies, key=lambda x: x[1], reverse=True)

def printMovies(sorted_similar_movies):
    # Step 8: Print titles of first 50 movies
    counter = 0
    for movie in sorted_similar_movies:
        print(get_title_from_index(movie[0]))

        if(counter >= 50):
            break

        counter = counter + 1

def getRandomMovie():
    rand = random.randint(1, len(df))
    return df['original_title'][rand]

# Step 1: Read CSV File
df = pd.read_csv("./src/data/trim_movie_database.csv", low_memory=False)

#Filter movies to only take the relevant into account.
df = df[df["revenue"] > 0]

init()
movies = getRecomendation()
printMovies(movies)