import React, { useState } from "react";
import axios from "axios";
import {MOBILITY_LOGIN} from "../../core/api";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import "./mobility.scss";
import Error from "../../components/Error/Error";

const Mobility = () => {
  const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const [hasError, setHasError] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/messages/public-message`);

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      //const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl}/api/messages/protected-message`,
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };


  const login = (userCredentials) => {
    return axios
        .post(MOBILITY_LOGIN, userCredentials)
        .then((response) => {
          console.log(response)
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return response.data;
        })
        .catch(error => {
          setHasError(true);
        });
  };

  return (
    <div className="mobility-page-container">
      {!hasError && <section className="content">
        <Container>
        <Card>
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
                        setCredentials({email: e.currentTarget.value, password: credentials.password});
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
                        setCredentials({email: credentials.email, password: e.currentTarget.value});
                      }}
                  />
                </InputGroup>
              </Form.Group>

              <Button
                  block
                  variant="primary"
                  disabled={credentials.email.length === 0 || credentials.password.length === 0}
                  className={credentials.email.length === 0 || credentials.password.length === 0 ? 'custom-button disabled-input' : 'custom-button'}
                  //type="submit"
                  onClick={()=>{
                    login(credentials);
                  }}
              >Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      </section>}
      {hasError && <Error origin="mobility"/>}
    </div>
  );
};

export default Mobility;
