import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from 'react-map-gl';
import Card from 'react-bootstrap/Card';

const Dashboard = () => {
    return (
        <div>
            <div className="row m-0">
                <div className="col-md-6 p-0">
                    <Map
                        mapboxAccessToken="pk.eyJ1IjoibWFsaWt1amp3YWwiLCJhIjoiY2x2OGxwZG5xMDZibjJqbnprdDNhb2s4NiJ9.ANScLYZmZCyhYm-PMHHcog"
                        initialViewState={{
                            longitude: -122.4,
                            latitude: 37.8,
                            zoom: 14
                        }}
                        style={{ width: "100%", height: "100vh" }}
                        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                    >
                        <Marker longitude={-122.4} latitude={37.8} anchor="bottom" color="red" />
                    </Map>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-start align-items-center p-4 flat-green">
                    <h2 className="mb-4">Weekly Report</h2>
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
                </div>
            </div>
        </div>
    );
};

export default Dashboard;