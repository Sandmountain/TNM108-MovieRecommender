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


# def getProdComp(row):
#     name = ''

#     try:
#         for info in ast.literal_eval(row["production_companies"]):
#             try:
#                 name = info['name']
#                 return name
#             except:
#                 print("hello")
#                 pass
#     except:
#         print("hello")
#         return ""


# df_meta = pd.read_csv(
#     "./raw_data/movies_metadata.csv", low_memory=False)
# df_credit = pd.read_csv(
#     "./raw_data/credits.csv", low_memory=False)
# df_keywords = pd.read_csv(
#     "./raw_data/keywords.csv", low_memory=False)


# # print(revenue)
# # df_meta = df_meta[:500]
# # df_credit = df_credit[:500]
# # df_keywords = df_keywords[:500]

# meta_DF = pd.DataFrame()
# credit_DF = pd.DataFrame()
# keywords_DF = pd.DataFrame()
# df_final = pd.DataFrame()
# # Format data

# df_meta.fillna("")
# df_meta["genres"] = df_meta.apply(getGenres, axis=1)
# df_meta["prod_comp"] = df_meta.apply(getProdComp, axis=1)
# features = [df_meta['id'], df_meta['original_title'], df_meta['poster_path'], df_meta['overview'],
#             df_meta['budget'], df_meta['genres'], df_meta["release_date"], df_meta["popularity"], df_meta["revenue"], df_meta["prod_comp"]]
# meta_DF = pd.concat(features, axis=1)

# df_keywords["keywords"] = df_keywords.apply(getKeywords, axis=1)
# keywords_DF["keywords"] = df_keywords["keywords"]
# keywords_DF['id'] = df_keywords["id"]


# df_credit["director"] = df_credit.apply(getDirector, axis=1)
# df_credit["top_cast"] = df_credit.apply(getTopCast, axis=1)
# credit_DF["top_cast"] = df_credit["top_cast"]
# credit_DF["director"] = df_credit["director"]
# credit_DF['id'] = df_credit["id"]


#########################
df_final = pd.DataFrame()
df_final = pd.read_csv(
    "./movie_dataset_final.csv", low_memory=False, index_col=0)


# meta_DF['id'] = meta_DF['id'].astype(str)
# keywords_DF['id'] = keywords_DF['id'].astype(str)
# credit_DF['id'] = credit_DF['id'].astype(str)
# meta_DF = pd.merge(meta_DF, credit_DF, on="id")

# df_final = pd.merge(meta_DF, keywords_DF, on="id")


df_final = df_final[df_final["revenue"] > 0]
df_final = df_final.fillna("")
df_final = df_final.reset_index()
# saving the dataframe
df_final.to_csv('movie_dataset_final_scrubbed.csv')
