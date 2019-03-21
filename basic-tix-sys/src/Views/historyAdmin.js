import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  CardSubtitle,
  Button
} from "shards-react";
import { Badge } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import "./widgets.css";
import IndMes from "./individualMessage";
import MessageBox from "../Components/messageBox";
// library.add(faIgloo);

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class Ahistory extends Component {
  constructor(props) {
    super(props);
    this.viewMessages = this.viewMessages.bind(this);
    this.state = {
      messageInfo : {
        userInfo: ["Alex","Bro I got questions to ask"],
        statudInfo: ["Processing", "warning"],
        takeWord: "Taken"
      }
    }
  }

  viewMessages(event) {
    var unirest = require("unirest");
    var req = unirest("GET", "http://localhost:3000/data/mark");
    req.headers({
      "cache-control": "no-cache"
    });
    req.end(res => {
      if (res.error) throw new Error(res.error);
      // this.resource = res.body;
      console.log(res.body);

      this.setState({ 
        messageInfo: {
          userInfo: [res.body[0].Username,res.body[0].Message],
          statudInfo: ["Processing", "warning"],
          takeWord: "Taken"}
      });
      
      // this.setState({ Tag_1: res.body[0].Topic_Chosen });
    });
  }
  render() {
    return (
      <div>
          <Container>
            <Row>
              <Button className="buttons" onClick={this.viewMessages}>
                View Messages
              </Button></Row>
            <Row>
              <MessageBox messageInfo={messageInfo} />
            </Row>
          </Container>
      </div>
    );
  }
}

export default Ahistory;
