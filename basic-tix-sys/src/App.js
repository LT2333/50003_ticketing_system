import React, { Component } from "react";
import "./App.css";
import SignupCreds from "./Views/signupPage";
import LoginCreds from "./Views/loginPage";
import Homepage from "./Views/homePage";
import ContactUs from "./Components/contactUsForm";
import HeaderBar from "./Components/headerBar";
import MessagePage from "./Views/messagePage";
import IndMes from "./Views/individualMessage";
import MyJobs from "./Views/myJobs"
import MyReqs from "./Views/myReqs"
import Ahistory from "./Views/historyAdmin"
import ProfileDisp from "./Views/profileDisplaying"
import ProfileEdit from "./Views/profileEditing"
import "bootstrap/dist/css/bootstrap.css";
import "shards-ui/dist/css/shards.min.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import SideBar from "./Components/sideBar";
import { Container } from "shards-react";
import adminHeaderBar from "./Components/adminHeaderBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <HeaderBar />
          </Container>

          <Switch>
            <Route path="/adminheader" component={adminHeaderBar} />
          </Switch>

          <Switch>
            <Route path="/login" component={LoginCreds} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/signup" component={SignupCreds} />
            <Route path="/messagepage" component={MessagePage} />
            <Route path="/individualmessage" component={IndMes} />
            {/* <Route path="/ahistory" component={Ahistory} /> */}
            <Route path="/main" component={MessagePage} />
            {/* <Route path="chats/" component={Chats} />
            <Route path="/myjobs" component={MyJobs} />
            <Route path="/myreqs" component={MyReqs} />
            <Route path="/profileedit" component={ProfileEdit} />
            <Route path="/profiledisp" component={ProfileDisp} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
