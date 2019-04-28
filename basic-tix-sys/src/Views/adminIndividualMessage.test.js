import React from "react";
import { shallow, mount } from "enzyme";
import AIndMes from "./adminIndividualMessage";

describe("Rendering adminIndMes", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = () => shallow(<AIndMes />);
  });

  test("whole view rendered correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

// describe("all elements are there", () => {
//   it("card with request info is there", () => {
//     const wrapper = shallow(<AIndMes />);
//     expect(wrapper.containsMatchingElement(<Card className="IndCard" />))
//       .toBeTruthy;
//   });
// });
