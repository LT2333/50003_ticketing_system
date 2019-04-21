import React, { Component } from "react";
import { ReactRouter } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  CardSubtitle,
  Button,
  Badge,
  Row,
  Col
} from "shards-react";
import "./widgets.css";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import Chats from "./Chats";

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class CIndMes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInfo: props.location.messageInfo,
      token: props.location.token
    };
    this.handleChat = this.handleChat.bind(this);
  }
  handleChat(event) {
    localStorage.setItem("id", this.state.messageInfo._id);
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Card className="IndCard">
              <CardHeader>{this.state.messageInfo.title}</CardHeader>
              <CardBody>
                <h6>from {this.state.messageInfo.username}</h6>
                <p>
                  {/* Date Submit: {date}/{month}/{year} */}
                  Date Submit: {this.state.messageInfo.date}
                </p>
                <hr />
                <p>{this.state.messageInfo.message}</p>
                <img
                  src={this.state.messageInfo.imageURL}
                  width="350"
                  // height="200"
                  max-width="350"
                  height="auto"
                  alt=""
                />
              </CardBody>
              <CardFooter>
                {this.state.messageInfo.tags.map(tags => {
                  return (
                    <Badge theme="light" className="Tags">
                      {tags}
                    </Badge>
                  );
                })}
                <hr />
                {/* <Link
                to={{
                  pathname: "/cmessagepage/chats" ,
                  token: this.state.token,
                  id: this.state.messageInfo._id
                }}
                >Chat Now!</Link> */}
                {/* <Link
                to={"/cmessagepage/chats"}
                onClick={this.handleChat}
                  >
                Chat Now!
                </Link> */}
                <Link to={"/cmessagepage"}>Back</Link>
                {/* <Button onClick={ReactRouter.browserHistory.goBack} theme="dark">
                  Go Back
                </Button> */}
              </CardFooter>
            </Card>
          </Col>
          <Col>
            <Chats />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CIndMes;
