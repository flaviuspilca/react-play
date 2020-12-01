import React from "react";
import axios from "axios";
import {SEARCH_API} from "../../core/api";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

import "./CustomInput.scss";



const CustomInput = (props) => {
    const {placeholder, field, method, name} = props;

    const searchNews = (params) => {
        axios
            .get(SEARCH_API, {params})
            .then(({data}) => {
                data.articles.map((item, index) => (item["id"] = index));
                method({
                    country: field.country,
                    apiKey: field.apiKey,
                    filterString: params.q || '',
                    searchingState: field.searchingState,
                    theNews: data.articles
                });
            })
    };

    const searchNewsHandler = (searchByString) => {
        searchNews(searchByString ? {q : searchByString, country : field.country, apiKey : field.apiKey} : {country : field.country, apiKey : field.apiKey})
    };

    return(
        <div className="custom-input-container">
            <InputGroup className="mt-0">
                <FormControl
                    placeholder={placeholder}
                    value={field[name]}
                    disabled={name === "filterString" && !field.searchingState}
                    className={name === "filterString" && !field.searchingState ? "disabled-input" : ""}
                    onKeyPress={event => {
                        if (event.key === "Enter" && field.filterString.length>1) {
                            searchNewsHandler(field.filterString)
                        }
                    }}
                    onChange={(e) => {
                        if( e.currentTarget.value.charAt(0) === ' ' ){
                            e.target.value = e.target.value.trim();
                        }
                        method({
                            country: name==="country" ? e.target.value : field.country,
                            apiKey: name==="apiKey" ? e.target.value : field.apiKey,
                            filterString: name==="filterString" ? e.target.value : '',
                            searchingState: field.searchingState,
                            theNews: field.theNews
                        });
                    }}
                />
                {field[name].length>0 && <InputGroup.Append>
                    <Button
                        variant="light"
                        className="clean-form-btn"
                        onClick={(e) => {
                            e.currentTarget.parentElement.children[0].value = '';
                            method({
                                country: name === "country" ? '' : field.country,
                                apiKey: name === "apiKey" ? '' : field.apiKey,
                                filterString: '',
                                searchingState: name === "filterString" ? field.searchingState: false,
                                theNews: []
                            });
                            if( name === "filterString" ) searchNewsHandler();
                        }}>
                        <FontAwesomeIcon style={{color: '#000'}} icon={faTimes} />
                    </Button>
                </InputGroup.Append>}
                {field.filterString.length>0 && name === "filterString" && <InputGroup.Append>
                    <Button
                        variant="light"
                        disabled={!field[name]}
                        className={!field[name] ? 'disabled-input' : ''}
                        onClick={() => {
                            searchNewsHandler(field.filterString)
                        }}
                    >
                        <FontAwesomeIcon style={{color: '#000'}} icon={faSearch} />
                    </Button>
                </InputGroup.Append>}
            </InputGroup>
        </div>
    )
};

export default CustomInput;