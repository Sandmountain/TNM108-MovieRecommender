import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import RecommendMovies from "./RecommendMovies";
import ImageSelection from "./ImageSelection";
import SingleImageSelection from "./SingleImageSelection";
import MovieRanking from "./MovieRanking";
import MovieRankingContainer from "./MovieRankingContainer";
import ShuffleIcon from "@material-ui/icons/Shuffle";

import axios from "axios";
import { Fab } from "@material-ui/core";

export default class SingleRecomendation extends Component {
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
    axios.get("http://localhost:5000/SingleMovieSelection").then(res => {
      let shuffledArray = res.data
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);

      this.setState({ movieSelection: shuffledArray });
    });
  };

  getRecommendedMovies = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_limit=10")
      .then(res => this.setState({ recommendedMovies: res.data }));
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
    let payload = {
      title: title,
      recommend: true
    };

    axios.post("http://localhost:5000/add_movie", payload).then(res =>
      this.setState({
        recommendedMovies: res.data
      })
    );

    //this.getRecommendedMovies();
    this.getMovieToRate();
  };

  getRandomMovie = () => {
    this.getMovieToRate();
  };

  sendRaiting = (raiting, name) => {
    //send to server
    console.log("Sending raiting to server, then should update");
    console.log(raiting + ", and " + name);
  };

  render() {
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ marginTop: "35px", marginBottom: "20px" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.getMovieSelection()}
            style={{ marginBottom: 65 }}
          >
            {" "}
            Reshuffle movie selection{" "}
          </Button>
          {this.state.movieToRank.original_title !== "" ? (
            <Grid item xs={8}>
              <Card style={{ marginBottom: 20 }}>
                <Grid container alignItems="center">
                  <Grid item xs={2}>
                    <MovieRanking movieToRank={this.state.movieToRank} />
                  </Grid>
                  <Grid item xs={10} style={{ padding: 15 }}>
                    <MovieRankingContainer
                      sendRaiting={this.sendRaiting}
                      getRandomMovie={this.getRandomMovie}
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
                <SingleImageSelection
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
