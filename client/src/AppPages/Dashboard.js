import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import AlertInfo from "../components/alerts";
import Map, { Marker } from 'react-map-gl';
import Card from 'react-bootstrap/Card';
import EventAlertModal from "../components/EventAlert";

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false); //remove
    const [outputData, setOutputData] = useState(null);
    const [alerts, setAlerts] = useState();
    
    const handleAlertClick  = (data) => { //remove for alert
        setShowModal(true);
        setOutputData(data);
    };

    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:8000/detect')
                .then(response => response.json())
                .then(data => {
                    if (data.data !== null) {
                        handleAlertClick(data.data); //remove
                        console.log(data.data);
                    }
                })
                .catch(error => console.error(error));
        }, 10000); // 10000 milliseconds = 10 seconds

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/alerts') // Replace with your server's URL
          .then(response => response.json())
          .then(data => {
            setAlerts(data);
            console.log('Alerts:', data);
          })
          .catch(error => console.error(error));
      }, []);

    return (
        <div>
            <div className="row m-0">
                <div className="col-lg-7 col-md-12 p-0 sticky-map">
                    <Map
                        mapboxAccessToken="pk.eyJ1IjoibWFsaWt1amp3YWwiLCJhIjoiY2x2OGxwZG5xMDZibjJqbnprdDNhb2s4NiJ9.ANScLYZmZCyhYm-PMHHcog"
                        initialViewState={{
                            longitude: -62.46641126710576,
                            latitude: -3.5146957460989574,
                            zoom: 10
                        }}
                        style={{ width: "100%", height: "100%" }}
                        mapStyle="mapbox://styles/mapbox/outdoors-v12"
                    >
                        <Marker
                            longitude= {-62.4666}
                            latitude={-3.514698}
                            anchor="bottom"
                            color="red"
                        />
                        <Marker
                            longitude= {-62.7}
                            latitude={-3.67}
                            anchor="bottom"
                            color="red"
                        />
                        <Marker
                            longitude= {-62.5}
                            latitude={-3.6}
                            anchor="bottom"
                            color="red"
                        />
                        
                        {/* <Marker longitude={-62.46641126710576} latitude={-3.5146957460989574} anchor="bottom" color="red" /> */}
                    </Map>
                </div>
                <div className="col-lg-5 col-md-12 p-4 d-flex flex-column justify-content-start align-items-center p-4 flat-green scrollable-section">
                    <h2 className="mb-4">Weekly Report for Belém do Candeia</h2>
                    <div className="w-100 d-flex justify-content-center">
                        <Card className="card-bg1" text="white" style={{ width: "18rem", margin: "0 10px" }}>
                            <Card.Body>
                                <Card.Title className="text-center">Alerts</Card.Title>
                                <div className="display-1 text-center">3</div>
                                <Card.Text className="text-center">received so far</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="card-bg2" text="white" style={{ width: "18rem", margin: "0 10px" }}>
                            <Card.Body>
                                <Card.Title className="text-center">Actions</Card.Title>
                                <div className="display-1 text-center">4</div>
                                <Card.Text className="text-center">Taken</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className="card-bg3" text="white" style={{ width: "18rem", margin: "0 10px" }}>
                            <Card.Body>
                                <Card.Title className="text-center">Intruders</Card.Title>
                                <div className="display-1 text-center">2</div>
                                <Card.Text className="text-center">Detected</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="w-100 mt-4">
                        {/* Previous alerts info divs go here */}
                        {alerts && (
                        <AlertInfo 
                            name={alerts.location[0]} 
                            number={`Forest`} 
                            dateTime={new Date(alerts.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            cause={"forest"}
                        />
                        )}
                        {/* Add more divs as needed */}
                    </div>
                </div>
            </div>
            <EventAlertModal show={showModal} handleClose={handleCloseModal} data={outputData}/>
        </div>
        
    );
};

export default Dashboard;
