import React from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import "./ViewItemModal.scss";

const ViewItemModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {props.data.title && <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.data.title}
                </Modal.Title>
            </Modal.Header>}
            <Modal.Body className="text-center">
                <span>{props.data.content}</span>
                {props.data.author && <span className="text-left font-italic">by: {props.data.author}</span>}
            </Modal.Body>
            <Modal.Footer>
                <Button size={"sm"} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewItemModal;