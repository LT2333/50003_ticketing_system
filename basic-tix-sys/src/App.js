import React, { Component } from "react";
import "./App.css";
import SignupCreds from "./Views/signupPage";
import LoginCreds from "./Views/loginPage";
import Homepage from "./Views/homePage";
import ContactUs from "./Components/contactUsForm";
import HeaderBar from "./Components/headerBar";
import clientHeaderBar from "./Components/clientHeaderBar";
import Chats from "./Views/Chats";
import MyJobs from "./Views/myJobs";
import MyReqs from "./Views/myReqs";
import Ahistory from "./Views/historyAdmin";
import ProfileDisp from "./Views/profileDisplaying";
import ProfileEdit from "./Views/profileEditing";
import AdminMessage from "./Views/adminMessage";
import ClientMessage from "./Views/clientMessage";
import "bootstrap/dist/css/bootstrap.css";
import "shards-ui/dist/css/shards.min.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import SideBar from "./Components/sideBar";
import { Container } from "shards-react";
import TestIframe from "./Components/testIframe";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <HeaderBar />
            {/* <clientHeaderBar /> */}
          </Container>

          <Switch>
            <Route path="/login" component={LoginCreds} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/signup" component={SignupCreds} />
            <Route path="/amessagepage" component={AdminMessage} />
            <Route path="/cmessagepage" component={ClientMessage} />
            <Route path="/chats" component={Chats} />
            <Route path="/iframe" component={TestIframe} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
