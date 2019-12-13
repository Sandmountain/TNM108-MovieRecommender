import pandas as pd
import random
import json
import ast
import numpy as np


###########

# def getDirector(row):
#     for info in ast.literal_eval(row["crew"]):
#         if(info["job"] == 'Director'):
#             return info["name"]

#     return ""


# def getTopCast(row):
#     cast = ''
#     counter = 0
#     for info in ast.literal_eval(row["cast"]):
#         cast = cast + " " + info['name']
#         counter = counter + 1
#         if(counter == 3):
#             return cast

#     return ""


# def getKeywords(row):
#     keywords = ''
#     for word in ast.literal_eval(row["keywords"]):
#         keywords = keywords + " " + word['name']

#     return keywords


# def getGenres(row):
#     genreString = ''
#     for genre in ast.literal_eval(row["genres"]):
#         genreString = genreString + " " + genre['name']

#     return genreString


# def howManyAtZero(row):
#     # -> revenue
#     print("test")
#     # if(row["revenue"] == 0):
#     #    revenue = revenue + 1


# df_meta = pd.read_csv("./src/data/movies_metadata.csv", low_memory=False)
# df_credit = pd.read_csv("./src/data/credits.csv", low_memory=False)
# df_keywords = pd.read_csv("./src/data/keywords.csv", low_memory=False)

# # print(revenue)
# #df_meta = df_meta[:500]
# #df_credit = df_credit[:500]
# #df_keywords = df_keywords[:500]

# df = pd.DataFrame()

# # Format data

# df_credit["director"] = df_credit.apply(getDirector, axis=1)
# df_credit["top_cast"] = df_credit.apply(getTopCast, axis=1)
# df_meta["genres"] = df_meta.apply(getGenres, axis=1)
# df_keywords["keywords"] = df_keywords.apply(getKeywords, axis=1)

# features = [df_meta['id'], df_meta['original_title'], df_meta['poster_path'], df_meta['overview'],
#             df_meta['budget'], df_meta['genres'], df_meta["release_date"], df_meta["popularity"], df_meta["revenue"]]
# df = pd.concat(features, axis=1)
# #######

# print(df.size)
# df["director"] = df_credit["director"]
# df["top_cast"] = df_credit["top_cast"]
# df["keywords"] = df_keywords["keywords"]

df = pd.read_csv("./src/data/trim_movie_database.csv",
                 low_memory=False, index_col=0)
df = df[df["revenue"] > 0]

<<<<<<< HEAD
print(df.size)
df["director"] = df_credit["director"]
df["top_cast"] = df_credit["top_cast"]
df["keywords"] = df_keywords["keywords"]


=======
>>>>>>> 781b0a50c200afe6a5ce80c0f5cd054bdbd8ad25
print(df.head())
print(df.columns)

print(df.size)

df.fillna("")

# saving the dataframe
df.to_csv('trim_movie_database_Jacob.csv')
