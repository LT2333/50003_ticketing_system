import React, { Component } from "react";
import { Form, FormInput, FormGroup, Container, Button } from "shards-react";
import "./widgets.css";

class SignupCreds extends Component {
  state () {};
  render() {
    return (
      <div class="w-50 mx-auto">
        <h1>Signup</h1>
        <Form>
          <FormGroup>
            <label>Username</label>
            <FormInput placeholder="Enter a username" />
          </FormGroup>
          <FormGroup>
            <label>Email Address</label>
            <FormInput type="email" placeholder="Enter your email" />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <FormInput type="password" placeholder="Enter a password" />
            <FormInput
              className="secondpass"
              type="password"
              placeholder="Re-enter password"
            />
          </FormGroup>
        </Form>
        <Button type="submit">Register</Button>
      </div>
    );
  }
}

export default SignupCreds;
