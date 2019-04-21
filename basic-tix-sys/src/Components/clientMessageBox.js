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

class CMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusColor: "red",
      statusWords: "Unsolved",
      takeWords: "Take it!",
      priority: "Normal",
      color: ""
    };

    this.changeStatus = this.changeStatus.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    localStorage.setItem("id", this.props.messageInfo._id);
  }
  componentDidMount() {
    console.log("type of date", typeof this.props.messageInfo.date);
    // console.log(Math.abs(date1.getTime() - this.props.messageInfo.date.getTime()));
    // this.setState( {timeDiff: Math.abs(date1.getTime() - this.props.messageInfo.date.getTime())});
    if (this.props.messageInfo.priority < 0) {
      this.setState({ priority: "High" });
    }
    if (this.props.messageInfo.priority > 5) {
      this.setState({ priority: "Low" });
    }
    if (this.props.messageInfo.status === "unaddressed") {
      this.setState({ color: "danger" });
    }
    if (this.props.messageInfo.status === "finished") {
      this.setState({ color: "success" });
    }
    if (this.props.messageInfo.status === "addressing") {
      this.setState({ color: "warning" });
    }
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
          pathname: "/cmessagepage/cindividualmessage",
          messageInfo: this.props.messageInfo,
          token: this.props.token
        }}
        onClick={this.handleClick}
      >
        <ListGroupItem className="MessageBox">
          <Container>
            <Row>
              <Col>{this.props.messageInfo.title}</Col>
              <Col>{this.props.messageInfo.username}</Col>
              <Col>{this.props.messageInfo.date}</Col>
              <Col>{this.props.messageInfo.category}</Col>
              <Col>
                <Badge className="StatusBox" theme={this.state.color}>
                  {this.props.messageInfo.status}
                </Badge>
              </Col>
            </Row>
          </Container>
        </ListGroupItem>
      </Link>
    );
  }
}

export default CMessageBox;
