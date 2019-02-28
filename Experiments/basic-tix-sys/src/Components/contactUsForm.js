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

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      name: "",
      email: "",
      contactnum: "",
      problem: "",
      relatedtags: []
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

  handleChangeSelect(event) {
    console.log(event);
    this.setState({
      relatedtags: [
        {
          label: event.label,
          value: event.value
        }
      ]
    });
  }

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
        "\nproblem:" +
        this.state.problem +
        "\nrealtedtags: " +
        this.state.relatedtags
    );
  }
  render() {
    const { open } = this.state;
    return (
      <Card className="ContactUsCard">
        <CardTitle>Tell us your problem!</CardTitle>
        <CardSubtitle>We will reply within 2 business days.</CardSubtitle>
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
                      Description of Problem
                    </label>
                    <FormTextarea
                      name="problem"
                      onChange={this.handleChange}
                      id="feInputAddress"
                      rows="4"
                      size="sm"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="feInputAddress2">
                      Related Topics and Assets
                    </label>
                    <Select
                      isMulti
                      options={topics}
                      value={this.state.relatedtags}
                      onChange={this.handleChangeSelect}
                    />
                  </FormGroup>

                  <Button onClick={this.toggle}>Submit Now!</Button>
                  <Modal open={open} toggle={this.toggle}>
                    <ModalHeader>Submitted</ModalHeader>
                    <ModalBody>
                      Thanks! We have received your request. Meanwhile, you
                      might want to check out these common problems: help help
                      help
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

export default ContactUs;
