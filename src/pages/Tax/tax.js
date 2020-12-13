import React, {useState} from "react";
import {Container, Card, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import NumberFormat from 'react-number-format';
import "./tax.scss";

const Tax = () => {

    const [income, setIncome] = useState("");
    const [userData, setUserData] = useState({amount: 0, year: 0});
    const schemeCollection = [
        {
            id: 2019,
            basicIncome: {
                minRange: 12500,
                maxRange: 50000,
                rate: 20
            },
            highIncome: {
                minRange: 50001,
                maxRange: 150000,
                rate: 40
            },
            additionalRate: 45
        },
        {
            id: 2020,
            basicIncome: {
                minRange: 12500,
                maxRange: 50000,
                rate: 20
            },
            highIncome: {
                minRange: 50001,
                maxRange: 150000,
                rate: 40
            },
            additionalRate: 45
        },
        {
            id: 2021,
            basicIncome: {
                minRange: 12500,
                maxRange: 50000,
                rate: 20
            },
            highIncome: {
                minRange: 50001,
                maxRange: 150000,
                rate: 40
            },
            additionalRate: 45
        },
        {
            id: 2022,
            basicIncome: {
                minRange: 12500,
                maxRange: 50000,
                rate: 20
            },
            highIncome: {
                minRange: 50001,
                maxRange: 150000,
                rate: 40
            },
            additionalRate: 45
        }
    ];
    const currency = {
        pound: "£"
    };

    const calculateTax = (scheme, income) => {
        let output;

        if( income <= scheme.highIncome.maxRange ) {
            if( income < scheme.basicIncome.minRange ) {
                output = income;
            }
            if( income >= scheme.basicIncome.minRange && income <= scheme.basicIncome.maxRange ){
                output = income - scheme.basicIncome.rate/100 * income;
            }
            if( income >= scheme.highIncome.minRange && income <= scheme.highIncome.maxRange ){
                output = income - scheme.highIncome.rate/100 * income;
            }
        }else{
            output = income - scheme.additionalRate/100 * income;
        }

        return output
    };

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
                                                <Form.Control
                                                    className="shadow-none"
                                                    type="number"
                                                    placeholder="Insert your income"
                                                    onChange={(e)=>{
                                                        if( e.currentTarget.value.toString().length > 10 ) {
                                                            e.currentTarget.value = e.currentTarget.value.toString().substring(0,10);
                                                        }
                                                        setIncome("");
                                                        setUserData({
                                                            amount: e.currentTarget.value,
                                                            year: userData.year
                                                        })
                                                        }
                                                    }
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text>{currency.pound}</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId="yearField">
                                            <Form.Control
                                                as="select"
                                                className="shadow-none"
                                                onChange={(e)=>{
                                                    setIncome("");
                                                    setUserData({
                                                        amount: userData.amount,
                                                        year: e.currentTarget.value
                                                    })
                                                    }
                                                }
                                            >
                                                <option value="0">Please select a year</option>
                                                <option value="2019">2019</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button
                                            className="button-calculate btn btn-primary btn-block shadow-none"
                                            disabled={userData.amount.toString().length === 0 || userData.year.toString().length !== 4}
                                            onClick={(e) => {
                                                    const scheme = schemeCollection.filter((item)=>(item.id.toString() === userData.year.toString()));
                                                    setIncome(calculateTax(scheme[0], userData.amount));
                                                    e.currentTarget.parentElement.querySelector('.button-calculate').blur();
                                                }
                                            }
                                        >
                                            <h3>Calculate</h3>
                                        </Button>
                                    </Form>
                                    <div className="income-result text-center">
                                        {income.toString().length>0 && <h3>
                                            <NumberFormat
                                                value={income}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={currency.pound}
                                            />
                                        </h3>}
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