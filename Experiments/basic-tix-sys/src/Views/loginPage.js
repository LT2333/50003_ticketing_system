import React, { Component } from "react";
import { Form, FormInput, FormGroup, Button, NavLink } from "shards-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Homepage from "./homePage";

class LoginCreds extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div class="w-50 mx-auto">
          <h1>Courier Tix</h1>
          <Form>
            <FormGroup>
              <label>Username</label>
              <FormInput placeholder="Username" />
            </FormGroup>

            <FormGroup>
              <label>Password</label>
              <FormInput type="password" placeholder="Password" />
            </FormGroup>
          </Form>
          <Link to={Homepage}>
            <Button>Login</Button>
          </Link>
          <Link to="/signupPage">
            <NavLink>New user? Register here!</NavLink>
          </Link>
        </div>
      </Router>
    );
  }
}

export default LoginCreds;
