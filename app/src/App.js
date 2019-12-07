import React from "react";
import "./App.css";
import { Button } from "@material-ui/core";

import Navbar from "./components/Navbar";
import MainContainer from "./components/MainContainer";

function App() {
  return (
    <div>
      <Navbar />
      <MainContainer />
      <Button variant="contained" color="secondary">
        Click me!
      </Button>
    </div>
  );
}

export default App;
