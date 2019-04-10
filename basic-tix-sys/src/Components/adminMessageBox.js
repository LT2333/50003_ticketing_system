import React, { Component } from "react";
import { Badge } from "shards-react";
import { Container, Row, Col } from "shards-react";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import "../Views/widgets.css";
// library.add(faIgloo);
import { ListGroup, ListGroupItem } from "shards-react";

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes
var current = Date.now();

class AMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusColor: "red",
      statusWords: "Unsolved",
      takeWords: "Take it!"
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  changeStatus(event) {
    this.setState({ statusWords: "Processing" });
    this.setState({ statusColor: "warning" });
    this.setState({ takeWords: " Taken " });
  }

  handleFinish() {
    // this.setState({ this.props.messageInfo.status: "Resolved" });

    // add api here to send an update to status maybe?

    this.setState({ statusColor: "yellow" });
  }

  render() {
    console.log("messageInfo [messageBox]: ", this.props.messageInfo);
    return (
        <Link
          to={{
            pathname: "/amessagepage/aindividualmessage" ,
            messageInfo: this.props.messageInfo,
            token: this.props.token
          }}
        >
          <ListGroupItem className="MessageBox">
            <Container>
              <Row>
                <Col>{this.props.messageInfo.category}</Col>
                <Col>{this.props.messageInfo.username}</Col>
                <Col>{this.props.messageInfo.date}</Col>
                <Col>{this.props.messageInfo.category}</Col>
                <Col>{this.props.messageInfo.status}</Col>
              </Row>
            </Container>
          </ListGroupItem>
        </Link>
    );
  }
}

export default AMessageBox;