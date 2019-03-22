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
import "../Views/signupPage.css";
import ChatMessages from "./chatMessages";

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();
    // Call the onSend callback with the chatInput message
    this.props.onSend(this.state.chatInput);
    // Clear the input box
    this.setState({ chatInput: "" });
  }

  render() {
    console.log("test");
    return (
      <div>
        <h1 className="title">Chat</h1>
        <chatMessages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
        <InputGroup>
          <FormInput
            placeholder="Type here"
            name="chatInput"
            onChange={this.handleChange}
          />
          <InputGroupAddon type="append">
            <Button theme="secondary" onClick={this.handleSubmit}>
              Send
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

//app
//chatinput - input box
//messages - shows list of messages
//message - show individual message

export default ChatInput;
