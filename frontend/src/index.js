import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import ErrorBoundary from "./Components/ErrorBoundry/ErrorBoundry";
import Todos from "./Todos";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ErrorBoundary>
      <Todos />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
