import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faEye} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./ResponsiveTable.scss";
import Modal from 'react-bootstrap/Modal'

const NewsFullView = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.data.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>by {props.data.author}</h4>
                <p>{props.data.content}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

const ResponsiveTable = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState(0);

    const buildIconCell = (type, url, index) => {
        return(<>
            {type === 'url' && <a href={url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon style={{color: "#000"}} icon={type === "view" ? faEye : faLink} />
            </a>}
            {type === 'view' && <Button variant="link" size="sm" onClick={() => {
                setIndex(index);
                setShowModal(true)
            }}>
                <FontAwesomeIcon style={{color: '#000'}} icon={faEye} />
            </Button>}
            </>
        )
    };

    return (
        <div className="responsive-table-container">
            {props.data.length > 0 && props.data.map(item => {
                return(
                    <Card key={item.id}>
                        <Card.Body>
                            {
                                props.columns.map((col, index) => {
                                    return(
                                        <Row key={index}>
                                            <Col className="col-4"><span className="font-weight-bold">{col.text}</span></Col>
                                            <Col className="col-8">{col.dataField === 'view' || col.dataField === 'url' ? buildIconCell(col.dataField, item[col.dataField], item.id) : item[col.dataField]}</Col>
                                        </Row>
                                    )
                                })
                            }
                        </Card.Body>
                    </Card>
                )
            })}
            {props.data.length > 0 && (<div>Total: {props.data.length} news</div>)}
            {props.data.length === 0 && (
                <Card key="0">
                    <Card.Body>
                        Sorry! We found no data.
                    </Card.Body>
                </Card>
            )}

            {props.data.length > 0 && <NewsFullView
                index={index}
                data={props.data[index]}
                show={showModal}
                onHide={() => setShowModal(false)}
            />}
        </div>
    );
};

export default ResponsiveTable;
