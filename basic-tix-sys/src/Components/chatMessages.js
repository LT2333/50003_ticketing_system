import React, { Component } from "react";
import ChatMessage from "./chatMessage";
import { Button } from "shards-react";

class ChatMessages extends Component {
  constructor(props) {
    super(props);

    // const dict = [
    //   {
    //     username: "Mark Tan",
    //     priority: -4,
    //     status: "unaddressed",
    //     who: "unaddressed",
    //     tags: ["problem", "API", "service", "request", "answer"],
    //     category: "test",
    //     _id: "5c945241f67fe258683e982f",
    //     email: "mark@gmail.com",
    //     contact_num: 1234,
    //     message:
    //       "I have a problem with my API service request that I could not solve. When can you get back to me with an answer. This is not so urgent",
    //     date: "2019-03-22T03:10:57.274Z",
    //     chat: [
    //       {
    //         date: "2019-03-22T03:14:16.105Z",
    //         _id: "5c9453084f3c6f0004860156",
    //         name: "admin1",
    //         message: "Hello world i am testing again"
    //       },
    //       {
    //         date: "2019-03-22T03:14:23.737Z",
    //         _id: "5c94530f4f3c6f0004860157",
    //         name: "admin1",
    //         message: "Hello world i am testing again and again"
    //       }
    //     ],
    //     __v: 0
    //   }
    // ];

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
    });
  }

  render() {
    var messageInfoArray = this.state.messageInfoArray;
    var msg0 = messageInfoArray[0];
    console.log(msg0);

    // var msgList = [];
    // for (var i = 0; i < 11; i++) {
    //   var chatList = messageInfoArray[0].chat[i];
    //   msgList.push(chatList);
    // }
    // console.log(msgList);

    // // Loop through all the messages in the state and create a Message component
    // const messages = messageInfoArray.map(messageInfoArray => {
    //   return (
    //     <ChatMessage
    //       key={index}
    //       username={messageInfoArray[0].chat.name}
    //       message={messageInfoArray[0].chat.message}
    //       // fromMe={messageInfoArray.fromMe}
    //     />
    //   );
    // });

    return (
      <div className="messages" id="messageList">
        <Button onClick={this.handleRefresh}>Refresh</Button>
        {/* {messages} */}
      </div>
    );
  }
}

ChatMessages.defaultProps = {
  messages: []
};

export default ChatMessages;
