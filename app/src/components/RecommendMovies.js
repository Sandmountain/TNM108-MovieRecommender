import React, { Component } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

export default class RecommendMovies extends Component {
  render() {
    return (
      <div>
        <GridList cellHeight={240} cols={5}>
          {this.props.imgData.map(tile => (
            <GridListTile key={tile.id}>
              <img
                src={tile.url}
                alt={tile.title}
                style={{ height: "100%", width: "100%" }}
              />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.author}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
