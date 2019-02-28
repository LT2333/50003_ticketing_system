import React, { Component } from "react";
import "./App.css";
import SignupCreds from "./components/signupPage";
import LoginCreds from "./components/loginPage";
import Homepage from "./components/homePage";
import ContactUs from "./components/contactUsForm";
import MainPage from "./views/mainPage"
import IndMes from "./components/individualMessage";
import "bootstrap/dist/css/bootstrap.css";
import "shards-ui/dist/css/shards.min.css";
import "./components/widgets.css";
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
          <h1 className="titles">Ticketing System</h1>
          <div>
            <Button className="buttons" href="/contactus">Contact Us</Button>
            <Button className="buttons" href="/login">Log in</Button>
            <Button className="buttons" href="/signup">Sign up</Button>
            <Button className="buttons" href="/message">Message Box</Button>
          </div>

          <Switch>
            {/* <Route exact path="/" component={Homepage} /> */}
            <Route path="/login" component={LoginCreds} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/signup" component={SignupCreds} />
            <Route path="/message" component={MainPage} />
            <Route path="/indmes" component={IndMes} />
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