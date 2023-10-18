import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./routes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>{routes}</Routes>
    </Router>
  );
};

export default App;
