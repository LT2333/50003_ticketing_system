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

    // var unirest = require("unirest");

    // var reqpost = unirest(
    //   "POST",
    //   "https://courier50003.herokuapp.com/portal/chats"
    // );

    // reqpost.headers({
    //   "cache-control": "no-cache",
    //   "content-type": "application/json"
    // });

    // reqpost.type("json");
    // reqpost.send({
    //   // admin_id: "5c94643a471b590004e5fd00",
    //   admin_id: "5c9b1de27653c06600c44686",
    //   request_id: "5c946495471b590004e5fd01",
    //   conversastion: this.state.chatInput
    // });

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
      request_id: "5c94b0ca88ae70000426f10a",
      conversastion: "Hello world i am testing again and again"
    });

    reqpost.end(res => {
      if (res.error) throw new Error(res.error);

      console.log(res.body);

      this.setState({ chatInput: "" });
      console.log("not here");
      console.log(this.state.chatInput);
    });

    // Call the onSend callback with the chatInput message
    // this.props.onSend(this.state.chatInput);

    // Clear the input box
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
