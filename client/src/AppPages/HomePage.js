// HomePage.js
import React from "react";
import Navbar from "./components/NavBar"; // Import the Navbar component

const HomePage = () => {
  return (
    <div className="App">
      <Navbar /> {/* Use the Navbar component */}
      <div className="d-flex justify-content-between align-items-center chart-container">
        <div>
          {/* Your chart or content goes here */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;