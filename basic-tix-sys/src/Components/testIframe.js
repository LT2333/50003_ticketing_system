import React, { Component } from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "shards-react";

class TestIframe extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <Button id="popover-1" onClick={this.toggle}>
          Toggle
        </Button>
        <Popover
          placement="bottom"
          open={this.state.open}
          toggle={this.toggle}
          target="#popover-1"
        >
          <PopoverBody>
            <iframe
              allow="microphone;"
              width="150"
              height="230"
              src="https://console.dialogflow.com/api-client/demo/embedded/8a3f1d1d-1ff2-4a83-9cfe-d7d848c6e3d1"
            />
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default TestIframe;
