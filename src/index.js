import React from "react";
import { render } from "react-dom";
import "./index.css";

import Pokedex from "./Pokedex";

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <Pokedex />
      </div>
    </React.StrictMode>
  );
}

render(<App />, document.getElementById("root"));
