// import React, { Component } from "react";
// import {
//   Form,
//   FormInput,
//   FormGroup,
//   Button,
//   NavLink,
//   Container,
//   InputGroup,
//   InputGroupAddon
// } from "shards-react";
// import "./signupPage.css";
// import ChatMessages from "../Components/chatMessages";
// import ChatInput from "../Components/chatInput";
// import { Widget, addResponseMessage } from "react-chat-widget";
// import "react-chat-widget/lib/styles.css";
// import "../Components/chatMessages.css";

// class Chats extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       messages: []
//       // token: this.props.token,
//       // id: this.props.id
//     };
//     // this.sendHandler = this.sendHandler.bind(this);
//   }

//   handleNewUserMessage = newMessage => {
//     console.log(`New message incoming! ${newMessage}`);
//     // Now send the message throught the backend API
//     var unirest = require("unirest");

//     var reqpost = unirest(
//       "POST",
//       "https://courier50003.herokuapp.com/portal/chats"
//     );

//     reqpost.headers({
//       "cache-control": "no-cache",
//       "content-type": "application/json"
//     });

//     reqpost.type("json");
//     reqpost.send({
//       requestor_id: "5cade319ee7ddb000494a61e",
//       // request_id: "5c94b0ca88ae70000426f10a",
//       request_id: "5c9464d4471b590004e5fd05",
//       conversastion: newMessage
//     });

//     reqpost.end(res => {
//       if (res.error) throw new Error(res.error);

//       console.log(res.body);
//       if (newMessage == "pm42") {
//         addResponseMessage("You might consider");
//       }
//     });
//   };

//   render() {
//     console.log("test");
//     console.log(this.state.messages);
//     return (
//       <div>
//         <h1 className="title">Chat</h1>
//         <ChatMessages messages={this.state.messages} />
//         <ChatInput />
//         <Widget handleNewUserMessage={this.handleNewUserMessage} />
//         {/* <ChatMessages messages={this.state.messages} token={this.state.token} id={this.state.id}/>
//         <ChatInput token={this.state.token} id={this.state.id}/> */}
//       </div>
//     );
//   }
// }

// export default Chats;

import React, { Component } from "react";
import {
  Button,
  Row,
  Form,
  FormInput,
  FormGroup,
  NavLink,
  Container,
  InputGroup,
  InputGroupAddon
} from "shards-react";
import "../Components/chatMessages.css";
import "./signupPage.css";

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInput: "",
      messageInfoArray: []
      // token: this.props.token,
      // id: this.props.id
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var unirest = require("unirest");

    var req = unirest(
      "GET",
      "https://courier50003.herokuapp.com/portal/viewreq"
    );

    req.query({
      // token: this.state.id
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
      window.scrollTo(0, document.body.scrollHeight);
    });

    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("request_id"));
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
      // requestor_id: "5cade319ee7ddb000494a61e",
      // request_id: "5c9464d4471b590004e5fd05",
      requestor_id: localStorage.getItem("request_id"),
      request_id: localStorage.getItem("token"),
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

      var reqget = unirest(
        "GET",
        "https://courier50003.herokuapp.com/portal/viewreq"
      );

      reqget.query({
        token: "5c9464d4471b590004e5fd05"
        //token: "5c94643a471b590004e5fd00"
      });

      reqget.headers({
        "cache-control": "no-cache"
      });

      reqget.end(res => {
        if (res.error) throw new Error(res.error);

        this.setState({
          messageInfoArray: res.body
        });

        console.log(res.body);
        window.scrollTo(0, document.body.scrollHeight);
      });
    });
  }

  render() {
    var messageInfoArray = this.state.messageInfoArray;
    //console.log(messageInfoArray);

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

    // console.log(messages);
    return (
      <div className="messages" id="messageList">
        <h1 className="title">Chat</h1>
        {/* <Button onClick={this.handleRefresh}>Refresh</Button> */}
        {messages}
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

export default Chats;
