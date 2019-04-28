import React from "react";
import { Form, FormInput, FormGroup, Button, NavLink } from "shards-react";
import { shallow, configure } from "enzyme";
import LoginCreds from "./loginPage";

describe("<loginPage>", () => {
  it("has a username input field", () => {
    const wrapper = shallow(<LoginCreds />);
    expect(wrapper.containsMatchingElement(<FormInput name="username" />))
      .toBeTruthy;
  });

  it("has a password input field", () => {
    const wrapper = shallow(<LoginCreds />);
    expect(
      wrapper.containsMatchingElement(
        <FormInput type="password" name="password" />
      )
    ).toBeTruthy;
  });

  // it("Username passing check", () => {
  //   const wrapper = shallow(<LoginCreds />);
  //   wrapper
  //     .find('FormInput[name="username"]')
  //     .simulate("change", { target: { name: "username", value: "Andy" } });
  //   expect(wrapper.state("username")).toBe("Andy");
  // });

  it("Password passing check", () => {
    const wrapper = shallow(<LoginCreds />);
    wrapper
      .find('FormInput[type="password"]')
      .simulate("change", { target: { name: "password", value: "1234567" } });
    expect(wrapper.state("password")).toBe("1234567");
  });

  // it("Login with user information check", () => {
  //   const wrapper = shallow(<LoginCreds />);
  //   wrapper
  //     .find('FormInput[name="username"]')
  //     .simulate("change", { target: { name: "username", value: "Andy" } });
  //   wrapper
  //     .find('FormInput[type="password"]')
  //     .simulate("change", { target: { name: "password", value: "1234567" } });
  //   wrapper.find("Button").simulate("click");
  // });

  /*
  it('passes correct login information',()=>{
    const username = 'Andy';
    const password = '12345';
    const wrapper  = shallow(<LoginCreds handleSubmit={ state =>{
      expect(state.username).to.be.equal(username);
      expect(state.password).to.be.equal(password);
    }}/>);
    wrapper.setState({username:'Andy',password : '12345'});
    wrapper.find('button').simulate('click');
    
  });
  */
});
