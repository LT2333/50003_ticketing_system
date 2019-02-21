import React, { Component } from "react";
import Messages from "../components/messagePage";

class MainPage extends Component {
    render() {
      return (
        <div>
            <Messages />
            <Messages />
            <Messages />
            <Messages />
        </div>
      );
    }
  }
  
  export default MainPage;