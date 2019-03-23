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

class clientHeaderBar extends Component {
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
            <NavLink href="/contactus">Contact Us</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/myreq">My Request</NavLink>
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

export default clientHeaderBar;
