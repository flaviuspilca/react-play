import React, {useState} from "react";
import {Container, Card, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import NumberFormat from 'react-number-format';
import "./tax.scss";

const Tax = () => {

    const [income, setIncome] = useState("");
    const [taxes, setTaxes] = useState("");
    const [allowance, setAllowance] = useState("");
    const [userData, setUserData] = useState({amount: "", year: ""});
    const schemaCollection = [
        {
            id: "19-20",
            basicIncome: {
                minRange: 12501,
                maxRange: 50000,
                rate: 20
            },
            highIncome: {
                minRange: 50001,
                maxRange: 150000,
                rate: 40
            },
            allowance: 12500,
            allowanceLimit: 100000,
            additionalRate: 45
        },
        {
            id: "21-22",
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
            allowance: 12500,
            allowanceLimit: 100000,
            additionalRate: 45
        }
    ];
    const currency = {
        pound: "£"
    };

    const calculateTax = (schema, income) => {
        let output, taxes, allowance;
        allowance = schema.allowance;

        if( income <= schema.highIncome.maxRange ) {
            if( income < schema.basicIncome.minRange ) {
                taxes=0;
                output = income;
            }
            if( income >= schema.basicIncome.minRange && income <= schema.basicIncome.maxRange ){
                taxes = schema.basicIncome.rate/100 * income;
                output = income - taxes;
            }
            if( income >= schema.highIncome.minRange && income <= schema.highIncome.maxRange ){
                taxes = schema.highIncome.rate/100 * income;
                output = income - taxes;
            }
        }else{
            taxes = schema.additionalRate/100 * income;
            output = income - taxes;
        }

        if( income > schema.allowanceLimit) {
            const diff = income - schema.allowanceLimit;
            if( diff >= 2*allowance ) allowance = 0;
            else allowance = allowance - diff/2;
        }

        return [output, taxes, allowance]
    };

    return(<div className="tax-page-container">
        <section className="content">
            <Container>
                <Card>
                    <Card.Header className="text-center">
                        <Row>
                            <Col>
                                <h3>Welcome to the tax calculator page</h3>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={2}>

                            </Col>
                            <Col md={8}>
                                <Card className="shadow p-3 bg-white rounded tax-calculator">
                                    <h6>This widget will help you better project your monthly net income.</h6>
                                    <p>To use this calculator you need to fill in the below two fields, representing the desired annual gross income and the fiscal year to refer the calculation.</p>
                                    <Form>
                                        <Form.Group controlId="incomeField">
                                            <InputGroup className="mb-2 mr-sm-2">
                                                <Form.Control
                                                    className="shadow-none"
                                                    type="number"
                                                    placeholder="Insert your income"
                                                    onChange={(e)=>{
                                                        const string = e.currentTarget.value.toString();
                                                        if( string.charAt(0) === "0" ) {
                                                            e.currentTarget.value = string.substring(1,string.length);
                                                        }
                                                        if( string.length > 10 ) {
                                                            e.currentTarget.value = string.substring(0,10);
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
                                                <option value="-">Please select a year</option>
                                                <option value="19-20">2019-2020</option>
                                                <option value="21-22">2021-2022</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button
                                            className="button-calculate btn btn-primary btn-block shadow-none"
                                            disabled={Number(userData.amount) === 0 || userData.year.length !== 5}
                                            onClick={(e) => {
                                                    const schema = schemaCollection.filter((item)=>(item.id.toString() === userData.year.toString()));
                                                    const calculate = calculateTax(schema[0], userData.amount);
                                                    setIncome(calculate[0]);
                                                    setTaxes(calculate[1]);
                                                    setAllowance(calculate[2]);
                                                    e.currentTarget.parentElement.querySelector('.button-calculate').blur();
                                                }
                                            }
                                        >
                                            <h3>Calculate</h3>
                                        </Button>
                                    </Form>
                                    <div className="income-result text-center">
                                        {income.toString().length>0 && <Card>
                                            <Row>
                                                <Col md={6}>
                                                    <h6><small>Total taxes paid:</small></h6>
                                                </Col>
                                                <Col md={6}>
                                                    <h3>
                                                        <NumberFormat
                                                            value={Number(taxes).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />
                                                    </h3>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <h6><small>Total income received:</small></h6>
                                                </Col>
                                                <Col md={6}>
                                                    <h3>
                                                        <NumberFormat
                                                            value={Number(income).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />
                                                    </h3>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <h6><small>Gross income per month:</small></h6>
                                                </Col>
                                                <Col md={6}>
                                                    <h3>
                                                        <NumberFormat
                                                            value={Number(userData.amount/12).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />
                                                    </h3>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <h6><small>Net income per month:</small></h6>
                                                </Col>
                                                <Col md={6}>
                                                    <h3>
                                                        <NumberFormat
                                                            value={Number(income/12).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />
                                                    </h3>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <h6><small>Personal allowance per year:</small></h6>
                                                </Col>
                                                <Col md={6}>
                                                    <h3>
                                                        <NumberFormat
                                                            value={Number(allowance).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />
                                                    </h3>
                                                </Col>
                                            </Row>
                                        </Card>}
                                    </div>
                                </Card>
                            </Col>
                            <Col md={2}>

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    </div>)
};

export default Tax;