import React from "react";
import { Button, ButtonGroup } from "shards-react";
import { shallow, mount } from "enzyme";
import AMessagePage from "./aMessagePage";

describe("Rendering Admin's MessagePage", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<AMessagePage />);
  });

  it("component rendered correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("all elements are there", () => {
  it("check sidebar for filters is there", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<ButtonGroup className="SideBar" />))
      .toBeTruthy;
  });
});

describe("Client sidebar filters has 7 in total", () => {
  it("Sort by status", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewstatus" />))
      .toBeTruthy;
  });
  it("Sort by who", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewwho" />)).toBeTruthy;
  });
  it("Sort by date", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewdate" />))
      .toBeTruthy;
  });
  it("Sort by category", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewcategory" />))
      .toBeTruthy;
  });
  it("Sort by priority", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="viewpriority" />))
      .toBeTruthy;
  });
  it("All my jobs", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="adminview" />))
      .toBeTruthy;
  });
  it("my jobs sorted by status", () => {
    const wrapper = shallow(<AMessagePage />);
    expect(wrapper.containsMatchingElement(<Button id="adminviewstatus" />))
      .toBeTruthy;
  });
});
