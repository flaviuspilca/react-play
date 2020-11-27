import React, {useState} from "react";
import FormControl from "../../pages/home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import "./CustomInput.scss";



const CustomInput = (props) => {

    const [theString, setTheString] = useState("");


    return(
        <InputGroup className="mt-0">
            <FormControl
                placeholder="Search ..."
                value={theString}
                onKeyPress={event => {
                    if (event.key === "Enter") {
                        //searchNewsHandler(filterString)
                    }
                }}
                onChange={(e) => {
                    setTheString(e.target.value)
                }}
            />
            {theString && <InputGroup.Append>
                <Button
                    variant="light"
                    className="clean-form-btn"
                    onClick={(e) => {
                        e.currentTarget.parentElement.children[0].value = '';
                        setTheString('');
                        //searchNewsHandler('')
                    }}>
                    <FontAwesomeIcon style={{color: '#000'}} icon={faTimes} />
                </Button>
            </InputGroup.Append>}
            <InputGroup.Append>
                <Button
                    variant="light"
                    disabled={!theString}
                    className={!theString ? 'search-disabled' : ''}
                    onClick={() => {
                        //searchNewsHandler(filterString)
                    }}
                >
                    <FontAwesomeIcon style={{color: '#000'}} icon={faSearch} />
                </Button>
            </InputGroup.Append>
        </InputGroup>
    )

}

export default CustomInput;