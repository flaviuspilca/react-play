import React, {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {FETCH_API, SEARCH_API} from "../core/api";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import "./home.scss";



const Home = () => {

    const [theNews, setThenews] = useState([]);

    const columns = [
      {
        dataField: 'author',
        text: 'Author'
      },
      {
        dataField: 'title',
        text: 'Title'
      },
      {
        dataField: 'publishedAt',
        text: 'Date of publication',
        headerStyle: {width: '200px'},
        formatter: (cell, contact) => {
          return (
              <div className="d-flex justify-content-between">
                {transformDate(contact.publishedAt)}
              </div>
          )
        }
      },
      {
        dataField: 'url',
        text: 'Url',
        headerStyle: {width: '50px'},
        formatter: (cell, contact) => {
          return (
              <div className="d-flex justify-content-between">
                <a href={contact.url} target="_blank">
                  <FontAwesomeIcon style={{color: '#000'}} icon={faLink} />
                </a>
              </div>
          )
        }
      }
    ];

    const params = {
        "country" : "us",
        "apiKey" : "cfc7d6168c29479ba18693c171134230"
    };


    const transformDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options)
    };

    const pagination = paginationFactory({
        sizePerPage : 10,
        sizePerPageList : [ {
            text: '', value: 10
        } ]
    });

    const getNews = (params) => {
        axios
            .get(FETCH_API, {params})
            .then(({data}) => {
              setThenews(data.articles);
            })
    };

    useEffect(() => {
        getNews(params)
    }, []);


    return(<div className="home-page-container">
        <BootstrapTable
            keyField="content"
            bootstrap4
            remote
            condensed
            data={theNews}
            columns={columns}
            pagination={pagination}
        />
    </div>)
};

export default Home;
