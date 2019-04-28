import React from "react";
import { NavbarBrand, Nav, NavLink, FormInput } from "shards-react";
import { shallow, mount } from "enzyme";
import HeaderBar from "./headerBar";

describe("Rendering HeaderBar", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<HeaderBar />);
  });

  it("component rendered correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("all elements are there", () => {
  it("check title (Group Nine) is there", () => {
    const wrapper = shallow(<HeaderBar />);
    expect(
      wrapper.containsMatchingElement(
        <NavbarBrand href="#">Group Nine</NavbarBrand>
      )
    ).toBeTruthy;
  });

  it("check actual bar there", () => {
    const wrapper = shallow(<HeaderBar />);
    expect(wrapper.containsMatchingElement(<Nav navbar />)).toBeTruthy;
  });

  it("check login link is there", () => {
    const wrapper = shallow(<HeaderBar />);
    expect(
      wrapper.containsMatchingElement(<NavLink href="/login">Login</NavLink>)
    ).toBeTruthy;
  });

  it("check signup link is there", () => {
    const wrapper = shallow(<HeaderBar />);
    expect(
      wrapper.containsMatchingElement(<NavLink href="/signup">Sign Up</NavLink>)
    ).toBeTruthy;
  });

  it("check contact us form link is there", () => {
    const wrapper = shallow(<HeaderBar />);
    expect(
      wrapper.containsMatchingElement(
        <NavLink href="/contactus">Contact Us</NavLink>
      )
    ).toBeTruthy;
  });

  it("check search bar is there", () => {
    const wrapper = shallow(<HeaderBar />);
    expect(
      wrapper.containsMatchingElement(
        <FormInput className="border-0" placeholder="Search..." />
      )
    ).toBeTruthy;
  });
});
