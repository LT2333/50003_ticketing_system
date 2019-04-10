import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button, Container } from "shards-react";
import clientHeaderBar from "../Components/clientHeaderBar";
import IdContactUs from "../Components/idContactUsForm";
import CMessagePage from "./cMessagePage";
import CIndMes from "./clientIndividualMessage";
import MyReqs from "./myReqs";
import Chats from "./Chats";
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
      console.log("token from redirect [clientMessage]: ", this.state.token,
    " props from redirect: ", this.props.location)
    }
    render() {
      return (
        <Container>
          {/* <Button onClick={this.handleBug}>Debugger</Button> */}
          <Nav tabs>
            <NavItem>
              <NavLink href="/cmessagepage/contactus">Contact Us</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="/cmessagepage/myreqs">My Request</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="/cmessagepage/">Main</NavLink>
            </NavItem>
          </Nav>

          <Router>
              <Switch>
                <Route path="/cmessagepage/contactus" component={IdContactUs}/>
                <Route path="/cmessagepage/chats" component={Chats} />
                <Route path="/cmessagepage/cindividualmessage" component={CIndMes} />
                {/* <Route path="/cmessagepage/chats" component={Chats} /> */}
                <Route path="/cmessagepage/" render={(routeProps) => <CMessagePage {...routeProps} token={this.state.token}/>}/>
                {/* <Route path="/cmessagepage/myreqs" render={(routeProps) => <MyReqs {...routeProps} token={this.state.token}/>}/> */}
              </Switch>
          </Router>
        </Container> 
      );
    }
  }
  
  export default ClientMessage;