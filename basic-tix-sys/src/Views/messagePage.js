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
        statusColor_1: "danger",
        statusWords_1: "Unsolved",
        takeWords_1:"Take it!",

        statusColor_2: "danger",
        statusWords_2: "Unsolved",
        takeWords_2:"Take it!",

        statusColor_3: "danger",
        statusWords_3: "Unsolved",
        takeWords_3:"Take it!",

        statusColor_4: "danger",
        statusWords_4: "Unsolved",
        takeWords_4:"Take it!",

        Name_1: "",
        Name_2: "",
        Name_3: "",
        Name_4: "",

        Mes_1: "",
        Mes_2: "",
        Mes_3: "",
        Mes_4: "",

        Tag_1: "",
        Tag_2: "",
        Tag_3: "",
        Tag_4: "",

        
        };
        this.changeStatus_1 = this.changeStatus_1.bind(this);
        this.changeStatus_2 = this.changeStatus_2.bind(this);
        this.changeStatus_3 = this.changeStatus_3.bind(this);
        this.changeStatus_4 = this.changeStatus_4.bind(this);
        this.viewMessages = this.viewMessages.bind(this);
      }

      changeStatus_1(event) {
        this.setState({statusWords_1: "Processing"});
        this.setState({statusColor_1: "warning"});
        this.setState({takeWords_1: " Taken "});
      }

      changeStatus_2(event) {
        this.setState({statusWords_2: "Processing"});
        this.setState({statusColor_2: "warning"});
        this.setState({takeWords_2: " Taken "});
      }

      changeStatus_3(event) {
        this.setState({statusWords_3: "Processing"});
        this.setState({statusColor_3: "warning"});
        this.setState({takeWords_3: " Taken "});
      }

      changeStatus_4(event) {
        this.setState({statusWords_4: "Processing"});
        this.setState({statusColor_4: "warning"});
        this.setState({takeWords_4: " Taken "});
      }

      viewMessages(event) {
        var unirest = require("unirest");
        var req = unirest("GET", "http://localhost:3000/data/mark");
        req.headers({
            "cache-control": "no-cache"
        });
        req.end((res)=> {
            if (res.error) throw new Error(res.error);
            // this.resource = res.body;
            console.log(res.body);

            this.setState({Name_1: res.body[0].Username});
            this.setState({Name_2: res.body[1].Username});
            this.setState({Name_3: res.body[2].Username});
            this.setState({Name_4: res.body[3].Username});

            this.setState({Mes_1: res.body[0].Message});
            this.setState({Mes_2: res.body[1].Message});
            this.setState({Mes_3: res.body[2].Message});
            this.setState({Mes_4: res.body[3].Message});

            this.setState({Tag_1: res.body[0].Topic_Chosen});
            this.setState({Tag_2: res.body[1].Topic_Chosen});
            this.setState({Tag_3: res.body[2].Topic_Chosen});
            this.setState({Tag_4: res.body[3].Topic_Chosen});
        });
    }
        // req.use(function(req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        //   });
        // }

    render() {
        return (
            <div>
            <Button className="buttons" onClick={this.viewMessages}>View Messages</Button>
            <Card className = "MessageCard">
                <CardHeader>
                    From Client {this.state.Name_1}
                    <Badge theme={this.state.statusColor_1} className="Status">{this.state.statusWords_1}</Badge>
                </CardHeader>
                <CardBody>
                    <Container className="dr-example-container">
                        <Row>
                            <Col sm="12" md="12" lg="9">
                                <Row>
                                    <a href="/individualmessage" ><h5>{this.state.Tag_1}</h5></a>
                                    <hr/>
                                    <p>Date Submit: {date}/{month}/{year}</p>
                                    <a href="/individualmessage"  id="Click"><p className="MessageText">
                                    {this.state.Mes_1}
                                    </p></a>
                                </Row>
                            </Col>
                            <Col sm="12" md="12" lg="1">
                            </Col>
                            <Col sm="12" md="12" lg="2" className = "TakeItSection">
                                <Button theme="dark" className="TakeItButt" onClick={this.changeStatus_1}>{this.state.takeWords_1}</Button>
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

            <Card className = "MessageCard">
                <CardHeader>
                    From Client {this.state.Name_2}
                    <Badge theme={this.state.statusColor_2} className="Status">{this.state.statusWords_2}</Badge>
                </CardHeader>
                <CardBody>
                    <Container className="dr-example-container">
                        <Row>
                            <Col sm="12" md="12" lg="9">
                                <Row>
                                    <a href="/individualmessage" ><h5>{this.state.Tag_2}</h5></a>
                                    <hr/>
                                    <p>Date Submit: {date}/{month}/{year}</p>
                                    <a href="/individualmessage"  id="Click"><p className="MessageText"> 
                                    {this.state.Mes_2}
                                    </p></a>
                                </Row>
                            </Col>
                            <Col sm="12" md="12" lg="1">
                            </Col>
                            <Col sm="12" md="12" lg="2" className = "TakeItSection">
                                <Button theme="dark" className="TakeItButt" onClick={this.changeStatus_2}>{this.state.takeWords_2}</Button>
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

            <Card className = "MessageCard">
                <CardHeader>
                    From Client {this.state.Name_3}
                    <Badge theme={this.state.statusColor_3} className="Status">{this.state.statusWords_3}</Badge>
                </CardHeader>
                <CardBody>
                    <Container className="dr-example-container">
                        <Row>
                            <Col sm="12" md="12" lg="9">
                                <Row>
                                    <a href="/individualmessage" ><h5>{this.state.Tag_3}</h5></a>
                                    <hr/>
                                    <p>Date Submit: {date}/{month}/{year}</p>
                                    <a href="/individualmessage"  id="Click"><p className="MessageText">
                                    {this.state.Mes_3}
                                    </p></a>
                                </Row>
                            </Col>
                            <Col sm="12" md="12" lg="1">
                            </Col>
                            <Col sm="12" md="12" lg="2" className = "TakeItSection">
                                <Button theme="dark" className="TakeItButt" onClick={this.changeStatus_3}>{this.state.takeWords_3}</Button>
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

            <Card className = "MessageCard">
                <CardHeader>
                    From Client {this.state.Name_4}
                    <Badge theme={this.state.statusColor_4} className="Status">{this.state.statusWords_4}</Badge>
                </CardHeader>
                <CardBody>
                    <Container className="dr-example-container">
                        <Row>
                            <Col sm="12" md="12" lg="9">
                                <Row>
                                    <a href="/individualmessage" ><h5>{this.state.Tag_4}</h5></a>
                                    <hr/>
                                    <p>Date Submit: {date}/{month}/{year}</p>
                                    <a href="/individualmessage"  id="Click"><p className="MessageText">
                                    {this.state.Mes_4}
                                    </p></a>
                                </Row>
                            </Col>
                            <Col sm="12" md="12" lg="1">
                            </Col>
                            <Col sm="12" md="12" lg="2" className = "TakeItSection">
                                <Button theme="dark" className="TakeItButt" onClick={this.changeStatus_4}>{this.state.takeWords_4}</Button>
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
            </div>
        );
    }
}

export default MessageBox;