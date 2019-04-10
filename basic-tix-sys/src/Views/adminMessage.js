import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Button, Container } from "shards-react";
import adminHeaderBar from "../Components/adminHeaderBar";
import ContactUs from "../Components/contactUsForm";
import HeaderBar from "../Components/headerBar";
import AMessagePage from "./aMessagePage";
import AIndMes from "./adminIndividualMessage";
import Chats from "./Chats";
import MyJobs from "./myJobs";
import Ahistory from "./historyAdmin";
import ProfileDisp from "./profileDisplaying";
import ProfileEdit from "./profileEditing";
import { Nav, NavItem, NavLink } from "shards-react";
//
class AdminMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: this.props.location.state
    };
    this.handleBug = this.handleBug.bind(this);
  }
  handleBug(event) {
    console.log(
      "token from redirect [clientMessage]: ",
      this.state.token,
      " props from redirect: ",
      this.props.location
    );
  }
  render() {
    return (
      <Container>
        {/* <Button onClick={this.handleBug}>Debugger</Button> */}
        {/* <Nav tabs>
            <NavItem>
              <NavLink href="/amessagepage/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/amessagepage/myjobs">My Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/amessagepage/ahistory">History</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/amessagepage/main">Main</NavLink>
            </NavItem>
          </Nav> */}

        <Router>
          <Switch>
            <Route
              path="/amessagepage/aindividualmessage"
              component={AIndMes}
            />
            <Route
              path="/amessagepage/"
              render={routeProps => (
                <AMessagePage {...routeProps} token={this.state.token} />
              )}
            />
            <Route
              path="/amessagepage/ahistory"
              render={routeProps => (
                <Ahistory {...routeProps} token={this.state.token} />
              )}
            />
            <Route
              path="/amessagepage/profileedit"
              render={routeProps => (
                <ProfileEdit {...routeProps} token={this.state.token} />
              )}
            />
            <Route
              path="/amessagepage/profiledisp"
              render={routeProps => (
                <ProfileDisp {...routeProps} token={this.state.token} />
              )}
            />
            <Route
              path="/amessagepage/myjobs"
              render={routeProps => (
                <MyJobs {...routeProps} token={this.state.token} />
              )}
            />
            <Route path="/amessagepage/chats" component={Chats} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default AdminMessage;
