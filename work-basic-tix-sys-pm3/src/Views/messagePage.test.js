import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import MessagePage from "./messagePage";
import MessageBox from "../Components/chatMessages";
import IndMes from "./individualMessage";

describe("tests for the rendering of message page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<MessagePage />);
  });

  test("render correctly all components", () => {
    const msgp = renderer.create(<MessagePage />).toJSON();
    expect(msgp).toMatchSnapshot();
  });
});
