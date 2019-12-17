import React, { Component } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import StarRatings from "react-star-ratings";
import ShuffleIcon from "@material-ui/icons/Shuffle";

export default class MovieRankingContainer extends Component {
  state = {
    rating: 0
  };

  changeRating = (newRating, name) => {
    this.props.sendRating(newRating, this.props.movieToRank.original_title);
  };

  render() {
    const { rating } = this.state;
    const { movieToRank } = this.props;
    return (
      <div>
        <CardContent style={styles.cardContent} style={{ marginBottom: 20 }}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography variant="h6" component="h5">
                {movieToRank.original_title}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <StarRatings
                rating={rating}
                starRatedColor="#f4f425"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="3px"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Typography variant="h6" component="h6">
          About the movie:
        </Typography>
        <Typography component="p">{movieToRank.overview}</Typography>

        <Fab
          style={{
            float: "right",
            backgroundColor: "#e6432f",
            color: "#fff"
          }}
          onClick={() => this.props.getMovieToRate()}
        >
          <ShuffleIcon />
        </Fab>
      </div>
    );
  }
}

const styles = {
  card: {
    maxWidth: 400,
    margin: 5
  },
  media: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    margin: 5
  },
  cardContent: {
    width: "100%"
  },
  buttonContent: {
    padding: "0px 0px 5px 0px"
  },
  rightButton: {
    flexBasis: "0%"
  }
};
