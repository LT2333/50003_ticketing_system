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
  Badge
} from "shards-react";
import "./widgets.css";

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
      token: props.location.token
    };

    this.handleTake = this.handleTake.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(event) {
    var unirest = require("unirest");

    var req = unirest("POST", "https://courier50003.herokuapp.com/portal/admincomplete");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "admin_id": this.state.token,
      "request_id": this.state.messageInfo._id
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }

  handleTake(event) {
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
      "admin_id": this.state.token,
      "request_id": this.state.messageInfo._id
    });

    req.end(function (res) {
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
          <Button className="ThreeButtons" href="/amessagepage/chats">Chat Now</Button>
          <Button className="ThreeButtons" onClick={this.handleTake}>Take it</Button>
          <Button className="ThreeButtons" onClick={this.handleComplete}>Complete</Button>
          {/* <Button onClick={ReactRouter.browserHistory.goBack} theme="dark">
            Go Back
          </Button> */}
        </CardFooter>
      </Card>
    );
  }
}

export default AIndMes;