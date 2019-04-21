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
} from "shards-react";
import Select from "react-select";
import { Badge } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import "./widgets.css";
import AMessageBox from "../Components/adminMessageBox";
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

class AMessagePage extends Component {
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
    this.handleCat = this.handleCat.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      messageInfoArray: this.messageInfoArray,
      token: this.props.token,
      filterEndpoint: "https://courier50003.herokuapp.com/portal/",
      //Own
      countcomplete: 0,
      countuncomplete: 0,
      //Team
      countunassignedTeam: 0,
      countuncompleteTeam: 0,
      countcompleteTeam: 0,
      countallTeam: 0,
      //All
      countunassignedAll: 0,
      countuncompleteAll: 0,
      countcompleteAll: 0,
      countallAll: "",
    };
    this.handleBug = this.handleBug.bind(this);
  }
  componentDidMount() {
    //Do stuff here
    let currentComponent = this;

    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/viewall"
    );

    req.query({
      token: localStorage.getItem("token")
      // token:this.state.token
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
    ///////////////////////////////////////
    //All unassigned
    var reqc1 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/unassigned");

    reqc1.query({
      "token": localStorage.getItem("token")
    });

    reqc1.headers({
      "cache-control": "no-cache"
    });


    reqc1.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countunassignedAll:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All uncomplete
    var reqc2 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/uncomplete");

    reqc2.query({
      "token": localStorage.getItem("token")
    });

    reqc2.headers({
      "cache-control": "no-cache"
    });


    reqc2.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countuncompleteAll:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All complete
    var reqc10 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/complete");

    reqc10.query({
      "token": localStorage.getItem("token")
    });

    reqc10.headers({
      "cache-control": "no-cache"
    });


    reqc10.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countcompleteAll:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All tickets in the team
    var reqc3 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/team/all");

    reqc3.query({
      "token": localStorage.getItem("token")
    });

    reqc3.headers({
      "cache-control": "no-cache"
    });


    reqc3.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countallTeam:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //Uncomplete tickets in the team
    var reqc4 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/team/uncomplete");

    reqc4.query({
      "token": localStorage.getItem("token")
    });

    reqc4.headers({
      "cache-control": "no-cache"
    });


    reqc4.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countuncompleteTeam:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //Complete tickets in the team
    var reqc5 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/team/complete");

    reqc5.query({
      "token": localStorage.getItem("token")
    });

    reqc5.headers({
      "cache-control": "no-cache"
    });


    reqc5.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countcompleteTeam:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //Unassigned tickets in the team
    var reqc6 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/team/unassigned");

    reqc6.query({
      "token": localStorage.getItem("token")
    });

    reqc6.headers({
      "cache-control": "no-cache"
    });


    reqc6.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countunassignedTeam:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All 
    var reqc7 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/all");

    reqc7.query({
      "token": localStorage.getItem("token")
    });

    reqc7.headers({
      "cache-control": "no-cache"
    });


    reqc7.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
      console.log(res.body.numRequests.toString());
      currentComponent.setState({countallAll: res.body.numRequests.toString()});
    });
    ////////////////////////////////////////
    //All uncomplete 
    var reqc8 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/admin/uncomplete");

    reqc8.query({
      "token": localStorage.getItem("token")
    });

    reqc8.headers({
      "cache-control": "no-cache"
    });


    reqc8.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countuncomplete:res.body.numRequests})
      console.log(res.body);
    });
    ///////////////////////////////////////
    //All compelete
    var reqc9 = unirest("GET", "https://courier50003.herokuapp.com/portal/count/admin/complete");

    reqc9.query({
      "token": localStorage.getItem("token")
    });

    reqc9.headers({
      "cache-control": "no-cache"
    });


    reqc9.end(function (res) {
      if (res.error) throw new Error(res.error);
      currentComponent.setState({countcomplete:res.body.numRequests})
      console.log(res.body);
    });

  }
  handleBug(event) {
    console.log("Props from clientMes to messagePage: ", this.props)
  }

  handleFilter (event) {
    var unirest = require("unirest");

    var req = unirest("POST", "https://courier50003.herokuapp.com/portal/viewstatus");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "token": localStorage.getItem("token"),
      "meta": "own"
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });

  }

  handleCat (event){
    console.log("Event [messagePage]: ", event.target.id);
    //Do stuff here
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/"+event.target.id
    );

    req.query({
      token: localStorage.getItem("token")
      //"5c94643a471b590004e5fd00"
    });

    req.headers({
      "cache-control": "no-cache"
    });

    req.end(res => {
      // console.log("res.body [messagePage]: ", res.body);
      // console.log("token passed [messagePage]: ", this.state.token);
      console.log("requests",res.body.requests)
      if (res.error) throw new Error(res.error);
      this.setState({
        messageInfoArray: res.body.requests});
      });
    
  };

  render() {
    return (
      <div>
        <Container className="MessagePage">
          {/* <Button onClick={this.handleBug}>Debugger</Button> */}
          <Row>
            <FormGroup>
              <label>
                Choose your filter
              </label>
              <Select
                multiple={false}
                options={filterOptions}
                onChange={this.handleFilter}
              />
            </FormGroup>
          </Row>
          <Row>
            <Col>
              <ButtonGroup vertical className="SideBar">
                {/* Own tickets */}
                <Button squared theme="light" id= "adminview/uncompleteonly" onClick={this.handleCat}>Your unsolved tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countuncomplete}</Badge></Button>
                <Button squared theme="light" id= "adminview/completeonly" onClick={this.handleCat}>Your completed tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countcomplete}</Badge></Button>

                {/* Team tickets */}
                <Button squared theme="light" id= "team/viewall" onClick={this.handleCat}>All requests in my team&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countallTeam}</Badge></Button>
                <Button squared theme="light" id= "team/unassigned" onClick={this.handleCat}>Team's unassigned tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countunassignedTeam}</Badge></Button>
                <Button squared theme="light" id= "team/uncomplete" onClick={this.handleCat}>Team's uncompleted tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countuncompleteTeam}</Badge></Button>
                <Button squared theme="light" id= "team/complete" onClick={this.handleCat}>Team's completed tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countcompleteTeam}</Badge></Button>

                {/* All tickets */}
                <Button squared theme="light" id= "viewallunassigned" onClick={this.handleCat}>All unassigned tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countunassignedAll}</Badge></Button>
                <Button squared theme="light" id= "viewalluncomplete" onClick={this.handleCat}>All uncomplete tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countuncompleteAll}</Badge></Button>
                <Button squared theme="light" id= "viewallcomplete" onClick={this.handleCat}>All completed tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countcompleteAll}</Badge></Button>
                <Button squared theme="light" id= "viewall" onClick={this.handleCat}>All tickets&nbsp;&nbsp;<Badge pill theme="primary">{this.state.countallAll}</Badge></Button>
              </ButtonGroup>
            </Col>
            <Col>
              <ListGroup>
                <ListGroupItemHeading>
                  <Container>
                    <Row>
                      <Col>Subject</Col>
                      <Col>Requester</Col>
                      <Col>Handler</Col>
                      <Col>Requested</Col>
                      <Col>Type</Col>
                      <Col>Status</Col>
                      <Col>Priority</Col>
                    </Row>
                  </Container>
                </ListGroupItemHeading>
                {this.state.messageInfoArray.map(messageInfoArray => {
                  return <AMessageBox messageInfo={messageInfoArray} token={this.state.token}/>;
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}

export default AMessagePage;
