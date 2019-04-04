import React, { Component } from "react";
import Select from "react-select";
import axios from 'axios';
import $ from 'jquery';

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
      relatedtags: null,
      selectedFile: null,     //Here
		  selectedFiles: null     //Here
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.singleFileChangedHandler = this.singleFileChangedHandler.bind(this);  //Here
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
      relatedtags: [event]
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
        "\nproblem:" +
        this.state.problem +
        "\nrealtedtags: " +
        this.state.relatedtags+
        "\nuploadedImage: "+
        this.state.selectedFile   //Here
    );

    //   var unirest = require("unirest");

    //   var req = unirest("POST", "http://localhost:3000/form");

    //   req.headers({
    //     "cache-control": "no-cache",
    //     "Content-Type": "application/json"
    //   });

    //   req.type("json");
    //   req.send({
    //     Username: this.state.name,
    //     Email: this.state.email,
    //     Contact_Number: this.state.contactnum,
    //     Topic_Chosen: this.state.relatedtags,
    //     Message: this.state.problem
    //   });

    //   req.end(function(res) {
    //     if (res.error) throw new Error(res.error);

    //     console.log(res.body);
    //   });
    
    
    
    var unirest = require("unirest");

    var req = unirest(
      "POST",
      "https://courier50003.herokuapp.com/portal/usersubmit"
    );

    req.headers({
      "cache-control": "no-cache",
      "content-type": "application/json"
    });

    req.type("json");
    req.send({
      email: this.state.email,
      contact_num: this.state.contactnum,
      message: this.state.problem,
      category: this.state.relatedtags,
      uploadedImage: this.state.selectedFile  //Here
    });

     //******************* */
     const data = new FormData();
     // If file selected
     if ( this.state.selectedFile ) {
     data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name );
     axios.post( 'http://localhost:5000/api/profile-img-upload', data, {
       headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
       }
      })
       .then( ( response ) => {
     if ( 200 === response.status ) {
       // If file size is larger than expected.
       if( response.data.error ) {
        if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
         this.ocShowAlert( 'Max size: 2MB', 'red' );
        } else {
         console.log( response.data );
     // If not the given file type
         this.ocShowAlert( response.data.error, 'red' );
        }
       } else {
        // Success
        let fileName = response.data;
        console.log( 'fileData', fileName );
        this.ocShowAlert( 'File Uploaded', '#3089cf' );
       }
        }
       }).catch( ( error ) => {
       // If another error
       this.ocShowAlert( error, 'red' );
      });
     } else {
      // if file not selected throw error
      this.ocShowAlert( 'Please upload file', 'red' );
     }

    req.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
    
   
    
  }
///***************************************Starts here*************************************** */
  //For uploading the file through "file"
	singleFileChangedHandler = ( event ) => {
    console.log(event.target.files);
		this.setState({
		 selectedFile: event.target.files[0]
		});
	   };

	//"Real" upload! after the upload button is clicked
	singleFileUploadHandler = ( event ) => {
                  //  <div className="mt-5">
                  //   <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload Image</button>
                  //  </div>

		const data = new FormData();
	  // If file selected
		if ( this.state.selectedFile ) {
	  data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name );
	  axios.post( 'http://localhost:5000/api/profile-img-upload', data, {
		  headers: {
		   'accept': 'application/json',
		   'Accept-Language': 'en-US,en;q=0.8',
		   'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
		  }
		 })
		  .then( ( response ) => {
	  if ( 200 === response.status ) {
			// If file size is larger than expected.
			if( response.data.error ) {
			 if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
			  this.ocShowAlert( 'Max size: 2MB', 'red' );
			 } else {
			  console.log( response.data );
	  // If not the given file type
			  this.ocShowAlert( response.data.error, 'red' );
			 }
			} else {
			 // Success
			 let fileName = response.data;
			 console.log( 'fileData', fileName );
			 this.ocShowAlert( 'File Uploaded', '#3089cf' );
			}
		   }
		  }).catch( ( error ) => {
		  // If another error
		  this.ocShowAlert( error, 'red' );
		 });
		} else {
		 // if file not selected throw error
     this.ocShowAlert( 'Please upload file', 'red' );
     
    }
	  };

	// ShowAlert Function
	ocShowAlert = ( message, background = '#3089cf' ) => {
		let alertContainer = document.querySelector( '#oc-alert-container' ),
		alertEl = document.createElement( 'div' ),
		textNode = document.createTextNode( message );
		alertEl.setAttribute( 'class', 'oc-alert-pop-up' );
		$( alertEl ).css( 'background', background );
		alertEl.appendChild( textNode );
		alertContainer.appendChild( alertEl );
		setTimeout( function () {
		$( alertEl ).fadeOut( 'slow' );
		$( alertEl ).remove();
		}, 3000 );
	};
///***************************************Ends here*************************************** */
  render() {
    const { open } = this.state;
    return (
      <Card className="container">

      {/* For Alert box*/}
      <div id="oc-alert-container"></div>

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
                      onChange={this.handleChangeSelect}
                    />
                  </FormGroup>

                  

                  {/*Image Upload here*/}
                  <div className="card-body">
                    <p className="card-text">Attachment</p>
                    <input type="file" onChange={this.singleFileChangedHandler}/>
                  </div>

               
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
