import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import {
  Button,
  Row,
  Form,
  FormInput,
  FormGroup,
  NavLink,
  Container,
  InputGroup,
  InputGroupAddon,
} from "shards-react";
import "../Components/chatMessages.css";
import "./signupPage.css";

class adminChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: "",
      messageInfoArray: []
      // token: this.props.token,
      // id: this.props.id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/viewreq"
    );

    req.query({
      // token: this.state.id
      token: localStorage.getItem("id")
    });

    req.headers({
      "cache-control": "no-cache"
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);

      this.setState({
        messageInfoArray: res.body
      });

      console.log(res.body);
      window.scrollTo(0, document.body.scrollHeight);
    });

    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("id"));
  }

  handleChange(event) {
    this.setState({ chatInput: event.target.value });
  }

  handleSubmit(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    var unirest = require("unirest");

    var reqpost = unirest(
      "POST",
      "https://courier50003.herokuapp.com/portal/chats"
    );

    reqpost.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    reqpost.type("json");
    reqpost.send({
      // requestor_id: "5cade319ee7ddb000494a61e",
      // request_id: "5c9464d4471b590004e5fd05",
      requestor_id: localStorage.getItem("token"),
      request_id: localStorage.getItem("id"),
      conversastion: this.state.chatInput
    });

    reqpost.end(res => {
      if (res.error) throw new Error(res.error);

      console.log(res.body);

      this.setState({
        chatInput: ""
      });

      console.log("not here");
      console.log("current chat input in res end: " + this.state.chatInput);

      var reqget = unirest(
        "GET",
        "https://courier50003.herokuapp.com/portal/viewreq"
      );

      reqget.query({
        token: localStorage.getItem("id")
        //token: "5c94b94b88ae70000426f10e"
      });

      reqget.headers({
        "cache-control": "no-cache"
      });

      reqget.end(res => {
        if (res.error) throw new Error(res.error);

        this.setState({
          messageInfoArray: res.body
        });

        console.log(res.body);
        window.scrollTo(0, document.body.scrollHeight);
      });
    });
  }

  render() {
    var messageInfoArray = this.state.messageInfoArray;
    //console.log(messageInfoArray);

    const messages = messageInfoArray.map(m => {
      return (
        <div>
          <Container>
            <Row className="chatuser">{m.name}</Row>
            <Row className="msgbody">{m.message}</Row>

            {/* <ChatMessage
            key={m.chat}
            username={m.chat.name}
            message-body={m.chat.message}
            //fromMe={messageInfoArray.fromMe}
          /> */}
          </Container>
        </div>
      );
    });

    // console.log(messages);
    return (
      <div className="messages" id="messageList">
        <h1 className="title">Chat</h1>
        {/* <Button onClick={this.handleRefresh}>Refresh</Button> */}
        {messages}
        <InputGroup>
          <FormInput
            placeholder={this.state.chatInput}
            name="chatInput"
            onChange={this.handleChange}
          />
          <InputGroupAddon type="append">
            <Button theme="secondary" onClick={this.handleSubmit}>
              Send
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Link
          to={"/amessagepage/aindividualmessage" }
            >
          Back
        </Link>
      </div>
    );
  }
}

export default adminChats;
