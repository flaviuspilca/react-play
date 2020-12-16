import React, {useState} from "react";
import {Container, Card, Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import NumberFormat from 'react-number-format';
import ViewItemModal from "../../components/ViewItemModal/ViewItemModal";
import {calculateTax} from "../../core/helpers/taxCalculatorService";
import "./tax.scss";

const Tax = () => {

    const [income, setIncome] = useState("");
    const [allowance, setAllowance] = useState("");
    const [incomeTaxes, setIncomeTaxes] = useState("");
    const [insuranceTaxes, setInsuranceTaxes] = useState("");
    const [userData, setUserData] = useState({amount: "", year: ""});
    const [showModal, setShowModal] = useState(false);
    const schemaCollection = [
        {
            id: "19-20",
            allowance: 12500,
            basicIncomeMaxLimit: 50000,
            highIncomeMaxLimit: 150000,
            rates: [20, 40, 45],
            allowanceLimit: 100000,
            insurance: {
                lowLimit: 719,
                lowRate: 12,
                highLimit: 4167,
                highRate: 2
            }
        },
        {
            id: "20-21",
            allowance: 12500,
            basicIncomeMaxLimit: 50000,
            highIncomeMaxLimit: 150000,
            rates: [20, 40, 45],
            allowanceLimit: 100000,
            insurance: {
                lowLimit: 792,
                lowRate: 12,
                highLimit: 4167,
                highRate: 2
            }
        }
    ];
    const currency = {
        pound: "£"
    };

    const displayConfig = [
        {
            label: "Taxes per year",
            value: incomeTaxes
        },
        {
            label: "Insurance taxes per year",
            value: insuranceTaxes
        },
        {
            label: "Gross income per month",
            value: userData.amount/12
        },
        {
            label: "Net income per month",
            value: income/12
        },
        {
            label: "Net income per year",
            value: income
        },
        {
            label: "Personal allowance",
            value: allowance
        }
    ];

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
                    <Card.Body className="d-flex flex-column">
                        <Row>
                            <Col md={2}>

                            </Col>
                            <Col md={8}>
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
                                            <option value="20-21">2020-2021</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        className="button-calculate btn btn-primary btn-block shadow-none"
                                        onClick={(e) => {
                                            if( Number(userData.amount) === 0 || userData.year.length !== 5 ) {
                                                setShowModal(true);
                                            }else{
                                                const schema = schemaCollection.filter((item)=>(item.id.toString() === userData.year.toString()));
                                                const calculate = calculateTax(schema[0], userData.amount);
                                                setIncomeTaxes(calculate[0]);
                                                setInsuranceTaxes(calculate[1]);
                                                setIncome(calculate[2]);
                                                setAllowance(calculate[3]);
                                                e.currentTarget.parentElement.querySelector('.button-calculate').blur();
                                            }
                                        }
                                        }
                                    >
                                        <h3>Calculate</h3>
                                    </Button>
                                </Form>
                                <div className="income-result text-center">
                                    {income.toString().length>0 && <Card>
                                        {
                                            displayConfig.map((item, index)=>(
                                                <Row key={index}>
                                                    <Col md={6}>
                                                        <h6><small>{item.label}</small></h6>
                                                    </Col>
                                                    <Col md={6}>
                                                        <h3>
                                                            <NumberFormat
                                                                value={Number(item.value).toFixed(2)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={currency.pound}
                                                            />
                                                        </h3>
                                                    </Col>
                                                </Row>
                                            ))
                                        }
                                    </Card>}
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="see-details">
                                    {income.toString().length>0 && <Card className="see-details-card">
                                        <Button variant="btn-primary btn-circle btn-lg">
                                            <h3>Click to see details</h3>
                                            <FontAwesomeIcon className="see-details-arrow" style={{color: '#566573'}} icon={faArrowRight} />
                                        </Button>
                                    </Card>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </section>
        <ViewItemModal
            index="0"
            data={{content: "Please remember to provide values for both fields"}}
            show={showModal}
            onHide={() => setShowModal(false)}
        />
    </div>)
};

export default Tax;