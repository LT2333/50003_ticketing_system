import React, { Component } from "react";
import { ReactRouter } from "react";
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
  ModalHeader
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
      openTake: false
    };

    this.handleTake = this.handleTake.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(event) {
    this.setState({
      openComplete: !this.state.openComplete
    });
    var unirest = require("unirest");

    var req = unirest(
      "POST",
      "https://courier50003.herokuapp.com/portal/admincomplete"
    );

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      admin_id: this.state.token,
      request_id: this.state.messageInfo._id
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }

  handleTake(event) {
    this.setState({
      openTake: !this.state.openTake
    });

    console.log(
      "admin_id: ",
      this.state.token,
      "request_id: ",
      this.state.messageInfo._id
    );

    var unirest = require("unirest");

    var req = unirest(
      "POST",
      "https://courier50003.herokuapp.com/portal/adminhandle"
    );

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      admin_id: this.state.token,
      request_id: this.state.messageInfo._id
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);
      console.log(res.body);
    });
  }
  render() {
    return (
      <Card className="IndCard">
        <CardHeader>Title</CardHeader>
        <CardBody>
          <h6>from {this.state.messageInfo.username}</h6>
          <p>
            {/* Date Submit: {date}/{month}/{year} */}
            Date Submit: {this.state.messageInfo.date}
          </p>
          <hr />
          <p>{this.state.messageInfo.message}</p>
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
          <Link
            to={{
              pathname: "/amessagepage/chats",
              token: this.state.token,
              id: this.state.messageInfo._id
            }}
          >
            Chat Now!
          </Link>
          <Button className="ThreeButtons" onClick={this.handleTake}>
            Take it
          </Button>
          <Button className="ThreeButtons" onClick={this.handleComplete}>
            Complete
          </Button>

          <Modal open={this.state.openComplete} toggle={this.handleComplete}>
            <ModalHeader>Complete!</ModalHeader>
            <ModalBody>
              This request has been completed by you and its status has been
              changed to completed!
            </ModalBody>
          </Modal>

          <Modal open={this.state.openTake} toggle={this.handleTake}>
            <ModalHeader>Take it!</ModalHeader>
            <ModalBody>
              This request has been taken by you successfully and its status has
              been changed to addressed!
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
