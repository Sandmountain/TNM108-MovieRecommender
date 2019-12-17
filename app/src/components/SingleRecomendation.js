import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import RecommendMovies from "./RecommendMovies";
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
          {this.state.recommendedMovies.length > 0 ? (
            <Grid item xs={8}>
              <Paper style={{ padding: 5 }}>
                <RecommendMovies imgData={this.state.recommendedMovies} />
              </Paper>
            </Grid>
          ) : (
            <Fragment>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.getMovieSelection()}
                style={{ marginBottom: 65 }}
              >
                {" "}
                Reshuffle movie selection{" "}
              </Button>
              <Grid item xs={8}>
                <Paper style={{ padding: 5 }}>
                  <SingleImageSelection
                    imgData={this.state.movieSelection}
                    selectedMovie={this.selectedMovie}
                  />
                </Paper>
              </Grid>
            </Fragment>
          )}
        </Grid>
      </div>
    );
  }
}
