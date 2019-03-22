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
import "../Views/widgets.css";
import IndMes from "../Views/individualMessage";
// library.add(faIgloo);

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class MessageBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusColor: "danger",
            statusWords: "Unsolved",
            takeWords: "Take it!",
        };
    }
    changeStatus(event) {
        this.setState({ statusWords: "Processing" });
        this.setState({ statusColor: "warning" });
        this.setState({ takeWords: " Taken " });
    }
    render() {
        console.log(this.props.messageInfo);
        return (
            <div>
                <Card className="MessageCard">
                <CardHeader>
                    From Client {this.props.messageInfo.username}
                    <Badge theme={this.state.statusColor} className="Status">
                        {this.props.messageInfo.status}
                    </Badge>
                </CardHeader>
                <CardBody>
                    <Container className="dr-example-container">
                    <Row>
                        <Col sm="12" md="12" lg="9">
                        <Row>
                            {/* <a href="/individualmessage"> */}
                            <h5>{this.state.Tag}</h5>
                            {/* </a> */}
                            <hr />
                            <p>
                                {/* Date Submit: {date}/{month}/{year} */}
                                Date Submit: {this.props.messageInfo.date}
                            </p>
                            <hr/>
                            {/* <a href="/individualmessage" id="Click"> */}
                            <p className="MessageText">{this.props.messageInfo.message}</p>
                            {/* </a> */}
                            <hr/>
                            <Link to={{
                            pathname:"/individualmessage", 
                            messageInfo:this.props.messageInfo
                            }}>Click to view more</Link>
                        </Row>
                        </Col>
                        <Col sm="12" md="12" lg="1" />
                        <Col sm="12" md="12" lg="2" className="TakeItSection">
                        <Button
                            theme="dark"
                            className="TakeItButt"
                            onClick={this.changeStatus}
                        >
                            {this.state.takeWords}
                        </Button>
                        </Col>
                    </Row>
                    </Container>
                </CardBody>
                <CardFooter>
                    {this.props.messageInfo.tags.map((tags)=>{
                        return <Badge theme="light" className="Tags">{tags}</Badge>
                    })}
                </CardFooter>
                </Card>
            </div>
        );
    }
}
    
export default MessageBox;