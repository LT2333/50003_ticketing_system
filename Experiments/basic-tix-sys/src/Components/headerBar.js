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

class HeaderBar extends Component {
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
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/signup">Sign Up</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contactus">Contact Us</NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink href="/messagepage">Message Box</NavLink>
          </NavItem> */}
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

export default HeaderBar;
