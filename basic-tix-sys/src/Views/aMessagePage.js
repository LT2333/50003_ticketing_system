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
  ButtonGroup
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
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import Iframe from "react-iframe";
// import ReactDOM from "react-dom";

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

// const ComponentIframe = React.createClass({
//   iframe: function() {
//     return {
//       __html: this.props.iframe
//     };
//   },

//   render: function() {
//     return (
//       <div>
//         <div dangerouslySetInnerHTML={this.iframe()} />
//       </div>
//     );
//   }
// });

// const iframe =
//   '<iframe allow="microphone;" width="350" height="430" src="https://console.dialogflow.com/api-client/demo/embedded/8a3f1d1d-1ff2-4a83-9cfe-d7d848c6e3d1"></iframe>';

// ReactDOM.render(
//   <ComponentIframe iframe={iframe} />,
//   document.getElementById("container")
// );

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

    this.state = {
      messageInfoArray: this.messageInfoArray,
      token: this.props.token,
      filterEndpoint: "https://courier50003.herokuapp.com/portal/viewdate"
    };
    this.handleBug = this.handleBug.bind(this);
  }
  componentDidMount() {
    //Do stuff here
    this.setState({
      filterEndpoint: "https://courier50003.herokuapp.com/portal/viewstatus"
    });

    var unirest = require("unirest");

    var req = unirest("GET", this.state.filterEndpoint);

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
        messageInfoArray: res.body.requests
      });
    });
  }
  handleBug(event) {
    console.log("Props from clientMes to messagePage: ", this.props);
  }

  handleFilter(event) {
    console.log("Event [messagePage]: ", event.target.id);
    //Do stuff here
    this.setState({
      filterEndpoint:
        "https://courier50003.herokuapp.com/portal/" + event.target.id
    });

    var unirest = require("unirest");

    var req = unirest("GET", this.state.filterEndpoint);

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
        messageInfoArray: res.body.requests
      });
    });
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API

    if (newMessage == "help" || newMessage == "help me") {
      addResponseMessage(
        "Sure, I'll be glad to help! What problem are you facing?"
      );
    } else if (
      newMessage == "How do I make a call to an end-point?" ||
      newMessage == "how do I make a call to an endpoint"
    ) {
      addResponseMessage(
        "You can make a call by using Postman and generating the code from there."
      );
    } else if (
      newMessage == "What do the REST APIs allow me to do?" ||
      newMessage == "what do REST APIs do" ||
      newMessage == "rest apis" ||
      newMessage == "what does REST do"
    ) {
      addResponseMessage(
        "The REST APIs let you work programmatically with most Audience Management features and functions that are available in the user interface."
      );
    } else if (
      newMessage == "I am getting a server down error" ||
      newMessage == "API produces HTTP error"
    ) {
      addResponseMessage("May I know the HTTP status code for the error?");
    } else if (newMessage == "503") {
      addResponseMessage(
        "Your server is likely to have overloaded causing a 503 Service Unavailable error. You might want to restart your server or clear some entries."
      );
    } else if (newMessage == "I am having trouble with my API") {
      addResponseMessage("Have you tried re-running your code?");
    } else if (
      newMessage == "API not receiving response" ||
      newMessage == "The API is not receiving any response"
    ) {
      addResponseMessage(
        "Perhaps you have given in the wrong input. You can try sending in an easier input."
      );
    } else {
      addResponseMessage(
        "Sorry I didn't get that, can you try asking it another way?"
      );
    }

    // addResponseMessage("Welcome to the chatbot");
    // const awesomelink = {
    //   title: "My awesome link",
    //   link: "https://github.com/Wolox/react-chat-widget",
    //   target: "_blank"
    // };
    // addLinkSnippet(awesomelink);
  };

  render() {
    return (
      <div>
        <Container className="MessagePage">
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
                <Button
                  squared
                  theme="light"
                  id="viewstatus"
                  onClick={this.handleFilter}
                >
                  Sort by status
                </Button>
                <Button
                  squared
                  theme="light"
                  id="viewdate"
                  onClick={this.handleFilter}
                >
                  Sort by date
                </Button>
                <Button
                  squared
                  theme="light"
                  id="viewwho"
                  onClick={this.handleFilter}
                >
                  Sort by who
                </Button>
                <Button
                  squared
                  theme="light"
                  id="viewcategory"
                  onClick={this.handleFilter}
                >
                  Sort by category
                </Button>
                <Button
                  squared
                  theme="light"
                  id="viewpriority"
                  onClick={this.handleFilter}
                >
                  Sort by priority
                </Button>
                <Button
                  squared
                  theme="light"
                  id="adminview"
                  onClick={this.handleFilter}
                >
                  My Jobs
                </Button>
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
                  return (
                    <AMessageBox
                      messageInfo={messageInfoArray}
                      token={this.state.token}
                    />
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            title="Smart Chatbot"
            subtitle="Feel free to ask anything!"
          />
        </Container>
      </div>
    );
  }
}

export default AMessagePage;
