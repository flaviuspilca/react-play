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


const Mobility = () => {
  const [message, setMessage] = useState("");
  const [credentials, setCredentials] = useState({user: "", pass: ""});
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

  return (
    <div className="mobility-page-container">
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
                  <InputGroup.Prepend>
                    <InputGroup.Text id="mobilityLoginUser">Username</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="username" aria-describedby="mobilityLoginUser" />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <InputGroup size="sm" className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="mobilityLoginPass">Password</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl aria-label="password" aria-describedby="mobilityLoginPass" />
                </InputGroup>
              </Form.Group>

              <Button
                  block
                  variant="primary"
                  disabled={credentials.user.length === 0 || credentials.pass.length === 0}
                  className={credentials.user.length === 0 || credentials.pass.length === 0 ? 'custom-button disabled-input' : 'custom-button'}
                  type="submit"
              >Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Mobility;
