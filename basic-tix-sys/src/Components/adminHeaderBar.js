import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "shards-react";

class adminHeaderBar extends Component {
  render() {
    return (
        <Nav pills>
          <NavItem>
            <NavLink href="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/myjobs">My Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/chats">Chats</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/ahistory">History</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/main">Main</NavLink>
          </NavItem>
        </Nav>
    );
  }
}

export default adminHeaderBar;
