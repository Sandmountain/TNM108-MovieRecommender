import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import MainContainer from "./components/MainContainer";
import { Button, Grid } from "@material-ui/core";
import OptionsMenu from "./components/OptionsMenu";

function App() {
  return (
    <div>
      <Navbar />
      <OptionsMenu />
    </div>
  );
}

export default App;
