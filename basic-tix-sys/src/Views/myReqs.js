import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  CardSubtitle,
  Button,
  FormGroup,
  ListGroup,
  ListGroupItemHeading,
} from "shards-react";
import Select from "react-select";
import { Badge } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import "./widgets.css";
import MessageBox from "../Components/messageBox";
import ListIcon from "semantic-ui-react";
import ListItem from "semantic-ui-react";
// library.add(faIgloo);

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

const filterOptions = [
  {label: "Sort by status", value: "viewstatus" },
  {label: "Sort by date", value: "viewdate" },
  {label: "Sort by who", value: "viewwho" },
  {label: "Sort by category", value: "viewcategory" },
  {label: "Sort by priority", value: "viewpriority" },
]

class MyReqs extends Component {
  constructor(props) {
    super(props);

    var messageInfoArray = [
      {
        username: "usertest",
        priority: -1,
        status: "unaddressed",
        who: "unaddressed",
        tags: ["TAG1", "TAG2", "TAG3"],
        category: "test",
        _id: "5c8e2874f75f992a30601303",
        imageURL: "",
        email: "glenn11@gmail.com",
        contact_num: 1234,
        message: "Help witsh thiss api",
        date: "2019-03-17T10:59:00.278Z",
        chat: [],
        __v: 0
      }
    ];

    this.messageInfoArray = messageInfoArray;
    // this.viewMessages = this.viewMessages.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.state = {
      messageInfoArray: this.messageInfoArray,
      token: this.props.token,
      filterEndpoint: "https://courier50003.herokuapp.com/portal/viewdate"
    };
    this.handleBug = this.handleBug.bind(this);
  }
  handleBug(event) {
    console.log("Props from clientMes to messagePage: ", this.props)
  }
  handleFilter (event){
    console.log("Event [messagePage]: ", event);
    //Do stuff here
    this.setState({
      filterEndpoint: "https://courier50003.herokuapp.com/portal/" + event.value});

    var unirest = require("unirest");

    var req = unirest(
      "GET",
      this.state.filterEndpoint
    );

    req.query({
      token: "5c94643a471b590004e5fd00"
      // this.state.token
    });

    req.headers({
      "cache-control": "no-cache"
    });

    req.end(res => {
      console.log("res.body [messagePage]: ", res.body);
      console.log("token passed [messagePage]: ", this.state.token);
      if (res.error) throw new Error(res.error);
      this.setState({
        messageInfoArray: res.body.requests});
      });
    
  };

  render() {
    return (
      <div>
        <Container>
          {/* <Button onClick={this.handleBug}>Dubugger</Button> */}
          <Row>
            <FormGroup>
              <label>
                Chose your filter
              </label>
              <Select
                multiple={false}
                options={filterOptions}
                onChange={this.handleFilter}
              />
            </FormGroup>
          </Row>
          <Row>
            <ListGroup>
              <ListGroupItemHeading>
                <Container>
                  <Row>
                    <Col>Subject</Col>
                    <Col>Requester</Col>
                    <Col>Requested</Col>
                    <Col>Type</Col>
                    <Col>Priority</Col>
                  </Row>
                </Container>
              </ListGroupItemHeading>
              {this.state.messageInfoArray.map(messageInfoArray => {
                return <MessageBox messageInfo={messageInfoArray} />;
              })}
            </ListGroup>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MyReqs;
