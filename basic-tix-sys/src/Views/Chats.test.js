import React from "react";
import { shallow, mount } from "enzyme";
import Chats from "./Chats";

describe("Rendering Chats", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<Chats />);
  });

  //check render component is without error
  test("render correctly Chats component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // check that the title "Chat" is there
  test("check chat title is there", () => {
    expect(wrapper().find('[className="title"]').length).toBe(1);
  });

  //check that there is a input group button
  test("input group there", () => {
    expect(wrapper().find('[className="chatInputGroup"]').length).toBe(1);
  });
});

describe("testing different chat inputs", () => {
  let component;
  beforeEach(() => {
    component = mount(<Chats />);
  });

  afterEach(() => {
    component.unmount();
  });

  test("chat message inputted see change in state 1", () => {
    let testinput = "hello from the jest testing sequence";
    component
      .find('FormInput[name="chatInput"]')
      .simulate("change", { target: { name: "chatInput", value: testinput } });

    expect(component.state("chatInput")).toEqual(
      "hello from the jest testing sequence"
    );
  });

  test("chat message inputted see change in state 2", () => {
    component
      .find('FormInput[name="chatInput"]')
      .simulate("change", { target: { name: "chatInput", value: "12345678" } });

    expect(component.state("chatInput")).toEqual("12345678");
  });

  test("chat message inputted see change in state 3", () => {
    component.find('FormInput[name="chatInput"]').simulate("change", {
      target: {
        name: "chatInput",
        value: "fuzzing 1i3eueyu3 edidifoqajdvgaqenojv"
      }
    });

    expect(component.state("chatInput")).toEqual(
      "fuzzing 1i3eueyu3 edidifoqajdvgaqenojv"
    );
  });

  // test("send button can be clicked", () => {
  //   const clickFn = jest.fn();
  //   component = mount(<Chats onClick={clickFn} />);
  //   component.find("button#chatinputsendbutton").simulate("click");
  //   expect(clickFn).toHaveBeenCalled();
  // });
});

// describe("tests for ChatMessages", () => {
//   test("messages rendered in row", () => {
//     const props = [
//       {
//         name: "user",
//         message: "hello i need help"
//       },
//       {
//         name: "admin",
//         message: "whats the problem you are facing?"
//       },
//       {
//         name: "user",
//         message: "I cannot make a POST request on the API"
//       }
//     ];

//     const component = shallow(<ChatMessages />);
//     expect(toJson(component).toMatchSnapshot);
//   });
// });
