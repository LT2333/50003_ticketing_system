import React, { Component } from "react";
import { Form, FormInput, FormGroup, Container, Button } from "shards-react";
import "./signupPage.css";
import { Redirect } from "react-router-dom";

class SignupCreds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},

      errormsg: "",
      cansignup: false,

      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event) {
    let fields = this.state.fields;
    fields[event.target.name] = event.target.value;
    this.setState({
      fields
    });
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // if (typeof fields["username"] == "undefined") {
    //   formIsValid = false;
    // }

    // if (typeof fields["password"] == "undefined") {
    //   formIsValid = false;
    // }

    // if (typeof fields["secondpass"] == "undefined") {
    //   formIsValid = false;
    // }
    // if (typeof fields["email"] == "undefined") {
    //   formIsValid = false;
    // }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "Please enter secure and strong password.";

        // At least 8 chars
        // Contains at least one digit
        // Contains at least one lower alpha char and one upper alpha char
        // Contains at least one char within a set of special chars (@#%$^ etc.)
      }

      if (!fields["secondpass"]) {
        formIsValid = false;
        errors["secondpass"] = "Please re-enter your password.";
      }

      if (typeof fields["secondpass"] !== "undefined") {
        if (!fields["secondpass"].match(fields["password"])) {
          formIsValid = false;
          errors["secondpass"] = "Password does not match.";
        }
      }

      this.setState({
        errors: errors
      });

      if (typeof errors.password == "undefined") {
        if (typeof errors.secondpass !== "undefined") {
          this.setState({
            errormsg: errors.secondpass
          });
        }
      } else {
        this.setState({
          errormsg: errors.password
        });
      }

      return formIsValid;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("is this even clicked");

    if (this.validateForm()) {
      console.log("at least this is executed");
      var unirest = require("unirest");

      var req = unirest(
        "POST",
        "https://courier50003.herokuapp.com/user/signup"
      );

      req.headers({
        "cache-control": "no-cache",
        "content-type": "application/json"
      });

      req.type("json");
      req.send({
        username: this.state.fields.username,
        password: this.state.fields.password,
        email: this.state.fields.email,
        contact_num: 1234
      });

      req.end(res => {
        console.log(res);
        console.log(res.body);

        if (res.body.success == true) {
          this.setState({ cansignup: true });
        } else {
          this.setState({ errormsg: res.body.message });
        }
      });
    } else {
      this.setState({ errormsg: "please fill in all blanks!" });
      this.validateForm();
    }

    console.log(
      "New signup: \n" +
        "username: " +
        this.state.fields.username +
        "\nemail: " +
        this.state.fields.email +
        "\npassword: " +
        this.state.fields.password +
        "\nre-entered password:" +
        this.state.fields.secondpass
    );
    console.log();
  }

  render() {
    if (this.state.cansignup) {
      return <Redirect pusht to="/login" />;
    }
    return (
      <div class="w-50 mx-auto">
        <h1 className="title">Signup</h1>
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
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label className="errormsg">{this.state.errormsg}</label>
          </FormGroup>
        </Form>
        <Button onClick={this.handleSubmit}>Register</Button>
      </div>
    );
  }
}

export default SignupCreds;
