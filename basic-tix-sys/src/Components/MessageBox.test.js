import React from "react";
import { NavbarBrand, Nav, NavLink, FormInput } from "shards-react";
import { shallow, mount } from "enzyme";
import adminMessageBox from "./adminMessageBox";
import clientMessageBox from "./clientMessageBox";

describe("Rendering all MessageBoxes", () => {
  let wrapperAd, wrapperCl;
  beforeEach(() => {
    wrapperAd = () => shallow(<adminMessageBox />);
    wrapperCl = () => shallow(<clientMessageBox />);
  });

  it("both components rendered correctly", () => {
    expect(wrapperAd).toMatchSnapshot();
    expect(wrapperCl).toMatchSnapshot();
  });
});

//this is slightly problematic, need to tidy up
