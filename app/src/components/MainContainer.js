import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import RecommendMovies from "./RecommendMovies";
import ImageSelection from "./ImageSelection";
import MovieRanking from "./MovieRanking";
import MovieRankingContainer from "./MovieRankingContainer";

import axios from "axios";

let moviesToAdd = [];

export default class MainContainer extends Component {
  state = {
    recommendedMovies: [],
    selectedMovies: [],
    movieSelection: [],
    movieToRank: {
      original_title: "",
      poster_path: ""
    }
  };

  componentDidMount() {
    this.getMovieSelection();
  }

  getMovieSelection = () => {
    axios
      .get("http://localhost:5000/movieSelection")
      .then(res => this.setState({ movieSelection: res.data }));
  };

  getMovieToRate = () => {
    axios.get("http://127.0.0.1:5000/movies").then(res =>
      this.setState(prevState => ({
        movieToRank: {
          ...prevState.movieToRank,
          original_title: res.data.original_title,
          poster_path: res.data.poster_path,
          overview: res.data.overview
        }
      }))
    );
  };

  selectedMovie = title => {
    this.setState({ selectedMovies: [...this.state.selectedMovies, title] });
    moviesToAdd.push(title);

    if (this.state.selectedMovies.length === 2) {
      let payload = [];
      console.log(moviesToAdd);
      for (let i = 0; i < moviesToAdd.length; i++) {
        payload.push({
          title: moviesToAdd[i]
        });
      }
      moviesToAdd = [];
      axios.post("http://localhost:5000/add_movies", payload).then(res =>
        this.setState({
          recommendedMovies: res.data
        })
      );

      this.getMovieToRate();
    }
  };

  sendRating = (rating, title) => {
    //send to server
    console.log("Sending raiting to server, then should update");
    console.log(rating + ", and " + title);

    let recommend = true;
    if (rating < 3) {
      recommend = false;
    }
    let payload = {
      title: title,
      recommend: recommend
    };

    axios.post("http://localhost:5000/add_movie", payload).then(res =>
      this.setState({
        recommendedMovies: res.data
      })
    );

    this.getMovieToRate();
  };

  render() {
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: "100px" }}
        >
          {this.state.movieToRank.original_title !== "" ? (
            <Grid item xs={8}>
              <Card style={{ marginBottom: 20 }}>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <MovieRanking movieToRank={this.state.movieToRank} />
                  </Grid>
                  <Grid item xs={10} style={{ padding: 15 }}>
                    <MovieRankingContainer
                      sendRating={this.sendRating}
                      getMovieToRate={this.getMovieToRate}
                      movieToRank={this.state.movieToRank}
                    />
                    <Grid />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ) : (
            <div></div>
          )}

          {this.state.recommendedMovies.length > 0 ? (
            <Grid item xs={8}>
              <Paper style={{ padding: 5 }}>
                <RecommendMovies imgData={this.state.recommendedMovies} />
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={8}>
              <Paper style={{ padding: 5 }}>
                <ImageSelection
                  imgData={this.state.movieSelection}
                  selectedMovie={this.selectedMovie}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}
