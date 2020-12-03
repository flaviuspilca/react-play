import React from "react";
import {Container, Card, Row, Col} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const Error = (props) => {
    const backTo = "/"+props.origin;

    return(
        <div className="error-component-container">
            <section className="content">
                <Container>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    Ooops!
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    It seems there is an internal error. Please double check if the inputs are in the
                                    right format.
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <a href={backTo} className="text-decoration-none text-muted">
                                        <FontAwesomeIcon style={{color: '#000'}} icon={faArrowLeft} /> Go back
                                    </a>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </div>
    );
};

export default Error;
