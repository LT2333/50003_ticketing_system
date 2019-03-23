import React, { Component } from "react";
import { Form, FormInput, FormGroup, Button, NavLink } from "shards-react";
import "./signupPage.css";
import { Redirect } from "react-router-dom";

class LoginCreds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errormsg: "",
      canlogin: false,
      token: "",
      type: ""
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

    var req = unirest("POST", "https://courier50003.herokuapp.com/user/login");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      password: this.state.password,
      email: this.state.username
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);

      if (res.body.success === true) {
        this.setState({ canlogin: true });
        this.setState({token: res.body.token});
        this.setState({type: res.body.type});
      } else {
        this.setState({ errormsg: res.body.message });
      }
      console.log(res);
      console.log(res.body);
    });
  }

  render() {
    if (this.state.canlogin && this.state.type == "admin") {
      return <Redirect push to={{
        pathname: "/amessagepage",
        token: this.state.token
      }}/>;

    if (this.state.canlogin && this.state.type == "client") {
      return <Redirect push to={{
        pathname: "/cmessagepage",
        token: this.state.token
      }}/>;
    }

    return (
      <div class="w-50 mx-auto">
        <h1 className="title">Courier Tix</h1>
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
          <FormGroup>
            <label className="errormsg">{this.state.errormsg}</label>
          </FormGroup>
        </Form>
        <Button onClick={this.handleSubmit}>Login</Button>
        <NavLink active href="/signup">
          New user? Register here!
        </NavLink>
        <NavLink active href="/contactus">
          Want to contact us withou t an acount? Click here!
        </NavLink>
      </div>
    );
  }
}

export default LoginCreds;
