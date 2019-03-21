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

const messagesExample = [
  {
    numid: 0,
    username: "no account",
    priority: -1,
    status: "unaddressed",
    who: "glenn1",
    tags: [],
    category: "test",
    _id: "5c8e0adb4c75e73eb801595c",
    imageURL: "",
    email: "hello@accenture.com",
    contact_num: 1234,
    message: "Help with this api",
    date: "2019-03-17T08:52:43.899Z",
    __v: 0,
    chat: []
  },
  {
    numid: 1,
    username: "no account",
    priority: -1,
    status: "addressing",
    who: "glenn1",
    tags: [],
    category: "test",
    _id: "5c8e0b4b3facd432b444d97b",
    imageURL: "",
    email: "helllo@accenture.com",
    contact_num: 1234,
    message: "Help with this api",
    date: "2019-03-17T08:54:35.872Z",
    chat: [],
    __v: 0
  },
  {
    numid: 2,
    username: "Glenn",
    priority: -1,
    status: "unaddressed",
    who: "unaddressed",
    tags: [],
    category: "test",
    _id: "5c8e1b8fc46b8b48141e4cc4",
    imageURL: "",
    email: "glenn@gmail.com",
    contact_num: 1234,
    message: "Help with this api",
    date: "2019-03-17T10:03:59.574Z",
    chat: [],
    __v: 0
  },
  {
    numid: 3,
    username: "Glenn",
    priority: -1,
    status: "unaddressed",
    who: "unaddressed",
    tags: [],
    category: "test",
    _id: "5c8e1be1a6cf2a315cce8203",
    imageURL: "",
    email: "glenn@gmail.com",
    contact_num: 1234,
    message: "Help with this api",
    date: "2019-03-17T10:05:21.084Z",
    chat: [],
    __v: 0
  },
  {
    numid: 4,
    username: "usertest",
    priority: -1,
    status: "unaddressed",
    who: "unaddressed",
    tags: [],
    category: "test",
    _id: "5c8e286cf75f992a30601301",
    imageURL: "",
    email: "glenn11@gmail.com",
    contact_num: 1234,
    message: "Help with this api",
    date: "2019-03-17T10:58:52.676Z",
    chat: [],
    __v: 0
  },
  {
    numid: 5,
    username: "usertest",
    priority: -1,
    status: "unaddressed",
    who: "unaddressed",
    tags: [],
    category: "test",
    _id: "5c8e2871f75f992a30601302",
    imageURL: "",
    email: "glenn11@gmail.com",
    contact_num: 1234,
    message: "Help with thiss api",
    date: "2019-03-17T10:58:57.925Z",
    chat: [
      {
        _id: "5c8e4230538d97574c80a213",
        name: "glenn1",
        message: "Hello world i am testing"
      },
      {
        _id: "5c8e4312db52e112e8ef1e4d",
        name: "glenn1",
        message: "Hello world i am testing again"
      }
    ],
    __v: 0
  },
  {
    numid: 6,
    username: "usertest",
    priority: -1,
    status: "unaddressed",
    who: "unaddressed",
    tags: [],
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

var messageInfo = {
  userInfo: [messagesExample.who, messagesExample.message],
  statusInfo: ["Processing", "warning"],
  takeWord: "Taken"
};

function LoopMessages(props) {
  console.log(props);
  return (
    <div>
      {props.messageInfo.map(mb => (
        <MessageBox key={mb.numid} messageInfo={messageInfo} />
      ))}
    </div>
  );
}

class MessagePage extends Component {
  constructor(props) {
    super(props);

    var messageInfoLocal = {
      userInfo: ["Alex", "Bro I got questions to ask"],
      statusInfo: ["Processing", "warning"],
      takeWord: "Taken"
    };

    this.messageInfoLocal = messageInfoLocal;
    this.viewMessages = this.viewMessages.bind(this);
    this.state = {
      messageInfo: this.messageInfoLocal
    };
  }

  viewMessages(event) {
    // var unirest = require("unirest");
    // var req = unirest("GET", "http://localhost:3000/data/mark");
    // req.headers({
    //   "cache-control": "no-cache"
    // });

    // req.end(res => {
    //   if (res.error) throw new Error(res.error);
    //   // this.resource = res.body;
    //   console.log(res.body);

    this.setState({
      messageInfo: {
        // userInfo: [res.body[0].Username,res.body[0].Message],
        userInfo: ["Not Alex anymore", "did it actually change"],
        statusInfo: ["Processing", "warning"],
        takeWord: "Taken"
      }
    });

    // this.setState({ Tag_1: res.body[0].Topic_Chosen });
    // });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Container>
          <Row>
            <Button className="buttons" onClick={this.viewMessages}>
              View Messages
            </Button>
          </Row>
          {/* <Row>
            <MessageBox messageInfo={this.state.messageInfo} />
          </Row> */}
          <Row>
            <LoopMessages messageInfo={messagesExample} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default MessagePage;
