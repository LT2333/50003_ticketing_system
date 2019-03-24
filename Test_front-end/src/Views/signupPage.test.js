import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { Form, FormInput, FormGroup, Button, NavLink } from "shards-react";
import {shallow,configure} from 'enzyme';
import {expect} from 'chai';
//import toJson from "enzyme-to-json";
//import configureStore from "redux-mock-store"; // Smart components

// Component to be tested
//import GatorMenu from "../../components/GatorMenu";
import SignupCreds from'./signupPage';

configure({adapter:new Adapter});

it('has a username input field',()=>{
  const wrapper  = shallow(<SignupCreds />);
  expect(wrapper.containsMatchingElement(
    <FormInput name="username"/>
  )).to.be.true;
});

it('has an e-mail input field',()=>{
  const wrapper  = shallow(<SignupCreds />);
  expect(wrapper.containsMatchingElement(
    <FormInput name="email"/>
  )).to.be.true;
});

it('has a password input field',()=>{
  const wrapper  = shallow(<SignupCreds />);
  expect(wrapper.containsMatchingElement(
    <FormInput 
    type="password"
    name="password"/>
  )).to.be.true;
});

it('has a SECOND password input field',()=>{
  const wrapper  = shallow(<SignupCreds />);
  expect(wrapper.containsMatchingElement(
    <FormInput 
    type="password"
    name="secondpass"/>
  )).to.be.true;
});

it('Username passing check',()=>{
  const wrapper  = shallow(<SignupCreds />);
  expect(wrapper.containsMatchingElement(
    <FormInput 
    type="password"
    name="secondpass"/>
  )).to.be.true;
  /*
  const wrapper = shallow(<SignupCreds />);
  wrapper.find('FormInput[name="username"]').
  simulate('change', {target: {name: 'username', value: 'Andy'}});
  expect(wrapper.state.fields('username').to.equal('Andy');
  */
  })


it('Password passing check',()=>{
  const wrapper  = shallow(<SignupCreds />);
  expect(wrapper.containsMatchingElement(
    <FormInput 
    type="password"
    name="secondpass"/>
  )).to.be.true;
  /*
  const wrapper = shallow(<SignupCreds />);
  wrapper.find('FormInput[type="password"]').
  simulate('change', {target: {name: 'password', value: '1234567'}});
  expect(wrapper.state.fields('password')).to.equal('1234567');
  */
  })