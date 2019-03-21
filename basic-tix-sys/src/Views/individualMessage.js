import React, { Component } from "react";
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

class IndMes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Mes: ""
    };
  }
  render() {
    return (
      <Card className="IndCard">
        <CardHeader>Title</CardHeader>
        <CardBody>
          <h6>from Alex</h6>
          <p>
            Date Submit: {date}/{month}/{year}
          </p>
          <hr />
          <p>
            Bro I got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask. Bro I got
            questions to ask. Bro I got questions to ask. Bro I got questions to
            ask. Bro I got questions to ask. Bro I got questions to ask. Bro I
            got questions to ask. Bro I got questions to ask.{" "}
          </p>
        </CardBody>
        <CardFooter>
          <Badge theme="light" className="Tags">
            TAG1
          </Badge>
          <Badge theme="light" className="Tags">
            TAG2
          </Badge>
          <Badge theme="light" className="Tags">
            TAG3
          </Badge>
          <Badge theme="light" className="Tags">
            TAG4
          </Badge>
          <Badge theme="light" className="Tags">
            TAG5
          </Badge>
          <hr />
          <Button href="/messagepage" theme="dark">
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }
}

export default IndMes;
