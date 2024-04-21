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
              <h2>How our system helps preserve rainforests?</h2>
              <p>Prevent Illegal Deforestation by sending realtime alerts to detect chainsaws, trucks and sign of incursion</p>
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
              <p>We can help stop poaching by providing rangers, farmers or even common people with real-time data and patterns of activity that allow for targeted protections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;