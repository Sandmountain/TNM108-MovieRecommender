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
    flexWrap: "wrap"
  }
};

export default class SingleImageSelection extends Component {
  state = {
    movieSelectionRange: {
      start: 0,
      end: 12
    }
  };

  render() {
    const { imgData, selectedMovie } = this.props;
    const { start, end } = this.state.movieSelectionRange;

    return (
      <div>
        <GridList cellHeight={"auto"} cols={6} style={styles.gridList}>
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
                      selectedMovie(tile.title);
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
