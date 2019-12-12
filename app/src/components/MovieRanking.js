import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import StarRatings from "react-star-ratings";

const styles = {
  card: {
    maxWidth: 400,
    margin: 5
  },
  media: {
    height: 300,
    width: 300,
    margin: 5
  },
  cardContent: {
    paddingRight: "5px",
    paddingLeft: "5px",
    paddingBottom: "2px",
    paddingTop: "5px"
  },
  buttonContent: {
    padding: "0px 0px 5px 0px"
  },
  rightButton: {
    flexBasis: "0%"
  }
};

export default class MovieRanking extends Component {
  state = {
    rating: 0
  };

  changeRating = (newRating, name) => {
    this.setState({
      rating: newRating
    });

    // Axios post rating and movie ID
  };
  render() {
    const { rating } = this.state;
    const { movieToRank } = this.props;

    return (
      <div>
        <Card style={styles.card}>
          <CardActionArea>
            <CardMedia
              style={styles.media}
              image={movieToRank.poster_path}
              title={movieToRank.original_title}
            />
          </CardActionArea>
          <CardContent style={styles.cardContent}>
            <Grid
              container
              direction="column"
              justify="center"
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
                  starRatedColor="blue"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="3px"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={styles.buttonContent}>
            <Grid
              container
              direction="row"
              alignItems="stretch"
              justify="space-between"
            >
              <Grid item xs={4}>
                <Button size="medium" color="primary">
                  Prev
                </Button>
              </Grid>
              <Grid item style={styles.rightButton} xs={4}>
                <Button size="medium" color="primary">
                  Next
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    );
  }
}
