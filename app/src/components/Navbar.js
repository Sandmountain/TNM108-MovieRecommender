import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import { Button } from "@material-ui/core";

export default function Navbar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Grid item align="left">
            <Button size="small" onClick={() => window.location.reload()}>
              <HomeIcon style={{ color: "white" }} />
            </Button>
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Grid item sm={6} align="center">
              <Typography variant="h6" color="inherit">
                Movie Recommender
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
