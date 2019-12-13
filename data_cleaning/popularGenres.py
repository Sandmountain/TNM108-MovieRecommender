import pandas as pd
import random
import json
import ast
import numpy as np

df = pd.read_csv("./src/data/trim_movie_database_with_firstGenre.csv",
                 low_memory=False, index_col=0)

df = df.fillna("")

df_adventure = df[df['firstGenre'].str.contains('Adventure')]
df_adventure = df_adventure.sort_values('popularity', ascending=False)
df_action = df[df['firstGenre'].str.contains('Action')]
df_action = df_action.sort_values('popularity', ascending=False)
df_comedy = df[df['firstGenre'].str.contains('Comedy')]
df_comedy = df_comedy.sort_values('popularity', ascending=False)
df_romace = df[df['firstGenre'].str.contains('Romance')]
df_romace = df_romace.sort_values('popularity', ascending=False)
df_drama = df[df['firstGenre'].str.contains('Drama')]
df_drama = df_drama.sort_values('popularity', ascending=False)

#df_return = pd.DataFrame()

#df_return.to_csv('best_of_genre.csv')

newDict ={
    "adventure" : df_adventure[["id","original_title", 'poster_path']][:10].values.tolist(),
    "action": df_action[["id","original_title", 'poster_path']][:10].values.tolist(),
    "comedy": df_comedy[["id","original_title", 'poster_path']][:10].values.tolist(),
    "romance": df_romace[["id","original_title", 'poster_path']][:10].values.tolist(),
    "drama": df_drama[["id","original_title", 'poster_path']][:10].values.tolist()
    }

with open('topGenres.json', 'w') as outfile:
    json.dump(newDict, outfile)
