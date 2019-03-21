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
      canlogin: false
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

    // var unirest = require("unirest");

    // var req = unirest(
    //   "GET",
    //   "https://ug-api.acnapiv3.io/swivel/acnapi-common-services/common/login"
    // );

    // req.query({
    //   username: this.state.username,
    //   password: this.state.password
    // });

    // req.headers({
    //   "cache-control": "no-cache",
    //   "content-type": "application/json",
    //   "server-token":
    //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6Y3hRVEl5UkRVeU1qYzNSakEzTnpKQ01qVTROVVJFUlVZelF6VTRPRUV6T0RreE1UVTVPQSJ9.eyJpc3MiOiJodHRwczovL2FjbmFwaS1wcm9kLmF1dGgwLmNvbS8iLCJzdWIiOiJtcmlac1RrRFFTdXBDeG9HeDhiZEdocDRUMFFMZGJ6QUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wbGFjZWhvbGRlci5jb20vcGxhY2UiLCJpYXQiOjE1NDk5NTI3MjgsImV4cCI6MTU1MjU0NDcyOCwiYXpwIjoibXJpWnNUa0RRU3VwQ3hvR3g4YmRHaHA0VDBRTGRiekEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.z1jKmmePUGifu9NYNIfYQTKl4hAGEPlY4B7QXKSjn2mFgvIz6ncLGxqg4EMf9DmtDKYciA4ssUEeY4wRqJZL66XMJtRznhOoVUkZzEmVMK_5WuS8eoM59BFxO-vaqfgs00heNW9jiJmhl4DuVc5uBY-QTvqzBz-7ahdNgSE47dEje0djpoDfFAXo7F211HXGTC8YfR2zwf3eyhFVAyvRvNrMfDbUGnzlRESL-Qm9kWS55svGC6gAnz_0LURNDrM_ctqbiPGVrUBCajkzSOW33YF5oTJsnD5lqwaET5dqogyT6To5jp9e7Nu5Kf6aTNPRy4KGsVF2dFDr0lvExTj0Qg"
    // });

    // req.end(res => {
    //   //if (res.error) throw new Error(res.error);
    //   console.log(res);
    //   console.log(res.body);

    //   if (res.error == false) {
    //     this.setState({ canlogin: true });
    //   } else {
    //     this.setState({ errormsg: !res.body.success });
    //   }
    // });

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
      //if (res.error) throw new Error(res.error);
      console.log(res);
      console.log(res.body);

      if (res.body.success == true) {
        this.setState({ canlogin: true });
      } else {
        this.setState({ errormsg: res.body.message});
      }
    });
  }

  render() {
    if (this.state.canlogin) {
      return <Redirect push to="/messagepage" />;
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
          Want to contact us withou
t an acount? Click here!
        </NavLink>
      </div>
    );
  }
}

export default LoginCreds;
