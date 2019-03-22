import React, { Component } from "react";
import ChatMessage from "./chatMessage";
import { Button, Row } from "shards-react";

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
      token: "5c9464d4471b590004e5fd05"
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

      console.log(this.state.messageInfoArray);
      //console.log(this.state.messageInfoArray[0].chat[1]);
    });
  }

  render() {
    var messageInfoArray = this.state.messageInfoArray;
    console.log(messageInfoArray);
    // var msg0 = messageInfoArray[0];
    // console.log(messageInfoArray.chat);

    // var msgList = [];
    // for (var i = 0; i < 11; i++) {
    //   var chatList = messageInfoArray[0].chat[i];
    //   msgList.push(chatList);
    // }
    // console.log(msgList);

    // // Loop through all the messages in the state and create a Message component
    const messages = messageInfoArray.map(messageInfoArray => {
      return (
        <Row>username={messageInfoArray[0].name}</Row>
        // <ChatMessage
        //   key={mIA[0].chat}
        //   username={mIA[0].chat.name}
        //   message-body={mIA[0].chat.message}
        //   // fromMe={messageInfoArray.fromMe}
        // />
      );
    });

    return (
      <div className="messages" id="messageList">
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
