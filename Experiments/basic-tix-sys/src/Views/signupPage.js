import React, { Component } from "react";
import { Form, FormInput, FormGroup, Container, Button } from "shards-react";
import "./signupPage.css";

class SignupCreds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      secondpass: "",
      emailValid: false,
      passValid: false,
      formValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handlePassword(event) {
    this.setState({ secondpass: event.target.secondpass });

    if (this.state.secondpass == this.state.password) {
      this.setState({ valid: true });
    }

    if (this.state.valid) {
      console.log("OKAY");
    } else {
      console.log("NOT OKAY");
    }
  }

  handleSubmit(event) {
    console.log(
      "New signup: \n" +
        "username: " +
        this.state.username +
        "\nemail: " +
        this.state.email +
        "\npassword: " +
        this.state.password +
        "\nre-entered password:" +
        this.state.secondpass
    );
    event.preventDefault();
  }

  render() {
    return (
      <div class="w-50 mx-auto">
        <h1>Signup</h1>
        <Form>
          <FormGroup>
            <label>Username</label>
            <FormInput
              placeholder="Enter a username"
              name="username"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Email Address</label>
            <FormInput
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <FormInput
              type="password"
              placeholder="Enter a password"
              name="password"
              onChange={this.handleChange}
            />
            <FormInput
              className="secondpass"
              name="secondpass"
              type="password"
              placeholder="Re-enter password"
              onChange={this.handlePassword}
            />
          </FormGroup>
        </Form>
        <Button onClick={this.handleSubmit} disabled={!this.state.valid}>
          Register
        </Button>
      </div>
    );
  }
}

export default SignupCreds;
