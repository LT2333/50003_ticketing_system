import React from "react";
import { Redirect } from "react-router-dom";

import SignupCreds from "./Components/signupPage";
import LoginCreds from "./Components/loginPage";
import Homepage from "./Components/mainDashboard";
import ContactUs from "./Components/contactUsForm";

export default [
  {
    path: "/",
    exact: true,

    component: () => <Redirect to="/loginPage" />
  },
  {
    path: "/loginPage",

    component: LoginCreds
  },
  {
    path: "/signupPage",

    component: SignupCreds
  },
  {
    path: "/contactUsForm",

    component: ContactUs
  }
];
