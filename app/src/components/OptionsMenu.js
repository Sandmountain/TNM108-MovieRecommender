import React, { Component } from "react";
import { Grid, Button, Typography } from "@material-ui/core";

import axios from "axios";

import MainContainer from "./MainContainer";
import SingleMovie from "./SingleRecomendation";

export default class OptionsMenu extends Component {
  state = {
    single: ""
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
          {this.renderSwitch(this.state.single)}
        </Grid>
      </div>
    );
  }

  resetRecomendations = () => {
    axios.get("http://localhost:5000/reset_recomendations");
  };

  renderSwitch(param) {
    switch (param) {
      case "":
        return (
          <div>
            <Grid item justify="center">
              <Typography
                variant="h3"
                component="h3"
                style={{ paddingBottom: 20 }}
              >
                Select type of recomendation system
              </Typography>
            </Grid>
            <Grid item align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ single: "single" })}
              >
                Single Recomendation system
              </Button>
              {"  "}
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.setState({ single: "many" })}
              >
                Merged Recomendation system
              </Button>
              {"  "}
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.resetRecomendations()}
              >
                Reset
              </Button>
              {"  "}
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  axios.get("http://localhost:5000/recomendation_stack")
                }
              >
                Print Backend
              </Button>
            </Grid>
          </div>
        );
      case "many":
        return <MainContainer />;
      case "single":
        return <SingleMovie />;
      default:
        return "foo";
    }
  }
}
