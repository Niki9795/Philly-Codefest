import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import AlertInfo from "../components/alerts";
import Map, { Marker } from 'react-map-gl';
import Card from 'react-bootstrap/Card';
import EventAlertModal from "../components/EventAlert";

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false); //remove
    const [location, setLocation] = useState({longitude: 0, latitude: 0});
    const [markers, setMarkers] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:8000/location')
            .then(response => response.json())
            .then(data => setLocation(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/markers') // Replace with your server's URL
          .then(response => response.json())
          .then(data => setMarkers(data))
          .catch(error => console.error(error));
      }, []);

    const handleAlertClick  = () => { //remove for alert
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <div className="row m-0">
                <div className="col-lg-7 col-md-12 p-0 sticky-map">
                    <Map
                        mapboxAccessToken="pk.eyJ1IjoibWFsaWt1amp3YWwiLCJhIjoiY2x2OGxwZG5xMDZibjJqbnprdDNhb2s4NiJ9.ANScLYZmZCyhYm-PMHHcog"
                        initialViewState={{
                            longitude: location.longitude,
                            latitude: location.latitude,
                            zoom: 10
                        }}
                        style={{ width: "100%", height: "100%" }}
                        mapStyle="mapbox://styles/mapbox/outdoors-v12"
                    >
                        {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            anchor="bottom"
                            color="red"
                        />
                        ))}
                        {/* <Marker longitude={-62.46641126710576} latitude={-3.5146957460989574} anchor="bottom" color="red" /> */}
                    </Map>
                </div>
                <div className="col-lg-5 col-md-12 p-4 d-flex flex-column justify-content-start align-items-center p-4 flat-green scrollable-section">
                    <h2 className="mb-4">Weekly Report for Belém do Candeia</h2>
                    <div className="w-100 d-flex justify-content-center">
                        <Card className="card-bg1" text="white" style={{ width: "18rem", margin: "0 10px" }}>
                            <Card.Body>
                                <Card.Title className="text-center">Alerts</Card.Title>
                                <div className="display-1 text-center">0</div>
                                <Card.Text className="text-center">received so far</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="card-bg2" text="white" style={{ width: "18rem", margin: "0 10px" }}>
                            <Card.Body>
                                <Card.Title className="text-center">Actions</Card.Title>
                                <div className="display-1 text-center">0</div>
                                <Card.Text className="text-center">Taken</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="card-bg3" text="white" style={{ width: "18rem", margin: "0 10px" }}>
                            <Card.Body>
                                <Card.Title className="text-center">Intruders</Card.Title>
                                <div className="display-1 text-center">0</div>
                                <Card.Text className="text-center">Detected</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="w-100 mt-4">
                        {/* Previous alerts info divs go here */}
                        <AlertInfo 
                            name="Location 1 - Drexel University" 
                            number="#001" 
                            dateTime={new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            randomNum={Math.floor(Math.random() * 1000)}
                            onClick={handleAlertClick} // Pass the click handler
                        />
                        <AlertInfo 
                            name="Alert Name 1" 
                            number="#001" 
                            dateTime={new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            randomNum={Math.floor(Math.random() * 1000)}
                            onClick={handleAlertClick} // Pass the click handler
                        />
                        <AlertInfo 
                            name="Alert Name 1" 
                            number="#001" 
                            dateTime={new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            randomNum={Math.floor(Math.random() * 1000)}
                            onClick={handleAlertClick} // Pass the click handler
                        />
                        {/* Add more divs as needed */}
                    </div>
                </div>
            </div>
            <EventAlertModal show={showModal} handleClose={handleCloseModal} />
        </div>
        
    );
};

export default Dashboard;
