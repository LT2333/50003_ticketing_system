import React, { Component } from "react";
import {ReactRouter} from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  CardSubtitle,
  Button,
  Badge
} from "shards-react";
import "./widgets.css";
import MessageBox from "./messagePage";

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class AIndMes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInfo: props.location.messageInfo
    };
  }
  render() {
    return (
      <Card className="IndCard">
        <CardHeader>Title</CardHeader>
        <CardBody>
          <h6>from {this.state.messageInfo.username}</h6>
          <p>
            {/* Date Submit: {date}/{month}/{year} */}
            Date Submit: {this.state.messageInfo.date}
          </p>
          <hr />
          <p>{this.state.messageInfo.message}</p>
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
          <Button href="/cmessagepage/chats">Chat Now</Button>
          <Button onClick={this.handleTake} theme="dark">
            Take it
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default AIndMes;