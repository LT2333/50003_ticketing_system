import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Select from "react-select";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  FormTextarea,
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import {shallow,configure} from 'enzyme';
import {expect} from 'chai';
import ContactUs from './contactUsForm';

configure({adapter:new Adapter});

describe('<ContactUs>',()=>{

    it('has a name input field check',()=>{
        const wrapper  = shallow(<ContactUs />);
        expect(wrapper.containsMatchingElement(
        <FormInput name="name"/>
        )).to.be.true;
    });

    it('has a email input field check',()=>{
        const wrapper  = shallow(<ContactUs />);
        expect(wrapper.containsMatchingElement(
        <FormInput name="email"/>
        )).to.be.true;
    });

    it('has a contact number input field check ',()=>{
        const wrapper  = shallow(<ContactUs />);
        expect(wrapper.containsMatchingElement(
        <FormInput name="contactnum"/>
        )).to.be.true;
    });

    it('has a problem input field',()=>{
        const wrapper  = shallow(<ContactUs />);
        expect(wrapper.containsMatchingElement(
        <FormTextarea name="problem"/>
        )).to.be.true;
    });

    it('Name passing check',()=>{
        const wrapper = shallow(<ContactUs />);
        wrapper.find('FormInput[name="name"]').
        simulate('change', {target: {name: 'name', value: 'Glenn'}});
        expect(wrapper.state('name')).to.equal('Glenn');
        })
    
    it('Password passing check',()=>{
        const wrapper = shallow(<ContactUs />);
        wrapper.find('FormInput[name="email"]').
        simulate('change', {target: {name: 'email', value: 'glenn@sutd.com'}});
        expect(wrapper.state('email')).to.equal('glenn@sutd.com');
    })

    it('Contact number passing check',()=>{
        const wrapper = shallow(<ContactUs />);
        wrapper.find('FormInput[name="contactnum"]').
        simulate('change', {target: {name: 'contactnum', value: '89992222'}});
        expect(wrapper.state('contactnum')).to.equal('89992222');
    })

    it('Problem input field passing',()=>{
        const wrapper  = shallow(<ContactUs />);
        wrapper.find('FormTextarea[name="problem"]').
        simulate('change', {target: {name: 'problem', value: "Accenture has been a great help and I am very glad for SUTD student's ..."}});
        expect(wrapper.state('problem')).to.equal("Accenture has been a great help and I am very glad for SUTD student's ...");
    });

    it('Option passing check',()=>{
        const wrapper = shallow(<ContactUs />);
        wrapper.find('FormInput[name="name"]').
        simulate('change', {target: {name: 'name', value: 'Glenn'}});
        wrapper.find('FormInput[name="email"]').
        simulate('change', {target: {name: 'email', value: 'glenn@sutd.com'}});
        wrapper.find('FormInput[name="contactnum"]').
        simulate('change', {target: {name: 'contactnum', value: '89992222'}});
        wrapper.find('FormTextarea[name="problem"]').
        simulate('change', {target: {name: 'problem', value: "Accenture has been a great help and I am very glad for SUTD student's ..."}});
        wrapper.find('Button').simulate('click');

    })

    /*
    it('Option passing check',()=>{
        const wrapper = shallow(<ContactUs />);
        wrapper.find('FormInput[name="name"]').
        simulate('change', {target: {name: 'name', value: 'Glenn'}});
        wrapper.find('FormInput[name="email"]').
        simulate('change', {target: {name: 'email', value: 'glenn@sutd.com'}});
        wrapper.find('FormInput[name="contactnum"]').
        simulate('change', {target: {name: 'contactnum', value: '89992222'}});
        wrapper.find('FormTextarea[name="problem"]').
        simulate('change', {target: {name: 'problem', value: "Accenture has been a great help and I am very glad for SUTD student's ..."}});
        wrapper.find('Select').simulate('change');

        wrapper.find('Select').
        simulate('change', {target: {name: 'topics', value: {label: "Ticketing Platform", value: 19}}
            });
    })
    */




})