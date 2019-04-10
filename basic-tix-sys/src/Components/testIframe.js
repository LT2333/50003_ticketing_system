import React, { Component } from "react";

class TestIframe extends Component {
  render() {
    return (
      <iframe
        allow="microphone;"
        width="350"
        height="430"
        src="https://console.dialogflow.com/api-client/demo/embedded/8a3f1d1d-1ff2-4a83-9cfe-d7d848c6e3d1"
      />
    );
  }
}

export default TestIframe;
