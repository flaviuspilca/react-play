import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useAuth0} from "@auth0/auth0-react";


const Profile = () => {
  const { user } = useAuth0();

  return (
    <div className="profile-page-container">
        <section className="content">
            <Container>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                            />
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h2>{user.name}</h2>
                                <p className="lead text-muted">{user.email}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {JSON.stringify(user, null, 2)}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    </div>
  );
};

export default Profile;
