import React from "react";
import '../css/homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="jumbotron">
        <div className="jumbotron-content">
          <h1>Conserve AI</h1>
          <p>Protecting forests and farms with cutting-edge acoustic AI.</p>
        </div>
      </div>
      <div className="light-section">
        <div className="content-container">
          <div className="row content-section">
            <div className="col-12 col-md-6">
              <h2>About Our Technology</h2>
              <p>Discover how our AI detects threats and intrusions to preserve natural habitats.</p>
            </div>
            <div className="col-12 col-md-6">
              <img src="/acoustic.png" alt="Acoustic AI" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <div className="dark-section">
        <div className="content-container">
          <div className="row content-section">
            <div className="col-12 col-md-6">
              <img src="/map.jpg" alt="Monitoring" className="img-fluid" />
            </div>
            <div className="col-12 col-md-6">
              <h2>Real-time Monitoring</h2>
              <p>Continuous surveillance ensures that any disturbance is caught early.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;