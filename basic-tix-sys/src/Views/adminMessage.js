import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Container } from "shards-react";
import adminHeaderBar from "../Components/adminHeaderBar";
import ContactUs from "../Components/contactUsForm";
import HeaderBar from "../Components/headerBar";
import MessagePage from "./messagePage";
import AIndMes from "./adminIndividualMessage";
import Chats from "./Chats";
import MyJobs from "./myJobs";
import Ahistory from "./historyAdmin";
import ProfileDisp from "./profileDisplaying";
import ProfileEdit from "./profileEditing";
import { Nav, NavItem, NavLink } from "shards-react";

class AdminMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.location.state
        }
      }
    render() {
      return (
        <Container>
          <Nav tabs>
            <NavItem>
              <NavLink href="/amessagepage/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/amessagepage/myjobs">My Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/amessagepage/chats">Chats</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/amessagepage/ahistory">History</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/amessagepage/main">Main</NavLink>
            </NavItem>
          </Nav>

          <Router>
              <Switch>
                  <Route path="/amessagepage/aindividualmessage" component={AIndMes} />
                  <Route path="/amessagepage/main" render={(props) => <MessagePage {...props} token={this.state.token}/>}/>
                  <Route path="/amessagepage/chats" render={(props) => <Chats {...props} token={this.state.token}/>}/>
                  <Route path="/amessagepage/ahistory" render={(props) => <Ahistory {...props} token={this.state.token}/>}/>
                  <Route path="/amessagepage/profileedit" render={(props) => <ProfileEdit {...props} token={this.state.token} />}/>
                  <Route path="/amessagepage/profiledisp" render={(props) => <ProfileDisp {...props} token={this.state.token} />}/>
                  <Route path="/amessagepage/myjobs" render={(props) => <MyJobs {...props} token={this.state.token}/>}/>
              </Switch>
          </Router>
        </Container>
      );
    }
  }
  
  export default AdminMessage;