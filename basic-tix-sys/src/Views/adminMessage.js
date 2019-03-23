import React, { Component } from "react";
import adminHeaderBar from "./Components/adminHeaderBar";
import ContactUs from "./Components/contactUsForm";
import HeaderBar from "./Components/headerBar";
import MessagePage from "./messagePage";
import IndMes from "./individualMessage";
import Chats from "./Chats";
import MyJobs from "./myJobs";
import ProfileDisp from "./profileDisplaying";
import ProfileEdit from "./profileEditing";

class AdminMessage extends Component {
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
                <adminHeaderBar />
            </Container>
  
            <Switch>
                <Route path="/individualmessage" component={IndMes} />
                <Route path="/main" render={(props) => <MessagePage {...props} token={this.state.token}/>}/>
                <Route path="/chats" render={(props) => <Chat {...props} token={this.state.token}/>}/>
                <Route path="/ahistory" render={(props) => <Ahistory {...props} token={this.state.token}/>}/>
                <Route path="/profileedit" render={(props) => <ProfileEdit {...props} token={this.state.token} />}/>
                <Route path="/profiledisp" render={(props) => <ProfileDisp {...props} token={this.state.token} />}/>
                <Route path="/myjobs" render={(props) => <MyJobs {...props} token={this.state.token}/>}/>
            </Switch>
          </div>
        </Router>
      );
    }
  }
  
  export default AdminMessage;