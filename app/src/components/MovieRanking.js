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
    objectFit: "cover",
    width: "100%",
    height: "100%",
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
        <CardActionArea>
          <CardMedia
            style={styles.media}
            component="img"
            image={movieToRank.poster_path}
            title={movieToRank.original_title}
          />
        </CardActionArea>
      </div>
    );
  }
}
