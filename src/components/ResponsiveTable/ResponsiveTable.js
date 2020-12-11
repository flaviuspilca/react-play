import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faEye, faHeart} from "@fortawesome/free-solid-svg-icons";
import {Card, Row, Col, Button} from "react-bootstrap";
import ViewItemModal from "../../components/ViewItemModal/ViewItemModal";
import "./ResponsiveTable.scss";


const ResponsiveTable = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [index, setIndex] = useState(0);

    const getIcon = (type) => {
        if( type === "iconView" ) return faEye;
        if( type === "iconUrl" ) return faLink;
        if( type === "iconFav" ) return faHeart;
    };

    const buildIconCell = (type, url, index) => {
        return(
            <>
                {type === 'iconView' && <Button variant="link" size="sm" onClick={() => {
                    setIndex(index);
                    setShowModal(true)
                }}>
                    <FontAwesomeIcon style={{color: '#000'}} icon={getIcon(type)} />
                </Button>}
                {type === 'iconUrl' && <a href={url} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon style={{color: "#000"}} icon={getIcon(type)} />
                </a>}
                {type === 'iconFav' && <Button variant="link" size="sm" onClick={() => {

                }}>
                    <FontAwesomeIcon style={{color: '#000'}} icon={getIcon(type)} />
                </Button>}
            </>
        )
    };

    return (
        <div className="responsive-table-container">
            {props.data.length > 0 && props.data.map(item => {
                return(
                    <Card key={item.id}>
                        <Card.Body>
                            {
                                props.columns.map((col, index) => {
                                    return(
                                        <Row key={index}>
                                            <Col className="col-4"><span className="font-weight-bold">{col.text}</span></Col>
                                            <Col className="col-8">{col.dataField.startsWith("icon") ? buildIconCell(col.dataField, item[col.dataField], item.id) : item[col.dataField]}</Col>
                                        </Row>
                                    )
                                })
                            }
                        </Card.Body>
                    </Card>
                )
            })}
            {props.data.length > 0 && (<div>Total: {props.data.length} news</div>)}
            {props.data.length === 0 && (
                <Card key="0">
                    <Card.Body>
                        Sorry! We found no data.
                    </Card.Body>
                </Card>
            )}

            {props.data.length > 0 && <ViewItemModal
                index={index}
                data={props.data[index]}
                show={showModal}
                onHide={() => setShowModal(false)}
            />}
        </div>
    );
};

export default ResponsiveTable;
