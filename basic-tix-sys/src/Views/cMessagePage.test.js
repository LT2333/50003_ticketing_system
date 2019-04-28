import React from "react";
import { ButtonGroup, Button } from "shards-react";
import { shallow, mount } from "enzyme";
import CMessagePage from "./cMessagePage";

describe("Rendering Client's MessagePage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<CMessagePage />);
  });

  it("component rendered correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("all elements are there", () => {
  it("check chatbot popup is there", () => {
    const wrapper = shallow(<CMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="popover-1" />))
      .toBeTruthy;
  });
  it("check sidebar for filters is there", () => {
    const wrapper = shallow(<CMessagePage />);
    expect(wrapper.containsMatchingElement(<ButtonGroup className="SideBar" />))
      .toBeTruthy;
  });
});

describe("Client sidebar filters has 5 in total", () => {
  it("Sort by status", () => {
    const wrapper = shallow(<CMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewstatus" />))
      .toBeTruthy;
  });
  it("Sort by who", () => {
    const wrapper = shallow(<CMessagePage />);
    expect(wrapper.containsMatchingElement(<ButtonGroup id="viewwho" />))
      .toBeTruthy;
  });
  it("Sort by date", () => {
    const wrapper = shallow(<CMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewdate" />))
      .toBeTruthy;
  });
  it("Sort by category", () => {
    const wrapper = shallow(<CMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewcategory" />))
      .toBeTruthy;
  });
  it("Sort by priority", () => {
    const wrapper = shallow(<CMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewpriority" />))
      .toBeTruthy;
  });
});
