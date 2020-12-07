import React, {useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import {FETCH_API} from "../../core/api";
import {Container, Card, Row, Col, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faEye} from "@fortawesome/free-solid-svg-icons";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import Error from "../../components/Error/Error";
import CustomInput from "../../components/CustomInput/CustomInput";
import ViewItemModal from "../../components/ViewItemModal/ViewItemModal";
import "./home.scss";



const Home = () => {
    const [config, setConfig] = useState({country: "", apiKey: "", filterString: "", searchingState: false, theNews: []});
    const [hasError, setHasError] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState(0);
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
            formatter: (cell, contact) => {
                return (
                    <div className="d-flex justify-content-between">
                        <Button variant="link" size="sm" onClick={() => {
                            setIndex(contact.id);
                            setShowModal(true)
                        }}>
                            <FontAwesomeIcon style={{color: '#000'}} icon={faEye} />
                        </Button>
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
        hidePageListOnlyOnePage: true,
        showTotal: true
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
            .catch(error => {
                setHasError(true);
            })
    };

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);


    return(
        <div className="home-page-container">
            {!hasError && <section className="content">
                <Container>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col><h3>Headlines today</h3></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h6>In order to get the news, please fill in the below inputs</h6>
                                    <p>You can use the below values:</p>
                                    <p>Country: de</p>
                                    <p>ApiKey: cfc7d6168c29479ba18693c171134230</p>
                                </Col>
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
                                        variant="primary"
                                        disabled={!config.country || !config.apiKey}
                                        className={!config.country || !config.apiKey ? 'custom-button disabled-input' : 'custom-button'}
                                        onClick={(e) => {
                                            try {
                                                if( !config.country || !config.apiKey ){
                                                    throw new Error("It seems there is an internal error. Please double check if the inputs are in the right format.");
                                                }
                                                e.currentTarget.parentElement.children[0].blur();
                                                getNews({country : config.country, apiKey : config.apiKey});
                                            } catch {
                                                setHasError(true);
                                            }
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
                                pagination={paginationFactory(paginationOptions)}
                                noDataIndication={<div>Sorry! We found no data.</div>}
                            /> : <ResponsiveTable
                                data={config.theNews}
                                columns={columns}
                                filterString={config.filterString}
                                params={{country : config.country, apiKey : config.apiKey}}
                            />}
                        </Card.Body>}
                    </Card>
                </Container>
            </section>}
            {hasError && <Error origin="home"/>}

            {config.theNews.length > 0 && <ViewItemModal
                index={index}
                data={config.theNews[index]}
                show={showModal}
                onHide={() => setShowModal(false)}
            />}

        </div>)
};

export default Home;
