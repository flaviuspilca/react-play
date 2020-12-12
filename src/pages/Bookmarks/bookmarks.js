import React from "react";
import {Card, Container} from "react-bootstrap";

const Bookmarks = (props) => {

    let rows = [];
    for(let i=0; i<=props.favs.length/3; i++){
        rows.push(<div key={i}></div>)
    }

    return(<div className="bookmarks-page-container">
        <section className="content">
            <Container>
                <Card>
                    <Card.Header>
                        <h3>Below are your bookmarks</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className="container">
                        {
                            rows.map((item, index)=>(
                                <div key={index} className="row text-center">{
                                    props.favs.filter((fav, favIndex)=>(favIndex>=index*3 && favIndex<index*3+3)).map((item, itemIndex)=>(
                                        <div key={itemIndex} className="col-lg-4 mb-5 mb-lg-0 card bg-secondary text-white">{item.title}</div>
                                    ))
                                }</div>
                            ))
                        }
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    </div>)
};

export default Bookmarks;