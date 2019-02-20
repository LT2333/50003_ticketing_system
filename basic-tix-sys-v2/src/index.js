import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import SignupCreds from "./components/signupPage";
// import LoginCreds from "./components/loginPage";
// import Homepage from "./components/homePage";
// import ContactUs from "./components/contactUsForm";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<SignupCreds />, document.getElementById('root'));
// ReactDOM.render(<LoginCreds />, document.getElementById('root'));
// ReactDOM.render(<Homepage />, document.getElementById('root'));
// ReactDOM.render(<ContactUs />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
