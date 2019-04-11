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
  ButtonGroup,
  Popover, PopoverBody, PopoverHeader 
} from "shards-react";
import Select from "react-select";
import { Badge } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import "./widgets.css";
import CMessageBox from "../Components/clientMessageBox";
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

class CMessagePage extends Component {
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
        date: Date.now(),
        chat: [],
        __v: 0
      }
    ];

    this.messageInfoArray = messageInfoArray;
    // this.viewMessages = this.viewMessages.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      messageInfoArray: this.messageInfoArray,
      token: this.props.token,
      filterEndpoint: "https://courier50003.herokuapp.com/portal/viewdate",
      open: false,
    };
    this.handleBug = this.handleBug.bind(this);
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  componentDidMount() {
    //Do stuff here
    this.setState({
      filterEndpoint: "https://courier50003.herokuapp.com/portal/viewstatus"});

    var unirest = require("unirest");

    var req = unirest(
      "GET",
      this.state.filterEndpoint
    );

    req.query({
      token:this.state.token
      //"5c94643a471b590004e5fd00"
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
  }
  handleBug(event) {
    console.log("Props from clientMes to messagePage: ", this.props)
  }

  handleFilter (event){
    console.log("Event [messagePage]: ", event.target.id);
    //Do stuff here
    this.setState({
      filterEndpoint: "https://courier50003.herokuapp.com/portal/" + event.target.id});

    var unirest = require("unirest");

    var req = unirest(
      "GET",
      this.state.filterEndpoint
    );

    req.query({
      token: this.state.token
      //"5c94643a471b590004e5fd00"
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
        <Container className="MessagePage">
        <Button id="popover-1" onClick={this.toggle} className="ChatBot">
          ChatBot
        </Button>
        <Popover
          placement="bottom"
          open={this.state.open}
          toggle={this.toggle}
          target="#popover-1"
        >
          <PopoverBody>
            <iframe
              allow="microphone;"
              width="250"
              height="330"
              src="https://console.dialogflow.com/api-client/demo/embedded/8a3f1d1d-1ff2-4a83-9cfe-d7d848c6e3d1"
            />
          </PopoverBody>
        </Popover>
          {/* <Button onClick={this.handleBug}>Debugger</Button> */}
          <Row>
            {/* <FormGroup>
              <label>
                Choose your filter
              </label>
              <Select
                multiple={false}
                options={filterOptions}
                onChange={this.handleFilter}
              />
            </FormGroup> */}
            <Col>
              <ButtonGroup vertical className="SideBar">
                <Button squared theme="light" id= "viewstatus" onClick={this.handleFilter}>Sort by status</Button>
                <Button squared theme="light" id= "viewdate" onClick={this.handleFilter}>Sort by date</Button>
                <Button squared theme="light" id= "viewwho" onClick={this.handleFilter}>Sort by who</Button>
                <Button squared theme="light" id= "viewcategory" onClick={this.handleFilter}>Sort by category</Button>
                <Button squared theme="light" id= "viewpriority" onClick={this.handleFilter}>Sort by priority</Button>
              </ButtonGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItemHeading>
                  <Container>
                    <Row>
                      <Col>Subject</Col>
                      <Col>Requester</Col>
                      <Col>Requested</Col>
                      <Col>Type</Col>
                      <Col>Status</Col>
                    </Row>
                  </Container>
                </ListGroupItemHeading>
                {this.state.messageInfoArray.map(messageInfoArray => {
                  return <CMessageBox messageInfo={messageInfoArray} token={this.state.token}/>;
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CMessagePage;
