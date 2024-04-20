import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";

function App() {
  
  useEffect(() => {
    const refreshPage = () => {
      window.location.reload();
    };
    const interval = setInterval(refreshPage, 2 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
