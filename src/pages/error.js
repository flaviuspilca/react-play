import React from "react";
import {useHistory} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Error = () => {
    const history = useHistory();

    history.push("/error")
    (
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
                        </Card.Body>
                    </Card>
                </Container>
            </section>
        </div>
    );
};

export default Error;
