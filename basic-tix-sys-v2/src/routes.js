import React from "react";
import { Redirect } from "react-router-dom";

import SignupCreds from "./components/signupPage";
import LoginCreds from "./components/loginPage";
import Homepage from "./components/mainDashboard";
import ContactUs from "./components/contactUsForm";

export default [
  {
    path: "/",
    exact: true,

    component: () => <\Redirect to="./components/loginPagee" />
  },
  {
    path: "./components/loginPage",

    component: LoginCreds
  },
  {
    path: "./components/signupPage",

    component: SignupCreds
  },
  {
    path: "./components/contactUsForm",

    component: ContactUs
  }
];
