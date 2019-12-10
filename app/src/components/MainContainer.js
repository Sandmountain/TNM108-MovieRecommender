import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import RecommendMovies from "./RecommendMovies";
import ImageSelection from "./ImageSelection";
import tileData from "../tileData";
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
    moviesTest: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/photos?_limit=10")
      .then(res => this.setState({ moviesTest: res.data }));
  }

  selectedMovie = id => {
    axios
      .post("https://jsonplaceholder.typicode.com/photos", {
        albumId: 1,
        id,
        title: "Randy Beast",
        url: "https://i.gyazo.com/b3a47262ff258e622b3803036b4f8cb6.png",
        thumbnailUrl: "https://via.placeholder.com/150/771796"
      })
      .then(res =>
        this.setState({ moviesTest: [...this.state.moviesTest, res.data] })
      );
  };

  render() {
    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: "100px" }}
        >
          <Grid container item xs={8}>
            <Paper style={styles.paperTitle}>
              <Typography variant="h5" component="h3">
                This is a sheet of paper.
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your
                application.sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasddddddddddddddd
              </Typography>
            </Paper>
            <Paper style={styles.paperImgSel}>
              <ImageSelection
                imgData={this.state.moviesTest}
                selectedMovie={this.selectedMovie}
              />
            </Paper>
            <Paper style={styles.paper}>
              <RecommendMovies imgData={this.state.moviesTest} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
