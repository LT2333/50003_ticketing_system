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
  Popover,
  PopoverBody,
  PopoverHeader
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
  { label: "Sort by status", value: "viewstatus" },
  { label: "Sort by date", value: "viewdate" },
  { label: "Sort by who", value: "viewwho" },
  { label: "Sort by category", value: "viewcategory" },
  { label: "Sort by priority", value: "viewpriority" }
];

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
      //All
      countunassignedAll: 0,
      countuncompleteAll: 0,
      countcompleteAll: 0,
      countallAll: 0
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleBug = this.handleBug.bind(this);
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  handleFilter(event) {
    let currentComponent = this;
    var unirest = require("unirest");
    console.log(event);

    var req = unirest(
      "POST",
      "https://courier50003.herokuapp.com/portal/" + event.value
    );

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      token: localStorage.getItem("token"),
      meta: localStorage.getItem("cat")
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({
        messageInfoArray: res.body.requests
      });
      console.log(res.body);
    });
  }
  componentDidMount() {
    console.log("localStorage", localStorage.getItem("token"));
    //Do stuff here
    let currentComponent = this;

    var unirest = require("unirest");
    var req1 = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/notifications/"
    );

    req1.query({
      token: localStorage.getItem("token")
      //token: "5c94643a471b590004e5fd00"
    });

    req1.headers({
      "cache-control": "no-cache"
    });

    req1.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
      // currentComponent.setState({ notifications: res.body });
      localStorage.setItem("notifications", JSON.stringify(res.body));
    });

    var req = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/viewall"
    );

    req.query({
      token: localStorage.getItem("token")
    });

    req.headers({
      "cache-control": "no-cache"
    });

    req.end(res => {
      console.log("res.body [messagePage]: ", res.body);
      console.log("token passed [messagePage]: ", this.state.token);
      if (res.error) throw new Error(res.error);
      this.setState({
        messageInfoArray: res.body.requests
      });
    });
    ///////////////////////////////////////
    //All unassigned
    var reqc1 = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/count/unassigned"
    );

    reqc1.query({
      token: localStorage.getItem("token")
    });

    reqc1.headers({
      "cache-control": "no-cache"
    });

    reqc1.end(function(res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({ countunassignedAll: res.body.numRequests });
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All uncomplete
    var reqc2 = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/count/uncomplete"
    );

    reqc2.query({
      token: localStorage.getItem("token")
    });

    reqc2.headers({
      "cache-control": "no-cache"
    });

    reqc2.end(function(res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({ countuncompleteAll: res.body.numRequests });
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All complete
    var reqc10 = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/count/complete"
    );

    reqc10.query({
      token: localStorage.getItem("token")
    });

    reqc10.headers({
      "cache-control": "no-cache"
    });

    reqc10.end(function(res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({ countcompleteAll: res.body.numRequests });
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All
    var reqc7 = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/count/all"
    );

    reqc7.query({
      token: localStorage.getItem("token")
    });

    reqc7.headers({
      "cache-control": "no-cache"
    });

    reqc7.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
      console.log(res.body.numRequests.toString());
      currentComponent.setState({
        countallAll: res.body.numRequests.toString()
      });
    });
  }
  handleBug(event) {
    console.log("Props from clientMes to messagePage: ", this.props);
  }

  handleFilter(event) {
    let currentComponent = this;
    var unirest = require("unirest");
    console.log(event);

    var req = unirest(
      "POST",
      "https://courier50003.herokuapp.com/portal/" + event.value
    );

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      token: localStorage.getItem("token"),
      meta: localStorage.getItem("cat")
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({
        messageInfoArray: res.body.requests
      });
      console.log(res.body);
    });
  }

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
                width="350"
                height="430"
                src="https://console.dialogflow.com/api-client/demo/embedded/8a3f1d1d-1ff2-4a83-9cfe-d7d848c6e3d1"
              />
            </PopoverBody>
          </Popover>
          {/* <Button onClick={this.handleBug}>Debugger</Button> */}
          <Row>
            <Row>
              <FormGroup>
                <label>Choose your filter</label>
                <Select
                  id="SelectFilter"
                  multiple={false}
                  options={filterOptions}
                  onChange={this.handleFilter}
                />
              </FormGroup>
            </Row>
            <Row>
              <Col>
                <ButtonGroup vertical className="SideBar">
                  {/* All tickets */}
                  <Button
                    className="SideBar"
                    theme="light"
                    id="viewallunassigned"
                    onClick={this.handleCat}
                  >
                    All unassigned tickets&nbsp;&nbsp;
                    <Badge pill theme="primary">
                      {this.state.countunassignedAll}
                    </Badge>
                  </Button>
                  <Button
                    className="SideBar"
                    theme="light"
                    id="viewalluncomplete"
                    onClick={this.handleCat}
                  >
                    All uncomplete tickets&nbsp;&nbsp;
                    <Badge pill theme="primary">
                      {this.state.countuncompleteAll}
                    </Badge>
                  </Button>
                  <Button
                    className="SideBar"
                    theme="light"
                    id="viewallcomplete"
                    onClick={this.handleCat}
                  >
                    All completed tickets&nbsp;&nbsp;
                    <Badge pill theme="primary">
                      {this.state.countcompleteAll}
                    </Badge>
                  </Button>
                  <Button
                    className="SideBar"
                    theme="light"
                    id="viewall"
                    onClick={this.handleCat}
                  >
                    All tickets&nbsp;&nbsp;
                    <Badge pill theme="primary">
                      {this.state.countallAll}
                    </Badge>
                  </Button>
                </ButtonGroup>
              </Col>
              <Col>
                <ListGroup>
                  <ListGroupItemHeading>
                    <Container>
                      <Row className="MessageBox">
                        <Col>Subject</Col>
                        <Col>Requester</Col>
                        <Col>Requested</Col>
                        <Col>Type</Col>
                        <Col>Status</Col>
                      </Row>
                    </Container>
                  </ListGroupItemHeading>
                  {this.state.messageInfoArray.map(messageInfoArray => {
                    return (
                      <CMessageBox
                        messageInfo={messageInfoArray}
                        token={this.state.token}
                      />
                    );
                  })}
                </ListGroup>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CMessagePage;
