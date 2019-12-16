import React, { Component } from "react";

import {
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton
} from "@material-ui/core";

const styles = {
  gridList: {
    flexWrap: "nowrap"
  }
};

export default class ImageSelection extends Component {
  state = {
    movieSelectionRange: {
      start: 0,
      end: 5
    }
  };

  render() {
    const { imgData, selectedMovie } = this.props;
    const { start, end } = this.state.movieSelectionRange;

    return (
      <div>
        <GridList cellHeight={"auto"} cols={5} style={styles.gridList}>
          {imgData.slice(start, end).map(tile => (
            <GridListTile key={tile.id}>
              <img
                src={tile.path}
                alt={tile.title}
                style={{ height: "100%", width: "100%" }}
              />
              <GridListTileBar
                title={tile.title}
                actionIcon={
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      console.log(tile);
                      selectedMovie(tile.title);
                      this.setState(prevState => ({
                        movieSelectionRange: {
                          ...prevState.movieSelectionRange,
                          start: (prevState.movieSelectionRange.start += 5),
                          end: (prevState.movieSelectionRange.end += 5)
                        }
                      }));
                    }}
                  >
                    <Icon>star</Icon>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
