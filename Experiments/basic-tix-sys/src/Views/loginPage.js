import React, { Component } from "react";
import { Form, FormInput, FormGroup, Button, NavLink } from "shards-react";

class LoginCreds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
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

  handleSubmit(event) {
    console.log(
      "Login details were submitted: \n" +
        "username: " +
        this.state.username +
        "\npassword: " +
        this.state.password
    );
    event.preventDefault();
    var unirest = require("unirest");

	var req = unirest("GET", "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login");



	req.query({
	  "username": this.state.username,
	  "password": this.state.password
	});

	req.headers({
	  "postman-token": "ee332d1a-4bc1-359c-2aad-c21d452e9bed",
	  "cache-control": "no-cache",
	  "content-type": "application/json",
	  "server-token": ""
	}


	req.end(function (res) {
	  if (res.error) throw new Error(res.error);

	  console.log(res.body);
	});



  }

  render() {
    return (
      <div class="w-50 mx-auto">
        <h1>Courier Tix</h1>
        <Form>
          <FormGroup>
            <label>Username</label>
            <FormInput
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <FormInput
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
          </FormGroup>
        </Form>
        <Button onClick={this.handleSubmit}>Login</Button>
        <NavLink>New user? Register here!</NavLink>
      </div>
    );
  }
}

export default LoginCreds;
