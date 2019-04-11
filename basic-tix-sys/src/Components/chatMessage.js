import React, { Component } from "react";
import ChatMessage from "./chatMessage";
import { Button, Row, Container } from "shards-react";
import "./chatMessages.css";
import { gray } from "ansi-colors";

class ChatMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInfoArray: []
    };

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  // componentDidUpdate() {
  //   // There is a new message in the state, scroll to bottom of list
  //   const objDiv = document.getElementById("messageList");
  //   objDiv.scrollTop = objDiv.scrollHeight;
  // }

  handleRefresh() {
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/viewreq"
    );

    req.query({
      token: localStorage.getItem("token")
      //token: "5c94643a471b590004e5fd00"
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

      //console.log(this.state.messageInfoArray);
      //console.log(this.state.messageInfoArray[0].chat[1]);
    });
  }

  render() {
    var messageInfoArray = this.state.messageInfoArray;
    console.log(messageInfoArray);

    // // Loop through all the messages in the state and create a Message component
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

    // const browserHistory = require("react-router-dom/BrowserHistory").default;

    return (
      <div className="messages" id="messageList">
        {/* <Button onClick={browserHistory.goBack}>Go Back</Button> */}
        <Button onClick={this.handleRefresh}>Refresh</Button>
        {messages}
      </div>
    );
  }
}

ChatMessages.defaultProps = {
  messages: []
};

export default ChatMessages;