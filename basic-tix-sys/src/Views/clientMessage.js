import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button, Container } from "shards-react";
import clientHeaderBar from "../Components/clientHeaderBar";
import ContactUs from "../Components/contactUsForm";
import MessagePage from "./messagePage";
import IndMes from "./individualMessage";
import MyReqs from "./myReqs";
import { Nav, NavItem, NavLink } from "shards-react";

class ClientMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.location.state
        }
        this.handleBug = this.handleBug.bind(this);
      }
    handleBug(event) {
      console.log("token from redirect: ", this.state.token,
    " props from redirect: ", this.props.location)
    }
    render() {
      return (
        <Container>
          {/* <Button onClick={this.handleBug}>Dubugger</Button> */}

          <Nav pills>
            <NavItem>
              <NavLink href="/cmessagepage/contactus">Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/cmessagepage/myreqs">My Request</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/cmessagepage/main">Main</NavLink>
            </NavItem>
          </Nav>

          <Router>
              <Switch>
                <Route path="/cmessagepage/contactus" component={ContactUs}/>
                <Route path="/cmessagepage/individualmessage" component={IndMes} />
                <Route path="/cmessagepage/main" render={(routeProps) => <MessagePage {...routeProps} token={this.state.token}/>}/>
                <Route path="/cmessagepage/myreqs" render={(routeProps) => <MyReqs {...routeProps} token={this.state.token}/>}/>
              </Switch>
          </Router>
        </Container> 
      );
    }
  }
  
  export default ClientMessage;