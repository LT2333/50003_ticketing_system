import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  CardSubtitle,
  Button
} from "shards-react";
import { Badge } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import MessageBox from "../Components/messageBox";
import "./widgets.css";
// library.add(faIgloo);

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class MyJobs extends Component {
  constructor(props) {
    super(props);

    this.viewMessages = this.viewMessages.bind(this);
    this.state = {
    }
  }

  viewMessages(event) {}
  render() {
    return (
      <div>
          <Container>
            <Row>
              <Button className="buttons" onClick={this.viewMessages}>
                View Messages
              </Button></Row>
            <Row>
              <MessageBox messageInfo={this.state.messageInfo} />
            </Row>
          </Container>
      </div>
    );
  }
}

export default MyJobs;
