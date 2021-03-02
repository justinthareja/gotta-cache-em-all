import React from "react";
import { render } from "react-dom";
import "./index.css";

function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <h1>gotta cache em all</h1>
      </div>
    </React.StrictMode>
  );
}

render(<App />, document.getElementById("root"));
