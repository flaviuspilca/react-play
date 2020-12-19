import React, {useState} from "react";
import {Container, Card, Row, Col, Form, Button, InputGroup, Fade, ButtonGroup, ToggleButton} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import NumberFormat from 'react-number-format';
import ViewItemModal from "../../components/ViewItemModal/ViewItemModal";
import {calculateTax, formatIncome} from "../../core/helpers/taxCalculatorService";
import {schemaCollection} from "../../core/taxModel";
import "./tax.scss";

const Tax = () => {

    const [calculatedData, setCalculatedData] = useState({
        taxes: "",
        insuranceTaxes: "",
        income: "",
        initialAllowance: "",
        allowance: "",
        taxSplits: [],
        insuranceSplits: ""
    });
    const [userData, setUserData] = useState({amount: "", year: "", buttonsData : {type: { value: "" }, time: { value : "" }}});
    const [showModal, setShowModal] = useState(false);
    const [showFirstScreen, setShowFirstScreen] = useState(true);
    const currency = {
        pound: "£"
    };
    const displayResultsConfig = [
        {
            label: "Taxes per year",
            value: calculatedData.taxes,
            customClass: ""
        },
        {
            label: "Insurance taxes per year",
            value: calculatedData.insuranceTaxes,
            customClass: ""
        },
        {
            label: "Gross income per month",
            value: userData.amount/12,
            customClass: ""
        },
        {
            label: "Net income per month",
            value: calculatedData.income/12,
            customClass: "income-per-month"
        },
        {
            label: "Net income per year",
            value: calculatedData.income,
            customClass: ""
        },
        {
            label: "Personal allowance",
            value: calculatedData.allowance,
            customClass: ""
        }
    ];
    const breakdownButtons = {
        timeBreakdown: [
            { name: 'Yearly', value: '1' },
            { name: 'Monthly', value: '2' },
            { name: 'Weekly', value: '3' },
            { name: 'Daily', value: '4' }
        ],
        typeBreakdown: [
            { name: 'Net', value: '1' },
            { name: 'Gross', value: '2' }
        ]
    };


    const NavigationButton = (direction) => (
        <Card className="nav-button-card">
            <Button variant="btn-primary btn-circle btn-lg"
                    onClick={(e)=>{
                        setShowFirstScreen(!showFirstScreen);
                        e.currentTarget.parentElement.querySelector('.btn-circle').blur();
                    }}
            >
                <h3>{showFirstScreen ? "Click to see details" : "Back to main screen"}</h3>
                <FontAwesomeIcon className="nav-button-arrow" style={{color: '#566573'}} icon={direction} />
            </Button>
        </Card>
    );

    const ConfigurationButtons = (props) => {
        const buttons = props.buttons;
        const field = props.field;
        const [btnVal, setBtnVal] = useState(userData.buttonsData[field].value);

        return (
            <Card className="d-flex flex-column configuration-button">
                {buttons && <ButtonGroup toggle>
                    {buttons.map((button, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="outline-secondary"
                            name="radio"
                            size="sm"
                            value={button.value}
                            checked={btnVal === button.value}
                            onChange={(e) => {
                                setBtnVal(e.currentTarget.value);
                                setUserData({
                                    amount: userData.amount,
                                    year: userData.year,
                                    buttonsData: {
                                        type: { value: field === "type" ? e.currentTarget.value : userData.buttonsData.type.value },
                                        time: { value : field === "time" ? e.currentTarget.value : userData.buttonsData.time.value }
                                    }
                                });
                            }}
                        >
                            {button.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                }
            </Card>
        )
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
                    <Card.Body className="d-flex flex-column">
                        <Row>
                            <Col md={2}>
                                {calculatedData.income.toString().length>0 && !showFirstScreen &&
                                    <div className="nav-button top">
                                        {NavigationButton(faArrowLeft)}
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
                                                            setCalculatedData({income: ""});
                                                            setUserData({
                                                                amount: e.currentTarget.value,
                                                                year: userData.year,
                                                                buttonsData: {
                                                                    type: { value: userData.buttonsData.type.value },
                                                                    time: { value : userData.buttonsData.time.value }
                                                                }
                                                            })
                                                        }
                                                        }
                                                    />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text>{currency.pound}</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group className="breakdown-buttons">
                                                <ConfigurationButtons buttons={breakdownButtons.typeBreakdown} field={"type"}/>
                                                <ConfigurationButtons buttons={breakdownButtons.timeBreakdown} field={"time"}/>
                                            </Form.Group>
                                            <Form.Group controlId="yearField">
                                                <Form.Control
                                                    as="select"
                                                    className="shadow-none"
                                                    onChange={(e)=>{
                                                        setCalculatedData({income: ""});
                                                        setUserData({
                                                            amount: userData.amount,
                                                            year: e.currentTarget.value,
                                                            buttonsData: {
                                                                type: { value: userData.buttonsData.type.value },
                                                                time: { value : userData.buttonsData.time.value }
                                                            }
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
                                                        formatIncome({
                                                            value: userData.amount,
                                                            type: userData.buttonsData.type.value,
                                                            time: userData.buttonsData.time.value
                                                        });
                                                        const schema = schemaCollection.filter((item)=>(item.id.toString() === userData.year.toString())); // get the configuration object based on which we'll do the calculations
                                                        setCalculatedData(calculateTax(schema[0], userData.amount)); // set the display configuration object with the calculated data
                                                        e.currentTarget.parentElement.querySelector('.button-calculate').blur();
                                                    }
                                                }}
                                            >
                                                <h3>Calculate</h3>
                                            </Button>
                                        </Form>
                                        <div className="income-result text-center">
                                            {calculatedData.income.toString().length>0 && <Card>
                                                {
                                                    displayResultsConfig.map((item, index)=>(
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
                                            {calculatedData.income.toString().length>0 && <Card>
                                                <Row className="details-item">
                                                    <Col md={12}>
                                                        Below you can see the calculation scheme applied on your income
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        Gross salary per year:
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
                                                            value={Number(calculatedData.initialAllowance).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        /> { calculatedData.initialAllowance > calculatedData.allowance ? "reduced to " : "" }
                                                        {calculatedData.initialAllowance > calculatedData.allowance && <NumberFormat
                                                            value={Number(calculatedData.allowance).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        />}
                                                    </Col>
                                                </Row>
                                                <Row className="details-item">
                                                    <Col md={12}>
                                                        Based on the existing laws, your gross income will be split into the following intervals. A different tax rate will then be applied on each interval
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>Amount/year</Col>
                                                    <Col>Rate</Col>
                                                    <Col>Value/year</Col>
                                                </Row>
                                                {calculatedData.taxSplits.map((item, index)=>(
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
                                                <Row>
                                                    <Col>Amount/year</Col>
                                                    <Col>Rate</Col>
                                                    <Col>Value/year</Col>
                                                </Row>
                                                {calculatedData.insuranceSplits.map((item, index)=>(
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
                                                        Resulting the below net income values
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>Yearly</Col>
                                                    <Col md={6}>
                                                        <strong><NumberFormat
                                                            value={Number(calculatedData.income).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        /></strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>Monthly</Col>
                                                    <Col md={6}>
                                                        <strong><NumberFormat
                                                            value={Number(calculatedData.income/12).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        /></strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>Weekly</Col>
                                                    <Col md={6}>
                                                        <strong><NumberFormat
                                                            value={Number(calculatedData.income/52).toFixed(2)}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={currency.pound}
                                                        /></strong>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>Daily</Col>
                                                    <Col md={6}>
                                                        <strong><NumberFormat
                                                            value={Number(calculatedData.income/261).toFixed(2)}
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
                                {calculatedData.income.toString().length>0 &&
                                    <div className={`nav-button bottom ${!showFirstScreen ? 'left' : 'right'}`}>
                                        {NavigationButton(!showFirstScreen ? faArrowLeft : faArrowRight)}
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