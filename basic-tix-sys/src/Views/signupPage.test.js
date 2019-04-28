import React from "react";
import { Form, FormInput, FormGroup, Button, NavLink } from "shards-react";
import { shallow, configure } from "enzyme";
//import { expect } from "chai";
//import toJson from "enzyme-to-json";
//import configureStore from "redux-mock-store"; // Smart components

// Component to be tested
//import GatorMenu from "../../components/GatorMenu";
import SignupCreds from "./signupPage";

describe("<SignupCreds>", () => {
  it("has a username input field", () => {
    const wrapper = shallow(<SignupCreds />);
    expect(wrapper.containsMatchingElement(<FormInput name="username" />))
      .toBeTruthy;
  });

  it("has an e-mail input field", () => {
    const wrapper = shallow(<SignupCreds />);
    expect(wrapper.containsMatchingElement(<FormInput name="email" />))
      .toBeTruthy;
  });

  it("has a password input field", () => {
    const wrapper = shallow(<SignupCreds />);
    expect(
      wrapper.containsMatchingElement(
        <FormInput type="password" name="password" />
      )
    ).toBeTruthy;
  });

  it("has a SECOND password input field", () => {
    const wrapper = shallow(<SignupCreds />);
    expect(
      wrapper.containsMatchingElement(
        <FormInput type="password" name="secondpass" />
      )
    ).toBeTruthy;
  });

  /*
    it('Username passing check',()=>{
      
      const wrapper = shallow(<SignupCreds />);
      wrapper.find('FormInput[name="username"]').
      simulate('change', {target: {name: 'username', value: 'Andy'}});
      expect(wrapper.state.fields('username').to.equal('Andy');
      
      })
    it('Password passing check',()=>{
      const wrapper = shallow(<SignupCreds />);
      wrapper.find('FormInput[type="password"]').
      simulate('change', {target: {name: 'password', value: '1234567'}});
      expect(wrapper.state.fields('password')).to.equal('1234567');
      
      })*/
});
