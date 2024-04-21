import React from "react";
import '../css/homepage.css';  // Importing CSS for styling

const HomePage = () => {
  return(
    <div className="homepage">
      <div className="jumbotron jumbotron-fluid bg-dark text-white text-center">
        <div className="container">
          <h1 className="display-4">Guardian of the Greens</h1>
          <p className="lead">Protecting forests and farms with cutting-edge acoustic AI.</p>
        </div>
      </div>
      <div className="container bg-custom" style={{color: '#333'}}>  
        <div className="row content-section">
          <div className="col-12">
            <h2>About Our Technology</h2>
            <p>Discover how our AI detects threats and intrusions to preserve natural habitats.</p>
            <img src="path_to_an_explanatory_image.jpg" alt="Acoustic AI" className="img-fluid"/>
          </div>
        </div>
        <div className="row content-section">
          <div className="col-12">
            <h2>Real-time Monitoring</h2>
            <p>Continuous surveillance ensures that any disturbance is caught early.</p>
            <img src="path_to_monitoring_image.jpg" alt="Monitoring" className="img-fluid"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage;
