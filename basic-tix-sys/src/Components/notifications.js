import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notifications: localStorage.getItem("notifications")
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }
  componentDidMount() {
    this.setState({ notifications: localStorage.getItem("notifications") });
    console.log(
      "localStorage: ",
      JSON.parse(localStorage.getItem("notifications")),
      "type",
      typeof JSON.parse(localStorage.getItem("notifications"))
    );
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            Notifications &nbsp;&nbsp;
            <Badge pill theme="danger">
              {JSON.parse(localStorage.getItem("notifications")).length}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          <DropdownItem>
            <hr />
            <ul>
              {JSON.parse(localStorage.getItem("notifications")).map(function(
                n,
                index
              ) {
                return <li key={index}>{n}</li>;
              })}
            </ul>
            <hr />
            {/* {localStorage.getItem("notifications")} */}
          </DropdownItem>
          {/* <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem> */}
        </Collapse>
      </NavItem>
    );
  }
}
