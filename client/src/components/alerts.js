import React from "react";

const AlertInfo = ({ name, number, dateTime, randomNum, onClick }) => {
    return (
        <div onClick={onClick} className="alert-box mb-3 d-flex flex-column justify-content-between" style={{ padding: '1rem', border: '1px solid #444', borderRadius: '0.5rem' }}>
            <div className="d-flex justify-content-between">
                <span className="alert-name large-font">{name}</span>
                <span className="alert-number large-font">{number}</span>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <span className="alert-date">{dateTime}</span>
                <span className="alert-random">{randomNum}</span>
            </div>
        </div>
    );
};

export default AlertInfo;
