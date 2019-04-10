import React, { Component } from "react";
import {
  Form,
  FormInput,
  FormGroup,
  Button,
  NavLink,
  Container,
  InputGroup,
  InputGroupAddon
} from "shards-react";
import "./signupPage.css";
import ChatMessages from "../Components/chatMessages";
import ChatInput from "../Components/chatInput";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import "../Components/chatMessages.css";

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      token: this.props.token,
      id: this.props.id
    };
    // this.sendHandler = this.sendHandler.bind(this);
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
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
      requestor_id: "5c9b1de27653c06600c44686",
      // request_id: "5c94b0ca88ae70000426f10a",
      request_id: "5c946495471b590004e5fd01",
      conversastion: newMessage
    });

    reqpost.end(res => {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
      if (newMessage == "pm42") {
        addResponseMessage("You might consider");
      }
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.messages !== prevState.messages) {
  //     console.log("componentdidupdate");
  // var unirest = require("unirest");

  // var req = unirest(
  //   "GET",
  //   "https://courier50003.herokuapp.com/portal/viewreq"
  // );

  // req.query({
  //   token: "5c946495471b590004e5fd01"
  //   //token: "5c94643a471b590004e5fd00"
  // });

  // req.headers({
  //   "cache-control": "no-cache"
  // });

  // req.end(res => {
  //   if (res.error) throw new Error(res.error);

  //   this.setState({
  //     messageInfoArray: res.body
  //   });

  //   console.log(res.body);
  // });
  //   }
  // }

  render() {
    console.log("test");
    console.log(this.state.messages);
    return (
      <div>
        <h1 className="title">Chat</h1>
        <ChatMessages messages={this.state.messages} />
        <ChatInput />
        <Widget handleNewUserMessage={this.handleNewUserMessage} />
        {/* <ChatMessages messages={this.state.messages} token={this.state.token} id={this.state.id}/>
        <ChatInput token={this.state.token} id={this.state.id}/> */}
      </div>
    );
  }
}

export default Chats;
