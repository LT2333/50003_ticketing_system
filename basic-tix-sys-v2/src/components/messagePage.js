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
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import "./messagePage.css";
// library.add(faIgloo);

const date = new Date().getDate(); //Current Date
const month = new Date().getMonth() + 1; //Current Month
const year = new Date().getFullYear(); //Current Year
const hours = new Date().getHours(); //Current Hours
const min = new Date().getMinutes(); //Current Minutes

const badgeTheme = ""; //Used to change message states (warning: yellow, danger: red)

class MessageBox extends Component {
    render() {
        return (
            <Card className = "MessageCard">
                <CardHeader>Title</CardHeader>
                <CardBody>
                    <Container className="dr-example-container">
                        <Row>
                            <Col>
                                <Badge theme="info">TAG1</Badge>
                                <Badge theme="info">TAG2</Badge>
                                <Badge theme="info">TAG3</Badge>
                            </Col>
                            <Col><p>Date Submit: {date}/{month}/{year}</p></Col>
                            <Col><Badge theme="warning">Progressing</Badge></Col>
                        </Row>
                        <Row>
                            <p>Bro I got questions to ask. 
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
                                Bro I got questions to ask. 
                                Bro I got questions to ask. 
                            </p>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
        );
    }
}

export default MessageBox;