import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import RecommendMovies from "./RecommendMovies";

const styles = {
  paper: {
    textAlign: "center",
    backgroundColor: "#f00"
  }
};

export default class MainContainer extends Component {
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
            <Paper style={styles.paper}>
              <Typography variant="h5" component="h3">
                This is a sheet of paper.
              </Typography>
              <Typography component="p">
                Paper can be used to build surface or other elements for your
                application.sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasddddddddddddddd
              </Typography>
              <RecommendMovies />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
