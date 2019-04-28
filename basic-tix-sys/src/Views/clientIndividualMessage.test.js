import React from "react";
import { shallow, mount } from "enzyme";
import CIndMes from "./clientIndividualMessage";

describe("Rendering clientIndMes", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<CIndMes />);
  });

  test("whole view rendered correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
