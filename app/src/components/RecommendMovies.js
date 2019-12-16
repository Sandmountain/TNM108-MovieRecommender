import React, { Component } from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

export default class RecommendMovies extends Component {
  render() {
    return (
      <div>
        <GridList cellHeight={"auto"} cols={5}>
          {this.props.imgData.map(tile => (
            <GridListTile key={tile.id}>
              <img
                src={`http://image.tmdb.org/t/p/w185/${tile.path}`}
                alt={tile.title}
                style={{ height: "100%", width: "100%" }}
              />
              <GridListTileBar title={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
