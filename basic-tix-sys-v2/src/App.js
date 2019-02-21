import React, { Component } from "react";
import "./App.css";
import SignupCreds from "./components/signupPage";
import LoginCreds from "./components/loginPage";
import Homepage from "./components/homePage";
import ContactUs from "./components/contactUsForm";
import MainPage from "./views/mainPage";
import "bootstrap/dist/css/bootstrap.css";
import "shards-ui/dist/css/shards.min.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import {
  Button,
  Container,
  Col,
  Row,
  FormGroup,
  FormInput,
  ListGroup,
  ListGroupItem,
  FormSelect,
  FormTextarea,
  Card,
  CardHeader,
  Form
} from "shards-react";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <h1>Ticketing System</h1>
          <div>
            <Button href="/contactus"> Contact Us</Button>
            <Button href="/login">Log in</Button>
            <Button href="/signup">Sign up</Button>
            <Button href="/message">Message Box</Button>
          </div>

          <Switch>
            {/* <Route exact path="/" component={Homepage} /> */}
            <Route path="/login" component={LoginCreds} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/signup" component={SignupCreds} />
            <Route path="/message" component={MainPage} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;


{/* <SignupCreds/>
<ContactUs/>
<LoginCreds/> */}