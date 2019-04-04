import React, { Component } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse
} from "shards-react";

class adminHeaderBar extends Component {
  render() {
    return (
      <Navbar
        type="dark"
        theme="primary"
        expand="md"
        // className="justify-content-end"
      >
        <NavbarBrand href="#">Group Nine</NavbarBrand>
        <Nav navbar>
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

        <Nav navbar className="ml-auto">
          <InputGroup size="sm" seamless>
            <InputGroupAddon type="prepend" />
            <FormInput className="border-0" placeholder="Search..." />
          </InputGroup>
        </Nav>
      </Navbar>
    );
  }
}

export default adminHeaderBar;
