import React, {useState} from "react";
import {Container, Card, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import "./tax.scss";

const Tax = () => {

    const [income, setIncome] = useState(0);
    const scheme = [
        {
            id: 2019,
            basicRange: {
                minRange: 0,
                maxRange: 999,
            },
            highRange: {
                minRange: 0,
                maxRange: 999,
            },
            basicRate: 0,
            highRate: 0
        },
        {
            id: 2020,
            basicRange: {
                minRange: 0,
                maxRange: 999,
            },
            highRange: {
                minRange: 0,
                maxRange: 999,
            },
            basicRate: 0,
            highRate: 0
        },
        {
            id: 2021,
            basicRange: {
                minRange: 0,
                maxRange: 999,
            },
            highRange: {
                minRange: 0,
                maxRange: 999,
            },
            basicRate: 0,
            highRate: 0
        },
        {
            id: 2022,
            basicRange: {
                minRange: 0,
                maxRange: 999,
            },
            highRange: {
                minRange: 0,
                maxRange: 999,
            },
            basicRate: 0,
            highRate: 0
        }
    ];

    return(<div className="tax-page-container">
        <section className="content">
            <Container>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <h3>Welcome to the tax calculator page!</h3>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={3}>

                            </Col>
                            <Col md={6}>
                                <Card className="shadow p-3 bg-white rounded tax-calculator">
                                    <Form>
                                        <Form.Group controlId="incomeField">
                                            <InputGroup className="mb-2 mr-sm-2">
                                                <Form.Control className="shadow-none" type="text" placeholder="Insert your income" />
                                                <InputGroup.Append>
                                                    <InputGroup.Text>£</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId="yearField">
                                            <Form.Control as="select" className="shadow-none">
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button
                                            className="button-calculate btn btn-primary btn-block shadow-none"
                                            onClick={(e) => {
                                                    setIncome(999);
                                                    e.currentTarget.parentElement.querySelector('.button-calculate').blur();
                                                }
                                            }
                                        >
                                            <h3>Calculate</h3>
                                        </Button>
                                    </Form>
                                    <div className="income-result text-center">
                                        <h1 className="display-4">{income}</h1>
                                    </div>
                                </Card>
                            </Col>
                            <Col md={3}>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    </div>)
};

export default Tax;