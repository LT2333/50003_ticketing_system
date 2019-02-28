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
import "./widgets.css";
import IndMes from "./individualMessage";
// library.add(faIgloo);

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

class MessageBox extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        statusColor: "danger",
        statusWords: "Unsolved",
        takeWords:"Take it!",
        };
        this.changeStatus = this.changeStatus.bind(this);
      }

      changeStatus(event) {
        this.setState({statusWords: "Processing"});
        this.setState({statusColor: "warning"});
        this.setState({takeWords: " Taken "});
      }
    render() {
        return (
            <Card className = "MessageCard">
                <CardHeader>
                    From Client XXX
                    <Badge theme={this.state.statusColor} className="Status">{this.state.statusWords}</Badge>
                </CardHeader>
                <CardBody>
                    <Container className="dr-example-container">
                        <Row>
                            <Col sm="12" md="12" lg="9">
                                <Row>
                                    <a href="/indmes"><h5>Title</h5></a>
                                    <hr/>
                                    <p>Date Submit: {date}/{month}/{year}</p>
                                    <a href="/indmes" id="Click"><p>Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask.
                                        Bro I got questions to ask. 
                                        Bro I got questions to ask.
                                    </p></a>
                                </Row>
                            </Col>
                            <Col sm="12" md="12" lg="1">
                            </Col>
                            <Col sm="12" md="12" lg="2" className = "TakeItSection">
                                <Button theme="dark" className="TakeItButt" onClick={this.changeStatus}>{this.state.takeWords}</Button>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
                <CardFooter>
                    <Badge theme="light" className = "Tags">TAG1</Badge>
                    <Badge theme="light" className = "Tags">TAG2</Badge>
                    <Badge theme="light" className = "Tags">TAG3</Badge>
                    <Badge theme="light" className = "Tags">TAG4</Badge>
                    <Badge theme="light" className = "Tags">TAG5</Badge>
                </CardFooter>
            </Card>
        );
    }
}

export default MessageBox;