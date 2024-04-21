import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EventAlertModal = ({ show, handleClose, data }) => {
    const handleConfirm = () => {
        // Any additional logic for handling confirmation
        handleClose();  // Close the modal
    };

    const handleReject = () => {
        // Any additional logic for handling rejection
        handleClose();  // Close the modal
    };

    const handleFalseNegative = () => {
        // Any additional logic for handling a false negative
        handleClose();  // Close the modal
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Event Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>This is an important alert for Belém do Candeia.</p>
                {data && (
                    <div>
                        <p>Cause: {data.class}</p>
                        <p>Confidence: {data.confidence}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="success" onClick={handleConfirm}>
                    Accept
                </Button>
                <Button variant="danger" onClick={handleReject}>
                    Reject 
                </Button>
                <Button variant="info" onClick={handleFalseNegative}>
                    False Alarm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventAlertModal;

