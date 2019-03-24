import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ChatInput from "../Components/chatInput";
import ChatMessages from "../Components/chatMessages";
import Chats from "./Chats";
import { prependOnceListener } from "cluster";

describe("tests for Chats view", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<Chats />);
  });

  //check render component is without error
  test("render correctly Chats component", () => {
    const chat = renderer.create(<Chats />).toJSON();
    expect(chat).toMatchSnapshot();
  });

  // check that the title "Chats" is there
  test("check chat title is h1", () => {
    expect(wrapper().find("Chats").length).toBe(1);
  });

  //check that there is a refresh button
  test("refresh button there", () => {
    expect(wrapper().find(<Button>Refresh</Button>).length).toBe(1);
  });

  //check that there is a input group button
  test("input group there", () => {
    expect(wrapper().find(<ChatInput />).length).toBe(1);
  });
});

describe("tests for chatInput", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<ChatInput />);
  });

  let testinput = "hello from the jest testing sequence";

  test("chat message inputted", () => {
    expect(wrapper(testinput).state("chatInput")).toEqual(
      "hello from the jest testing sequence"
    );
  });

  test("send button updates", () => {
    const mockFn = jest.fn(() => Promise.resolve());
    testinput = mockFn;
    const component = wrapper().setState({
      chatInput: "hello from the other side"
    });
    component.find(<Button>Send</Button>).simulate("click");

    expect(mockFn).toHaveBeenCalledWith({
      chatInput: "hello from the other side"
    });
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

describe("tests for ChatMessages", () => {
  test("messages rendered in row", () => {
    const props = [
      {
        name: "user",
        message: "hello i need help"
      },
      {
        name: "admin",
        message: "whats the problem you are facing?"
      },
      {
        name: "user",
        message: "I cannot make a POST request on the API"
      }
    ];

    const component = shallow(<ChatMessages />);
    expect(toJson(component).toMatchSnapshot);
  });
});
