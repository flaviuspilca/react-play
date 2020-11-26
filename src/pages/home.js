import React, {useEffect, useState} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLink, faTimes, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FETCH_API, SEARCH_API} from "../core/api";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import paginationFactory from 'react-bootstrap-table2-paginator';
import "./home.scss";



const Home = () => {

    const [theNews, setTheNews] = useState([]);
    const [filterName, setFilterName] = useState("");

    const columns = [
      {
        dataField: 'author',
        text: 'Author'
      },
      {
        dataField: 'title',
        text: 'Title'
      },
      {
        dataField: 'publishedAt',
        text: 'Date of publication',
        headerStyle: {width: '200px'},
        formatter: (cell, contact) => {
          return (
              <div className="d-flex justify-content-between">
                {transformDate(contact.publishedAt)}
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

    const params = {
        "country" : "de",
        "apiKey" : "cfc7d6168c29479ba18693c171134230"
    };


    const transformDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options)
    };

    const paginationOptions = {
        page: 1,
        sizePerPage: 10,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        alwaysShowAllBtns: false,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true
    };

    const getNews = (params) => {
        axios
            .get(FETCH_API, {params})
            .then(({data}) => {
              setTheNews(data.articles);
            })
    };

    useEffect(() => {
        getNews(params)
    }, []);


    return(<div className="home-page-container">




        <section className="content">
            <Container>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                                <InputGroup className="mt-0">
                                    <FormControl
                                        placeholder="search ..."
                                        value={filterName}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                //searchContactsByFilter(filterName, filterActive, filterOrganisational)
                                            }
                                        }}
                                        onChange={(e) => {
                                            setFilterName(e.target.value)
                                        }}
                                    />
                                    {filterName && <Button
                                        variant="light"
                                        className="clean-form-btn"
                                        onClick={(e) => {
                                            e.currentTarget.parentElement.children[0].value = '';
                                            setFilterName('');

                                            //searchContactsByFilter(null, filterActive, filterOrganisational)
                                        }}>
                                        <FontAwesomeIcon style={{color: '#000'}} icon={faTimes} />
                                    </Button>}
                                    <InputGroup.Append>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => {
                                                //searchContactsByFilter(filterName, filterActive, filterOrganisational)
                                            }}
                                        >
                                            <FontAwesomeIcon style={{color: '#000'}} icon={faSearch} />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <BootstrapTable
                            keyField="publishedAt"
                            bootstrap4
                            condensed
                            data={theNews}
                            columns={columns}
                            pagination={paginationFactory(paginationOptions)}
                        />
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                </Card>
            </Container>
        </section>
    </div>)
};

export default Home;
