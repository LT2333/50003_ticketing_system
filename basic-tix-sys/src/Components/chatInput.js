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
    this.setState({ chatInput: event.target.value });
  }

  handleSubmit(event) {
    // Stop the form from refreshing the page on submit
    event.preventDefault();

    var unirest = require("unirest");

    var req = unirest(
      "POST",
      "https://courier50003.herokuapp.com/portal/chats"
    );

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      admin_id: "5c94643a471b590004e5fd00",
      request_id: "5c9464d4471b590004e5fd05",
      conversastion: "Hello world i am testing again"
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });

    // Call the onSend callback with the chatInput message
    // this.props.onSend(this.state.chatInput);

    // Clear the input box
    this.setState({ chatInput: "" });
    console.log("not here");
    console.log(this.state.chatInput);
  }

  render() {
    console.log("test");
    return (
      <div>
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
      </div>
    );
  }
}

//app
//chatinput - input box
//messages - shows list of messages
//message - show individual message

export default ChatInput;
