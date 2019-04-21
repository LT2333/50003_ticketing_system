import React, { Component } from "react";
import { Form, FormInput, FormGroup, Button, NavLink,
Modal,ModalBody,ModalHeader,Card,CardBody,CardFooter,CardHeader,CardTitle,CardImg } from "shards-react";
import "./signupPage.css";
import { Redirect,  Router } from "react-router-dom";

class LoginCreds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errormsg: "",
      canlogin: false,
      token: "",
      type: "",
      team: "",
      open: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
  }

  handleChoose(event) {
    let currentComponent = this;
    var unirest = require("unirest");

    var req = unirest("POST", "https://courier50003.herokuapp.com/user/team");

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      "team": event.target.id,
      "id": localStorage.getItem("token"),
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
      if (res.body.success === true) {
        currentComponent.setState({team: res.body.team});
      }
    });

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
        "useremail: " +
        this.state.email +
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
      email: this.state.email
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);

      if (res.body.success === true) {
        this.setState({ canlogin: true });
        this.setState({token: res.body.token});
        this.setState({type: res.body.authority});
        this.setState({team: res.body.team});

        localStorage.setItem("token", res.body.token);
        localStorage.setItem("authority", res.body.authority);

      } else {
        this.setState({ errormsg: res.body.message });
      }
      if (res.body.authority == "admin" && res.body.team == "") {
        this.setState({ open: true });
      }

      console.log("res.body: ", res.body);
    });
  }

  render() {
    if (this.state.canlogin && this.state.type === "admin" && this.state.team != "") {
      return (
        <Redirect to = {{
            pathname: '/amessagepage',
            state: this.state.token
        }}/> )
    }

    if (this.state.canlogin && this.state.type === "user") {
      return (
        <Redirect to = {{
            pathname: '/cmessagepage',
            state: this.state.token
        }}/> )
    }

    return (
      <div class="w-50 mx-auto">
        <h1 className="title">Courier Tix</h1>
        <Form>
          <FormGroup>
            <label>User Email</label>
            <FormInput
              placeholder="User email"
              name="email"
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
          Want to contact us without an acount? Click here!
        </NavLink>
        <Modal open={this.state.open} toggle={this.handleSubmit}>
          <ModalHeader>Admin choose your team</ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                <CardTitle>API DevOps</CardTitle>
                <Button onClick={this.handleChoose} id="API">Choose &rarr;</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Multilingual Chatbot</CardTitle>
                <Button onClick={this.handleChoose} id="Multilingual">Choose &rarr;</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>AI Translator</CardTitle>
                <Button onClick={this.handleChoose} id="AI">Choose &rarr;</Button>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <CardTitle>Digital Butler</CardTitle>
                <Button onClick={this.handleChoose} id="Digital">Choose &rarr;</Button>
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LoginCreds;
