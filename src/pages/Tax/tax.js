import React, {useState} from "react";
import {Container, Card, Row, Col, Form, Button, InputGroup, Fade} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
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
    const [taxSplits, setTaxSplits] = useState([]);
    const [insuranceSplits, setInsuranceSplits] = useState([]);
    const [initialAllowance, setInitialAllowance] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showFirstScreen, setShowFirstScreen] = useState(true);
    const schemaCollection = [
        {
            id: "19-20",
            allowance: 12500,
            basicIncomeMaxLimit: 50000,
            highIncomeMaxLimit: 150000,
            rates: [20, 40, 45],
            allowanceLimit: 100000,
            insurance: {
                lowLimit: 12*719,
                lowRate: 12,
                highLimit: 12*4167,
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
                lowLimit: 12*792,
                lowRate: 12,
                highLimit: 12*4167,
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
            value: incomeTaxes,
            customClass: ""
        },
        {
            label: "Insurance taxes per year",
            value: insuranceTaxes,
            customClass: ""
        },
        {
            label: "Gross income per month",
            value: userData.amount/12,
            customClass: ""
        },
        {
            label: "Net income per month",
            value: income/12,
            customClass: "income-per-month"
        },
        {
            label: "Net income per year",
            value: income,
            customClass: ""
        },
        {
            label: "Personal allowance",
            value: allowance,
            customClass: ""
        }
    ];
    let calculatedData = {};

    const navigationButton = (direction) => (
        <Card className="nav-button-card">
            <Button variant="btn-primary btn-circle btn-lg"
                    onClick={(e)=>{
                            setShowFirstScreen(!showFirstScreen);
                            e.currentTarget.parentElement.querySelector('.btn-circle').blur();
                    }
                    }
            >
                <h3>{showFirstScreen ? "Click to see details" : "Go back to main screen"}</h3>
                <FontAwesomeIcon className="nav-button-arrow" style={{color: '#566573'}} icon={direction} />
            </Button>
        </Card>
    );

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
                                {income.toString().length>0 && !showFirstScreen &&
                                    <div className="nav-button top">
                                        {navigationButton(faArrowLeft)}
                                    </div>
                                }
                            </Col>
                            <Col md={8}>
                                <Fade in={showFirstScreen}>
                                    <div className={!showFirstScreen ? "main-screen" : ""}>
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
                                                        calculatedData = calculateTax(schema[0], userData.amount);
                                                        setIncomeTaxes(calculatedData.taxes);
                                                        setInsuranceTaxes(calculatedData.insuranceTax);
                                                        setIncome(calculatedData.output);
                                                        setInitialAllowance(calculatedData.initialAllowance);
                                                        setAllowance(calculatedData.allowance);
                                                        setTaxSplits(calculatedData.taxSplits);
                                                        setInsuranceSplits(calculatedData.insuranceSplits);
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
                                                        <Row key={index} className={item.customClass}>
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
                                    </div>
                                </Fade>
                                <Fade in={!showFirstScreen}>
                                    <div className={showFirstScreen ? "second-screen" : ""}>
                                        <div className="income-result text-center">
                                            {income.toString().length>0 && <Card>
                                                <Row className="details-item">
                                                    <Col md={12}>
                                                        Below you can see the calculation scheme applied on your income
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        Gross salary:
                                                    </Col>
                                                    <Col md={6}>
                                                        <NumberFormat
                                                            value={Number(userData.amount).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        Personal allowance:
                                                    </Col>
                                                    <Col md={6}>
                                                        <NumberFormat
                                                            value={Number(initialAllowance).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        /> reduced to <NumberFormat
                                                            value={Number(allowance).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="details-item">
                                                    <Col md={12}>
                                                        Based on the existing laws, your gross income will be split into the following intervals. A different tax rate will then be applied on each interval
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Amount</Col>
                                                    <Col>Rate</Col>
                                                    <Col>Value</Col>
                                                </Row>
                                                {taxSplits.map((item, index)=>(
                                                    <Row key={index}>
                                                        <Col>
                                                            <NumberFormat
                                                                value={Number(item.amount).toFixed(2)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={currency.pound}
                                                            />
                                                        </Col>
                                                        <Col>{item.rate}%</Col>
                                                        <Col>
                                                            <NumberFormat
                                                                value={Number(item.value).toFixed(2)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={currency.pound}
                                                            />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Row className="details-item">
                                                    <Col md={12}>
                                                        The calculation of the National Insurance is made by the below breakpoints
                                                    </Col>
                                                </Row>
                                                {insuranceSplits.map((item, index)=>(
                                                    <Row key={index}>
                                                        <Col>
                                                            <NumberFormat
                                                                value={Number(item.amount).toFixed(2)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={currency.pound}
                                                            />
                                                        </Col>
                                                        <Col>{item.rate}%</Col>
                                                        <Col>
                                                            <NumberFormat
                                                                value={Number(item.value).toFixed(2)}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={currency.pound}
                                                            />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Row className="details-item">
                                                    <Col md={12}>
                                                        Resulting the below net income per month
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <strong><NumberFormat
                                                            value={Number(income).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        /></strong>
                                                    </Col>
                                                </Row>
                                            </Card>}
                                        </div>
                                    </div>
                                </Fade>
                            </Col>
                            <Col md={2}>
                                {income.toString().length>0 &&
                                    <div className={`nav-button bottom ${!showFirstScreen ? 'left' : 'right'}`}>
                                        {navigationButton(!showFirstScreen ? faArrowLeft : faArrowRight)}
                                    </div>
                                }
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