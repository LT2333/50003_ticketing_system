import React, { Component } from "react";
import clientHeaderBar from "./Components/clientHeaderBar";
import ContactUs from "./Components/contactUsForm";
import MessagePage from "./messagePage";
import IndMes from "./individualMessage";
import MyReqs from "./myReqs";

class ClientMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.token
        }
      }
    render() {
      return (
        <Router>
          <div>
            <Container>
              <clientHeaderBar />
            </Container>
  
            <Switch>
              <Route path="/contactus" component={ContactUs}/>
              <Route path="/individualmessage" component={IndMes} />
              <Route path="/main" component={MessagePage} render={(props) => <MessagePage {...props} token={this.state.token}/>}/>
              <Route path="/myreqs" component={MyReqs} render={(props) => <MyReq {...props} token={this.state.token}/>}/>
            </Switch>
          </div>
        </Router>
      );
    }
  }
  
  export default ClientMessage;