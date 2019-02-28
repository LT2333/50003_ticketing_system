import React, { Component } from "react";
import "./App.css";
import SignupCreds from "./Views/signupPage";
import LoginCreds from "./Views/loginPage";
import Homepage from "./Views/homePage";
import ContactUs from "./Components/contactUsForm";
import HeaderBar from "./Components/headerBar";
import MessageBox from "./Views/messagePage";
import IndMes from "./Views/individualMessage";
import "bootstrap/dist/css/bootstrap.css";
import "shards-ui/dist/css/shards.min.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import SideBar from "./Components/sideBar";
import { Container } from "shards-react";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Container>
            <HeaderBar />
          </Container>

          <Switch>
            <Route path="/login" component={LoginCreds} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/signup" component={SignupCreds} />
            <Route path="/messagepage" component={MessageBox} />
            <Route path="/individualmessage" component={IndMes} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
