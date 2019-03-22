import React from "react";

const dict = [
  {
    username: "Mark Tan",
    priority: -4,
    status: "unaddressed",
    who: "unaddressed",
    tags: ["problem", "API", "service", "request", "answer"],
    category: "test",
    _id: "5c945241f67fe258683e982f",
    email: "mark@gmail.com",
    contact_num: 1234,
    message:
      "I have a problem with my API service request that I could not solve. When can you get back to me with an answer. This is not so urgent",
    date: "2019-03-22T03:10:57.274Z",
    chat: [
      {
        date: "2019-03-22T03:14:16.105Z",
        _id: "5c9453084f3c6f0004860156",
        name: "admin1",
        message: "Hello world i am testing again"
      },
      {
        date: "2019-03-22T03:14:23.737Z",
        _id: "5c94530f4f3c6f0004860157",
        name: "admin1",
        message: "Hello world i am testing again and again"
      }
    ],
    __v: 0
  }
];

class ChatMessage extends React.Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? "from-me" : "";

    return (
      <div className={`message ${fromMe}`}>
        <div className="username">{this.props.username}</div>
        <div className="message-body">{this.props.message}</div>
      </div>
    );
  }
}

ChatMessage.defaultProps = {
  message: "",
  username: "",
  fromMe: false
};

export default ChatMessage;
