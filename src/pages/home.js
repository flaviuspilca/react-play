import React, {useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLink, faTimes, faSearch, faEye} from "@fortawesome/free-solid-svg-icons";
import {FETCH_API, SEARCH_API} from "../core/api";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ResponsiveTable from "../components/ResponsiveTable/ResponsiveTable"
import paginationFactory from 'react-bootstrap-table2-paginator';
import "./home.scss";

const CustomInput = (props) => {
    const {placeholder, field, method, name} = props;

    const searchNews = (params) => {
        axios
            .get(SEARCH_API, {params})
            .then(({data}) => {
                data.articles.map((item, index) => (item["id"] = index));
                method({
                    country: field.country,
                    apiKey: field.apiKey,
                    filterString: field.filterString,
                    searchingState: field.searchingState,
                    theNews: data.articles
                });
            })
    };

    const searchNewsHandler = (searchByString) => {
        searchNews(searchByString ? {q : searchByString, country : field.country, apiKey : field.apiKey} : {country : field.country, apiKey : field.apiKey})
    };

    return(
        <InputGroup className="mt-0">
            <FormControl
                placeholder={placeholder}
                value={field[name]}
                disabled={name === "filterString" && !field.searchingState}
                className={name === "filterString" && !field.searchingState ? "disabled-input" : ""}
                onKeyPress={event => {
                    if (event.key === "Enter" && field.filterString.length>1) {
                        searchNewsHandler(field.filterString)
                    }
                }}
                onChange={(e) => {
                    method({
                        country: name==="country" ? e.target.value : field.country,
                        apiKey: name==="apiKey" ? e.target.value : field.apiKey,
                        filterString: name==="filterString" ? e.target.value : '',
                        searchingState: field.searchingState,
                        theNews: field.theNews
                    });
                }}
            />
            {field[name].length>0 && <InputGroup.Append>
                <Button
                    variant="light"
                    className="clean-form-btn"
                    onClick={(e) => {
                        e.currentTarget.parentElement.children[0].value = '';
                        method({
                            country: name === "country" ? '' : field.country,
                            apiKey: name === "apiKey" ? '' : field.apiKey,
                            filterString: '',
                            searchingState: name === "filterString" ? field.searchingState: false,
                            theNews: []
                        });
                    }}>
                    <FontAwesomeIcon style={{color: '#000'}} icon={faTimes} />
                </Button>
            </InputGroup.Append>}
            {field.filterString.length>0 && name === "filterString" && <InputGroup.Append>
                <Button
                    variant="light"
                    disabled={!field[name]}
                    className={!field[name] ? 'disabled-input' : ''}
                    onClick={() => {
                        searchNewsHandler(field.filterString)
                    }}
                >
                    <FontAwesomeIcon style={{color: '#000'}} icon={faSearch} />
                </Button>
            </InputGroup.Append>}
        </InputGroup>
    )
};

const Home = () => {
    const [config, setConfig] = useState({country: "", apiKey: "", filterString: "", searchingState: false, theNews: []});
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = 768;

    const columns = [
        {
            dataField: 'title',
            text: 'Title'
        },
        {
            dataField: 'author',
            text: 'Author',
            headerStyle: {width: '200px'}
        },
        {
            dataField: 'publishedAt',
            text: 'Publication date',
            headerStyle: {width: '120px'},
            formatter: (cell, contact) => {
                return (
                    <div className="d-flex justify-content-between">
                        {transformDate(contact.publishedAt)}
                    </div>
                )
            }
        },
        {
            dataField: 'view',
            text: 'Quick preview',
            headerStyle: {width: '100px'},
            formatter: () => {
                return (
                    <div className="d-flex justify-content-between">
                        <a href="#" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon style={{color: '#000'}} icon={faEye} />
                        </a>
                    </div>
                )
            }
        },
        {
            dataField: 'url',
            text: 'Url',
            headerStyle: {width: '50px'},
            formatter: (cell, contact) => {
                return (
                    <div className="d-flex justify-content-between">
                        <a href={contact.url} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon style={{color: '#000'}} icon={faLink} />
                        </a>
                    </div>
                )
            }
        }
    ];

    const paginationOptions = {
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true
    };

    const transformDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options)
    };

    const getNews = (params) => {
        setConfig({
            country: config.country,
            apiKey: config.apiKey,
            filterString: "",
            searchingState: config.searchingState,
            theNews: []
        });
        axios
            .get(FETCH_API, {params})
            .then(({data}) => {
                data.articles.map((item, index) => (item["id"] = index));
                setConfig({
                    country: config.country,
                    apiKey: config.apiKey,
                    filterString: '',
                    searchingState: true,
                    theNews: data.articles
                });
            })
    };

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);


    return(
        <div className="home-page-container">
            <section className="content">
                <Container>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col><h3>Headlines today</h3></Col>
                            </Row>
                            <Row>
                                <Col><h6>In order to get the news, please fill in the below inputs</h6></Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <CustomInput
                                        placeholder="Country..."
                                        field={config}
                                        method={setConfig}
                                        name={"country"}
                                    />
                                </Col>
                                <Col md={6}>
                                    <CustomInput
                                        placeholder="ApiKey..."
                                        field={config}
                                        method={setConfig}
                                        name={"apiKey"}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        block
                                        variant="secondary"
                                        disabled={!config.country || !config.apiKey}
                                        className={!config.country || !config.apiKey ? 'custom-button disabled-input' : 'custom-button'}
                                        onClick={(e) => {
                                            e.currentTarget.parentElement.children[0].blur();
                                            getNews({country : config.country, apiKey : config.apiKey});
                                        }}
                                    >Get all headlines</Button>
                                </Col>
                            </Row>
                            {config.searchingState && <Row>
                                <Col>
                                    <CustomInput
                                        placeholder="Search for headlines..."
                                        field={config}
                                        method={setConfig}
                                        name={"filterString"}
                                    />
                                </Col>
                            </Row>}
                        </Card.Header>
                        {config.searchingState && <Card.Body>
                            { width > breakpoint ? <BootstrapTable
                                keyField="id"
                                bootstrap4
                                condensed
                                data={config.theNews}
                                columns={columns}
                                loading={true}
                                noDataIndication={<div>Sorry! We found no data.</div>}
                                pagination={paginationFactory(paginationOptions)}
                            /> : <ResponsiveTable
                                data={config.theNews}
                                columns={columns}
                                filterString={config.filterString}
                                params={{country : config.country, apiKey : config.apiKey}}
                            />}
                        </Card.Body>}
                    </Card>
                </Container>
            </section>
        </div>)
};

export default Home;
