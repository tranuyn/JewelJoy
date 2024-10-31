import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Dashboard from "./component/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Dashboard/>
      <AppRoutes />
    </Router>
  );
}

export default App;
