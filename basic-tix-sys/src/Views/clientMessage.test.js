import React from "react";
import { NavbarBrand, Nav, NavLink, FormInput } from "shards-react";
import { shallow, mount } from "enzyme";
import ClientMessage from "./ClientMessage";

describe("Rendering ClientMessage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<ClientMessage />);
  });

  it("component rendered correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("all elements are there", () => {
  it("check contact us tab is there", () => {
    const wrapper = shallow(<ClientMessage />);
    expect(
      wrapper.containsMatchingElement(
        <NavLink href="/cmessagepage/contactus">Contact Us</NavLink>
      )
    ).toBeTruthy;
  });
  it("check main tab is there", () => {
    const wrapper = shallow(<ClientMessage />);
    expect(
      wrapper.containsMatchingElement(
        <NavLink href="/cmessagepage/">Main</NavLink>
      )
    ).toBeTruthy;
  });

  it("check actual bar there", () => {
    const wrapper = shallow(<ClientMessage />);
    expect(wrapper.containsMatchingElement(<Nav navbar />)).toBeTruthy;
  });
});

// describe("can click the tabs", () => {
//   const clickFn = jest.fn();

//   it("click contact us tab", () => {
//     const wrapper = shallow(<ClientMessage onClick={clickFn} />);
//     wrapper.find(<NavLink href="/cmessagepage/contactus" />).simulate("click");
//     expect(clickFn).toHaveBeenCalled();
//   });
// });
