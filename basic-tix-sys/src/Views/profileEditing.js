import React, { Component } from "react";
import Select from "react-select";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  FormTextarea,
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import "./contactUsForm.css";

const topics = [
  { label: "API DevOps", value: 1 },
  { label: "Chart as a Service", value: 2 },
  { label: "Recruitment Platform", value: 3 },
  { label: "Aesop", value: 4 },
  { label: "Travel Marketplace", value: 5 },
  { label: "Banking Lifestyle App", value: 6 },
  { label: "AR Car Visualizer", value: 7 },
  { label: "AR Car Manual", value: 8 },
  { label: "AR Gamification", value: 9 },
  { label: "AR Threatre", value: 10 },
  { label: "AR Menu", value: 11 },
  { label: "AI Wealth Manager", value: 12 },
  { label: "Multilingual Chatbot", value: 13 },
  { label: "AI Translator", value: 14 },
  { label: "Digital Butler", value: 15 },
  { label: "Video Analytics", value: 16 },
  { label: "Sentiment Analysis", value: 17 },
  { label: "ACNAPI MFA Login", value: 18 },
  { label: "Ticketing Platform", value: 19 },
  { label: "Smart Lock", value: 20 },
  { label: "Smart Home", value: 21 },
  { label: "Smart Parking", value: 22 },
  { label: "Smart Restaurant", value: 23 },
  { label: "Queuing System", value: 24 },
  { label: "IoT Led Wall", value: 25 },
  { label: "Other", value: 26 }
];

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      name: "",
      email: "",
      contactnum: "",
      bio: "",
      preferedtags: null
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleChangeSelect = event => {
    console.log(event);

    this.setState({
      preferedtags: [event]
    });
  };

  toggle() {
    this.setState({
      open: !this.state.open
    });
    console.log(
      "Form Details: \n" +
        "name: " +
        this.state.name +
        "\nemail: " +
        this.state.email +
        "\ncontactnum: " +
        this.state.contactnum +
        "\nbio:" +
        this.state.bio +
        "\nrealtedtags: " +
        this.state.preferedtags
    );

    var unirest = require("unirest");

    var req = unirest("POST", "http://localhost:3000/form");

    req.headers({
      "cache-control": "no-cache",
      "Content-Type": "application/json"
    });

    req.type("json");
    req.send({
      Profile_Username: this.state.name,
      Profile_Email: this.state.email,
      Profile_Contact_Number: this.state.contactnum,
      Topic_Prefered: this.state.preferedtags,
      Profile_Bio: this.state.bio
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }

  render() {
    const { open } = this.state;
    return (
      <Card className="ContactUsCard">
        <CardTitle>Editing your profile here!</CardTitle>
        <CardSubtitle>///</CardSubtitle>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <label>Name</label>
                    <FormInput
                      name="name"
                      onChange={this.handleChange}
                      size="sm"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Email</label>
                    <FormInput
                      name="email"
                      onChange={this.handleChange}
                      size="sm"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label>Contact Number</label>
                    <FormInput
                      name="contactnum"
                      onChange={this.handleChange}
                      size="sm"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="feInputAddress">
                      Description of bio
                    </label>
                    <FormTextarea
                      name="bio"
                      onChange={this.handleChange}
                      id="feInputAddress"
                      rows="4"
                      size="sm"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="feInputAddress2">
                      Prefered Topics and Assets
                    </label>
                    <Select
                      isMulti
                      options={topics}
                      onChange={this.handleChangeSelect}
                    />
                  </FormGroup>

                  <Button onClick={this.toggle}>Submit Now!</Button>
                  <Modal open={open} toggle={this.toggle}>
                    <ModalHeader>Submitted</ModalHeader>
                    <ModalBody>
                      Your changes have been saved!
                    </ModalBody>
                  </Modal>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

export default ProfileEdit;
