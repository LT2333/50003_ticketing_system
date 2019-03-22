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

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
    this.sendHandler = this.sendHandler.bind(this);
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    console.log("test");
    return (
      <div>
        <h1 className="title">Chat</h1>
        <ChatMessages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }
}

//app
//chatinput - input box
//messages - shows list of messages
//message - show individual message

export default Chats;
