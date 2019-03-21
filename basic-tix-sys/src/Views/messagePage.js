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

class MessagePage extends Component {
  constructor(props) {
    super(props);

    var messageInfoArray = [{
      "username": "usertest",
      "priority": -1,
      "status": "unaddressed",
      "who": "unaddressed",
      "tags": [],
      "category": "test",
      "_id": "5c8e2874f75f992a30601303",
      "imageURL": "",
      "email": "glenn11@gmail.com",
      "contact_num": 1234,
      "message": "Help witsh thiss api",
      "date": "2019-03-17T10:59:00.278Z",
      "chat": [],
      "__v": 0
  }];

    this.messageInfoArray = messageInfoArray;
    this.viewMessages = this.viewMessages.bind(this);
    this.state = {
      messageInfoArray : this.messageInfoArray
    }
  }

  viewMessages(event) {
    var unirest = require("unirest");

    var req = unirest("GET", "https://courier50003.herokuapp.com/portal/viewdate");

    req.query({
      "token": "5c8e2818f75f992a30601300"
    });

    req.headers({
      "cache-control": "no-cache"
    });


    req.end(res => {
      console.log(res.body);
      if (res.error) throw new Error(res.error);
      this.setState({ 
        messageInfoArray: res.body
      });
    });
      
      // this.setState({ Tag_1: res.body[0].Topic_Chosen });
  }
  render() {
    return (
      <div>
          <Container>
            <Row>
              <Button className="buttons" onClick={this.viewMessages}>
                View Messages
              </Button>
            </Row>
            <Row>
              {/* <MessageBox messageInfo={this.state.messageInfo} /> */}
              {this.state.messageInfoArray.map((messageInfoArray)=>{
                return <MessageBox messageInfo={messageInfoArray}/>
              })}
            </Row>
          </Container>
      </div>
    );
  }
}

export default MessagePage;
