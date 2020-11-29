import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faEye} from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ResponsiveTable.scss";

const ResponsiveTable = (props) => {

    const buildIconCell = (type, url) => {
        return(
            <a href={url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon style={{color: "#000"}} icon={type === "view" ? faEye : faLink} />
            </a>
        )
    };

    return (
        <div className="responsive-table-container">
            {
                props.data.map(item => {
                    return(
                        <Card key={item.id}>
                            <Card.Body>
                                {
                                    props.columns.map((col, index) => {
                                        return(
                                            <Row key={index}>
                                                <Col className="col-4"><span className="font-weight-bold">{col.text}</span></Col>
                                                <Col className="col-8">{col.dataField === 'view' || col.dataField === 'url' ? buildIconCell(col.dataField, item[col.dataField]) : item[col.dataField]}</Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    );
};

export default ResponsiveTable;
