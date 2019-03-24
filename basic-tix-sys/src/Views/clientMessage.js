import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Container } from "shards-react";
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
      }
    render() {
      return (
        <Container>
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
                <Route path="/cmessagepage/main" component={MessagePage} render={(props) => <MessagePage {...props} token={this.state.token}/>}/>
                <Route path="/cmessagepage/myreqs" component={MyReqs} render={(props) => <MyReqs {...props} token={this.state.token}/>}/>
              </Switch>
          </Router>
        </Container> 
      );
    }
  }
  
  export default ClientMessage;