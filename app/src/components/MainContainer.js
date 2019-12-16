import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import RecommendMovies from "./RecommendMovies";
import ImageSelection from "./ImageSelection";
import MovieRanking from "./MovieRanking";

import axios from "axios";

const styles = {
  paper: {
    textAlign: "center",
    backgroundColor: "#f00",
    padding: "5px"
  },
  paperTitle: {
    textAlign: "center",
    backgroundColor: "#313131",
    marginBottom: "10px",
    padding: "5px"
  },
  paperImgSel: {
    backgroundColor: "#777777",
    marginBottom: "10px",
    padding: "5px"
  }
};

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
          poster_path: res.data.poster_path
        }
      }))
    );
  };

  selectedMovie = title => {
    this.setState({ selectedMovies: [...this.state.selectedMovies, title] });

    if (this.state.selectedMovies.length === 2) {
      let payload = [];

      for (let i = 0; i < this.state.selectedMovies.length; i++) {
        payload.push({
          title: this.state.selectedMovies[i]
        });
      }
      axios.post("http://localhost:5000/add_movies", payload).then(res =>
        this.setState({
          recommendedMovies: res.data
        })
      );

      //this.getRecommendedMovies();
      this.getMovieToRate();
    }
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
            <Grid item xs={4}>
              <MovieRanking movieToRank={this.state.movieToRank} />
            </Grid>
          ) : (
            <div></div>
          )}

          <Grid item xs={8}>
            <Paper style={styles.paperTitle}>
              <Typography variant="h5" component="h3">
                This is a sheet of paper.
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your
                application.sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasddddddddddddddd
              </Typography>
            </Paper>
          </Grid>
          {this.state.recommendedMovies.length > 0 ? (
            <Grid item xs={8}>
              <Paper style={styles.paper}>
                <RecommendMovies imgData={this.state.recommendedMovies} />
              </Paper>
            </Grid>
          ) : (
            <Grid item xs={8}>
              <Paper style={styles.paperImgSel}>
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
