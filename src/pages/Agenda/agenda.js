import React from "react";
import {Card, Container} from "react-bootstrap";

const Agenda = (props) => {
    console.log(props)
    return(<div className="agenda-page-container">
        <section className="content">
            <Container>
                <Card>
                    <Card.Body>
                        {props.favs.map((item, index)=>(
                            <div key={index}>{item.author}</div>
                        ))}
                    </Card.Body>
                </Card>
            </Container>
        </section>
    </div>)
};

export default Agenda;