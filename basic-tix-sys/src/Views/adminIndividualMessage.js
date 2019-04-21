import React, { Component } from "react";
import {ReactRouter} from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  CardSubtitle,
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  FormInput
} from "shards-react";
import "./widgets.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class AIndMes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInfo: props.location.messageInfo,
      token: props.location.token,
      openComplete: false,
      openTake: false,
      summary: "",
      openTeam: false,
    };

    this.handleTake = this.handleTake.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleChat = this.handleChat.bind(this);
    this.handleSum = this.handleSum.bind(this);
    this.handleSub = this.handleSub.bind(this);
    this.handleTeam = this.handleTeam.bind(this);
  }

  handleTeam(event) {
    this.setState({openTeam: !this.state.openTeam})

    var unirest = require("unirest");

    var req = unirest("POST", "https://courier50003.herokuapp.com/portal/teamhandle");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "admin_id": localStorage.getItem("token"),
      "request_id": localStorage.getItem("id")
      // "admin_id": this.state.token,
      // "request_id": this.state.messageInfo._id
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      console.log(res.body);
    });
  }

  handleComplete(event) {
    this.setState({
      openComplete: !this.state.openComplete
    });
    var unirest = require("unirest");

    var req = unirest("POST", "https://courier50003.herokuapp.com/portal/admincomplete");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "admin_id": localStorage.getItem("token"),
      "request_id": localStorage.getItem("id")
      // "admin_id": this.state.token,
      // "request_id": this.state.messageInfo._id
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }

  handleSum(event) {
    this.setState({ summary: event.target.value });
  }

  handleSub(event) {
    var unirest = require("unirest");

    var req = unirest("POST", "https://courier50003.herokuapp.com/portal/adminarchive");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "request_id": localStorage.getItem("id"),
      "solution": this.state.summary,
    });

    this.setState({openComplete: false})

    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      console.log(res.body);
    });
  }

  handleChat(event) {
    localStorage.setItem("id",this.state.messageInfo._id);
  }

  handleTake(event) {

    this.setState({
      openTake: !this.state.openTake
    });

    console.log("admin_id: ", this.state.token,
      "request_id: ", this.state.messageInfo._id)

    var unirest = require("unirest");

    var req = unirest("POST", "https://courier50003.herokuapp.com/portal/adminhandle");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "admin_id": localStorage.getItem("token"),
      "request_id": localStorage.getItem("id")
      // "admin_id": this.state.token,
      // "request_id": this.state.messageInfo._id
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      console.log(res.body);
    });
  }
  render() {
    return (
      <Card className="IndCard">
        <CardHeader>{this.state.messageInfo.title}</CardHeader>
        <CardBody>
          <h6>from {this.state.messageInfo.username}</h6>
          <p>
            {/* Date Submit: {date}/{month}/{year} */}
            Date Submit: {this.state.messageInfo.date}
          </p>
          <hr />
          <p>{this.state.messageInfo.message}</p>
          <img 
            src={this.state.messageInfo.imageURL}
            alt=""
            />
        </CardBody>
        <CardFooter>
          {this.state.messageInfo.tags.map(tags => {
            return (
              <Badge theme="light" className="Tags">
                {tags}
              </Badge>
            );
          })}
          <hr />
          {/* <Link
          to={{
            pathname: "/amessagepage/chats" ,
            token: this.state.token,
            id: this.state.messageInfo._id
          }}
          >Chat Now!</Link> */}
          <Link
          to={"/amessagepage/chats"}
          onClick={this.handleChat}
            >
          Chat Now!
          </Link>
          <Button className="ThreeButtons" onClick={this.handleTake}>Take it</Button>
          <Button className="ThreeButtons" onClick={this.handleComplete}>Complete</Button>
          <Button className="ThreeButtons" onClick={this.handleTeam}>Team handle</Button>
          <Link
          to={"/amessagepage"}
            >
          Back
          </Link>

          <Modal open={this.state.openComplete} toggle={this.handleComplete}>
            <ModalHeader>Complete!</ModalHeader>
            <ModalBody>
              This request has been completed by you and 
              its status has been changed to completed!
              <FormGroup>
                <label>Please provide a brief summary of this solution: </label>
                <FormInput
                  name="summary"
                  onChange={this.handleSum}
                  size="lg"
                />
              </FormGroup>
              <Button onClick={this.handleSub}>Click to submit &rarr;</Button>
            </ModalBody>
          </Modal>

          <Modal open={this.state.openTake} toggle={this.handleTake}>
            <ModalHeader>Take it!</ModalHeader>
            <ModalBody>
              This request has been taken by you successfully and 
              its status has been changed to addressed!
            </ModalBody>
          </Modal>
          <Modal open={this.state.openTeam} toggle={this.handleTeam}>
            <ModalHeader>Handle Team</ModalHeader>
            <ModalBody>
              This requests is successfully handled by your team!
            </ModalBody>
          </Modal>
          {/* <Button onClick={ReactRouter.browserHistory.goBack} theme="dark">
            Go Back
          </Button> */}
        </CardFooter>
      </Card>
    );
  }
}

export default AIndMes;