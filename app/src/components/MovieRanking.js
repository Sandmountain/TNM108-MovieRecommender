import React, { Component } from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

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
  render() {
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
