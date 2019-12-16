import React, { Component } from "react";

import MovieRanking from "./MovieRanking";
import MovieRankingContainer from "./MovieRankingContainer";

export default class extends Component {
  render() {
    return (
      <div>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <MovieRanking movieToRank={this.state.movieToRank} />
          </Grid>
          <Grid item xs={6}>
            <MovieRankingContainer movieToRank={this.state.movieToRank} />
            <Grid />
          </Grid>
        </Grid>
      </div>
    );
  }
}
