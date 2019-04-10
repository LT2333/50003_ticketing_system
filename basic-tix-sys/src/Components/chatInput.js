import React, { Component } from "react";
import {
  Form,
  FormInput,
  FormGroup,
  Button,
  NavLink,
  Container,
  InputGroup,
  InputGroupAddon,
  Row
} from "shards-react";
import "../Views/signupPage.css";
import ChatMessages from "./chatMessages";

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: ""
      // token: this.props.token,
      // id: this.props.id
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
      requestor_id: "5cade319ee7ddb000494a61e",
      // request_id: "5c94b0ca88ae70000426f10a",
      request_id: "5c9464d4471b590004e5fd05",
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
    });
  }

  render() {
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
