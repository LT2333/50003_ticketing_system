import React, { Component } from "react";
import ChatMessage from "./chatMessage";
import { Button, Row, Container } from "shards-react";
import "./chatMessages.css";

class ChatMessages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInfoArray: []
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    //this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/viewreq"
    );

    req.query({
      token: "5c946495471b590004e5fd01"
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
    });
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
      token: "5c946495471b590004e5fd01"
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
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    console.log("prevstate: " + prevState.messageInfoArray);
    console.log("this.state: " + this.state.messageInfoArray);
    if (this.state.messageInfoArray !== prevState.messageInfoArray) {
      console.log("message list has been updated!");
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
    }
  }

  render() {
    var messageInfoArray = this.state.messageInfoArray;
    //var chatsOnly = t(messageInfoArray, "chatsOnly").safeObject;
    console.log(messageInfoArray);

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
    console.log(messages);
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
