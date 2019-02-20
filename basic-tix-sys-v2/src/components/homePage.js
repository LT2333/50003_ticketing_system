import React, { Component } from "react";
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
// import { BrowserRouter as Router, Link } from "react-router-dom";

class Homepage extends Component {
  state () {};
  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <Button href="/contactus"> Contact Us</Button>
        <Button href="/login">Log in</Button>
        <Button href="/">Home Page</Button>
        <Button href="/signup">Sign up</Button>
      </div>
    );
  }
}

export default Homepage;
