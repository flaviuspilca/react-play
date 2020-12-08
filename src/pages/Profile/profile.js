import React from "react";
import {Container, Card, Row, Col} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";


const Profile = () => {
  const {user} = useAuth0();

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
                                Username: <h3>{user.name}</h3>
                                Email: <h5>{user.email}</h5>
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
