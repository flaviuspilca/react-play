import React, {useEffect, useState} from "react";
import axios from "axios";
import {MOBILITY_LOGIN, MOBILITY_SEARCH, MOBILITY_SEARCH_PLATE, MOBILITY_UPDATE} from "../../core/api";
import {Container, Card, Row, Col, Form, InputGroup, FormControl, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import ResponsiveTable from "../../components/ResponsiveTable/ResponsiveTable";
import Error from "../../components/Error/Error";
import "./mobility.scss";


const Mobility = () => {
    const [auth, setAuth] = useState({email: "", password: "", token: ""});
    const [hasError, setHasError] = useState(false);
    const [config, setConfig] = useState({theData: [], filterString: "", searchingState: false});
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 768;
    let imageUrl = "";
    let plateId = "";


    const columns = [
        {
            dataField: 'license_plate',
            text: 'Licence Plate'
        },
        {
            dataField: 'merk',
            text: 'Brand'
        },
        {
            dataField: 'handelsbenaming',
            text: 'Commercial Name'
        },
        {
            dataField: 'voertuigsoort',
            text: 'Type'
        },
        {
            dataField: 'eerste_kleur',
            text: 'Color'
        },
        {
            dataField: 'aantal_zitplaatsen',
            text: 'Number of seats'
        },
        {
            dataField: 'catalogusprijs',
            text: 'Catalog price'
        },
        {
            dataField: 'image_url',
            text: 'Image',
            formatter: (cell, contact) => {
                return (
                    <div className="d-flex justify-content-between">
                        <a href={contact.image_url} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon style={{color: '#000'}} icon={faLink} />
                        </a>
                    </div>
                )
            }
        }
    ];

    const authHeader = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.auth_token) {
            setAuth({email: auth.email, password: auth.password, token: user.auth_token});
            return { Authorization: 'Bearer ' + user.auth_token };
        } else {
            return {};
        }
    };

    const login = (userCredentials) => {
        return axios
            .post(MOBILITY_LOGIN, userCredentials)
            .then((response) => {
              if (response.data.auth_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
              }
              authHeader();
              return response.data;
            })
            .catch(error => {
              setHasError(true);
            });
    };

    const getUpdatedVehicle = (imageUrl, plate) => {
        const params = {
            image_url: imageUrl
        };

        axios
            .get(MOBILITY_SEARCH_PLATE+plate, {headers: authHeader()})
            .then(({data}) => {
                if(data){
                    plateId = data.id;
                    axios.put(MOBILITY_UPDATE+plateId, {vehicle: params},{headers: authHeader()})
                        .then(() => {
                            axios
                                .get(MOBILITY_SEARCH_PLATE+plate, {headers: authHeader()})
                                .then(({data}) => {
                                    if(data){
                                        data["id"] = 0;
                                        setConfig({
                                            theData: [data],
                                            filterString: config.filterString,
                                            searchingState: true
                                        });
                                    }else{
                                        setConfig({
                                            theData: [],
                                            filterString: config.filterString,
                                            searchingState: config.searchingState
                                        });
                                    }
                                });
                        });
                }else{
                    setConfig({
                        theData: [],
                        filterString: config.filterString,
                        searchingState: config.searchingState
                    });
                }
            });
    };

    const callSearchEngine = (q) => {
        const params={
            cx: "e36d1428dc503ed35",
            key :"AIzaSyAnGrIDQeZF2AAxuuJejhonDo8_-cq_qks",
            q: q
        };
        axios
            .get("https://www.googleapis.com/customsearch/v1", {params})
            .then(({data}) => {
                if(data) {
                    for( let item in data.items ){
                        for( let key in Object.keys(data.items[item]) ){
                            if( Object.keys(data.items[item])[key] === "pagemap"){
                                if(data.items[item].pagemap.cse_image){
                                    if(imageUrl.length === 0){
                                        imageUrl = data.items[item].pagemap.cse_image[0].src;
                                    }
                                }
                            }
                        }
                    }
                    getUpdatedVehicle(imageUrl, config.filterString);
                }
            })
    };

    const searchVehicles = (params) => {
        setConfig({
            theData: [],
            filterString: params.kenteken || '',
            searchingState: true
        });
        axios
            .get(MOBILITY_SEARCH, {params})
            .then(({data}) => {
                if(data) {
                    if( data.length > 0 ) {
                        const q = data[0].merk + "+" + data[0].handelsbenaming;
                        callSearchEngine(q);
                    }
                }
            })
    };

    const searchVehiclesHandler = (filterString) => {
        searchVehicles({kenteken: filterString})
    };

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

  return (
    <div className="mobility-page-container">
      {!hasError && <section className="content">
        <Container>
          {auth.token.length === 0 && <Card>
          <Card.Header>
            <Row>
              <Col><h3>Please login first!</h3></Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="mobilityLogin">
                <InputGroup size="sm" className="mb-3">
                  <FormControl
                      aria-label="email"
                      placeholder="Email"
                      onChange={(e)=>{
                        if( e.currentTarget.value.charAt(0) === ' ' ){
                          e.target.value = e.target.value.trim();
                        }
                        setAuth({email: e.currentTarget.value, password: auth.password, token: auth.token});
                      }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <InputGroup size="sm" className="mb-3">
                  <FormControl
                      aria-label="password"
                      placeholder="Password"
                      onChange={(e)=>{
                        if( e.currentTarget.value.charAt(0) === ' ' ){
                          e.target.value = e.target.value.trim();
                        }
                        setAuth({email: auth.email, password: e.currentTarget.value, token: auth.token});
                      }}
                  />
                </InputGroup>
              </Form.Group>

              <Button
                  block
                  variant="primary"
                  disabled={auth.email.length === 0 || auth.password.length === 0}
                  className={auth.email.length === 0 || auth.password.length === 0 ? 'custom-button disabled-input' : 'custom-button'}
                  onClick={()=>{
                    login(auth);
                  }}
              >Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>}
          {auth.token.length > 0 && <Card>
            <Card.Header>
                <h5>Search feature: please provide the licenseplate in order to perform the search.</h5>
                <p>For example, you can search by: XXAAXX, RF661H, NL706S, WNVP76</p>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <InputGroup className="mt-0">
                            <FormControl
                                placeholder="Search by licenseplate..."
                                value={config.filterString}
                                onKeyPress={event => {
                                    if (event.key === "Enter" && config.filterString.length>1) {
                                        searchVehiclesHandler(config.filterString)
                                    }
                                }}
                                onChange={(e) => {
                                    if( e.currentTarget.value.charAt(0) === ' ' ){
                                        e.target.value = e.target.value.trim();
                                    }
                                    setConfig({
                                        theData: config.theData,
                                        filterString: e.target.value,
                                        searchingState: config.searchingState
                                    });
                                }}
                            />
                            {config.filterString.length>0 && <InputGroup.Append>
                                <Button
                                    variant="light"
                                    className="clean-form-btn"
                                    onClick={(e) => {
                                        e.currentTarget.parentElement.children[0].value = '';
                                        setConfig({
                                            theData: [],
                                            filterString: '',
                                            searchingState: config.searchingState
                                        });
                                    }}>
                                    <FontAwesomeIcon style={{color: '#000'}} icon={faTimes} />
                                </Button>
                            </InputGroup.Append>}
                            {config.filterString.length>0 && <InputGroup.Append>
                                <Button
                                    variant="light"
                                    onClick={() => {
                                        searchVehiclesHandler(config.filterString)
                                    }}
                                >
                                    <FontAwesomeIcon style={{color: '#000'}} icon={faSearch} />
                                </Button>
                            </InputGroup.Append>}
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    {config.searchingState && <Col>
                        {width > breakpoint ? <BootstrapTable
                            keyField="id"
                            bootstrap4
                            condensed
                            data={config.theData}
                            columns={columns}
                            loading={true}
                            noDataIndication={<div>Sorry! We found no data.</div>}
                        />:<ResponsiveTable
                            data={config.theData}
                            columns={columns}
                            filterString={config.filterString}
                        />}
                    </Col>}
                </Row>
              <Row>
                <Button
                    block
                    variant="primary"
                    className="custom-button"
                    onClick={()=>{
                      setAuth({email: "", password: "", token: auth.token});
                      localStorage.removeItem("user");
                      setAuth({email: auth.email, password: auth.password, token: ""});
                    }}
                >Log out
                </Button>
              </Row>
            </Card.Body>
          </Card>}
        </Container>
      </section>}
      {hasError && <Error origin="mobility"/>}
    </div>
  );
};

export default Mobility;
