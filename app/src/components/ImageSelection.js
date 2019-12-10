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
  render() {
    const { imgData, selectedMovie } = this.props;

    return (
      <div>
        <GridList cellHeight={200} cols={3} style={styles.gridList}>
          {imgData.map(tile => (
            <GridListTile key={tile.id}>
              <img
                src={tile.url}
                alt={tile.title}
                style={{ height: "100%", width: "100%" }}
              />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
                actionIcon={
                  <IconButton
                    color="secondary"
                    onClick={() => selectedMovie(tile.id)}
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
