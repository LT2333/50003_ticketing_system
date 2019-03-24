import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "shards-react";

class clientHeaderBar extends Component {
  render() {
    return (
      <Nav pills>
        <NavItem>
          <NavLink href="/contactus">Contact Us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/myreqs">My Request</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/main">Main</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default clientHeaderBar;
