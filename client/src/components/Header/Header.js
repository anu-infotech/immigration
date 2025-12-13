import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { FontAwesome } from "react-web-vector-icons";

import {
  Navbar,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  InputGroupAddon,
  InputGroup,
  Input,
  Form,
  NavItem,
  NavLink,
} from "reactstrap";
import cx from "classnames";
import Notifications from "../Notifications";
import { logoutUser } from "../../actions/user";
import {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  changeActiveSidebarItem,
} from "../../actions/navigation";

import userAvatar from "../../images/userAvatar.png";
import search from "../../images/search.svg";
import notify from "../../images/notify.svg";
import lightNotify from "../../images/light-notify.svg";
import messages from "../../images/messages.svg";
import lightMessages from "../../images/messages-filled.svg";
import arrowUnactive from "../../images/Arrow 6.svg";
import arrowActive from "../../images/Arrow 5.svg";

import s from "./Header.module.scss"; // eslint-disable-line css-modules/no-unused-class
import { Link } from "react-router-dom";

class Header extends React.Component {
  static propTypes = {
    sidebarOpened: PropTypes.bool.isRequired,
    sidebarStatic: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.role = user.type;
    this.toggleMenu = this.toggleMenu.bind(this);
    this.switchSidebar = this.switchSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleMessages = this.toggleMessages.bind(this);
    this.toggleAccount = this.toggleAccount.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.changeArrowImg = this.changeArrowImg.bind(this);
    this.changeArrowImgOut = this.changeArrowImgOut.bind(this);

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      messagesOpen: false,
      accountOpen: false,
      notificationsTabSelected: 1,
      focus: false,
      showNewMessage: false,
      hideMessage: true,
      run: true,
      arrowImg: arrowActive,
    };
  }

  toggleFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  toggleMessages() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleAccount() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  changeArrowImg() {
    this.setState({
      arrowImg: arrowUnactive,
    });
  }

  changeArrowImgOut() {
    this.setState({
      arrowImg: arrowActive,
    });
  }

  // collapse/uncolappse
  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  // tables/non-tables
  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
    if (this.props.sidebarStatic) {
      localStorage.setItem("staticSidebar", "false");
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      localStorage.setItem("staticSidebar", "true");
      const paths = this.props.location.pathname.split("/");
      paths.pop();
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }
  render() {
    const { focus } = this.state;
    const { openUsersList } = this.props;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const firstUserLetter = (user.name || user.email || "P")[0].toUpperCase();

    if (this.role === "admin" || this.role === "user" || this.role === "manager") {
      return (
        <Navbar
          className={`${s.root} d-print-none`}
          style={{
            zIndex: !openUsersList ? 100 : 0,
            backgroundColor: "#29166F",
          }}
        >
          <NavItem className={`${s.toggleSidebarNav} d-md-none d-flex mr-2`}>
            <NavLink
              className="ml-2 pr-4 pl-3"
              id="toggleSidebar"
              onClick={this.toggleSidebar}
            >
              <i className={`la la-bars`} style={{ color: "#000" }} />
            </NavLink>
          </NavItem>
          <NavItem className={"d-md-down-block"}>
            <Link to="/app/applications">
              <FontAwesome
                name="paper-plane-o"
                color="#fff"
                size={20}
                style={{ marginRight: "10px" }}
              />
              Applications
            </Link>
          </NavItem>
          <NavItem className={"d-md-down-block"}>
            <Link to="/app/followups">
              {" "}
              <FontAwesome
                name="calendar"
                color="#fff"
                size={20}
                style={{ marginRight: "10px" }}
              />
              Follow Ups
            </Link>
          </NavItem>
          <NavItem className={"d-md-down-block"}>
            <Link to="/app/offers">
              {" "}
              <FontAwesome
                name="flag-checkered"
                color="#fff"
                size={20}
                style={{ marginRight: "10px" }}
              />
              Offer Letters
            </Link>
          </NavItem>
          <NavItem className={"d-none"}>
            <Link to="/app/visas">
              {" "}
              <FontAwesome
                name="cc-visa"
                color="#fff"
                size={20}
                style={{ marginRight: "10px" }}
              />
              Visas
            </Link>
          </NavItem>
          <NavItem className={"d-md-down-block"}>
            <Link to="/app/deferd">
              {" "}
              <FontAwesome
                name="clock-o"
                color="#fff"
                size={20}
                style={{ marginRight: "10px" }}
              />
              Deferred
            </Link>
          </NavItem>
          <NavItem className={"d-md-down-block"}>
            <Link to="/app/deposits">
              {" "}
              <FontAwesome
                name="money"
                color="#fff"
                size={20}
                style={{ marginRight: "10px" }}
              />
              Deposits
            </Link>
          </NavItem>

          <NavItem className={"d-md-down-block"}>
            <Link to="/app/create/daily">
              {" "}
              <FontAwesome
                name="signal"
                color="#fff"
                size={20}
                style={{ marginRight: "10px" }}
              />
              Create Daily Report
            </Link>
          </NavItem>
          {this.role === "admin" || this.role === "manager" ? (
            <NavItem className={"d-md-down-block"}>
              <Link to="/app/analytics">
                {" "}
                <FontAwesome
                  name="line-chart"
                  color="#fff"
                  size={20}
                  style={{ marginRight: "10px" }}
                />
                Analytics
              </Link>
            </NavItem>
          ) : null}

          <Nav>
            <Dropdown
              nav
              className={`${s.notificationsMenu}`}
              isOpen={this.state.accountOpen}
              toggle={this.toggleAccount}
            >
              <DropdownToggle
                nav
                className={"text-white"}
                style={{ marginLeft: 20 }}
              >
                <span
                  className={`${s.avatar} rounded-circle thumb-sm float-left mr-2`}
                >
                  {user.avatar || user.email === "admin@flatlogic.com" ? (
                    <img src={user.avatar || userAvatar} alt="..." />
                  ) : (
                    <span>{firstUserLetter}</span>
                  )}
                </span>
              </DropdownToggle>
              <DropdownMenu
                right
                className={`${s.notificationsWrapper} py-0 animated animated-fast fadeInUp`}
              >
                <Notifications notificationsTabSelected={4} />
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
      );
    }

    if (this.role === "reception" || this.role === "Admission") {
      return (
        <Navbar
          className={`${s.root} d-print-none`}
          style={{
            zIndex: !openUsersList ? 100 : 0,
            backgroundColor: "#323232",
          }}
        >
          <NavItem className={`${s.toggleSidebarNav} d-md-none d-flex mr-2`}>
            <NavLink
              className="ml-2 pr-4 pl-3"
              id="toggleSidebar"
              onClick={this.toggleSidebar}
            >
              <i className={`la la-bars`} style={{ color: "#000" }} />
            </NavLink>
          </NavItem>

          <Nav style={{ color: "#29166F" }}>
            <Dropdown
              nav
              className={`${s.notificationsMenu}`}
              isOpen={this.state.accountOpen}
              toggle={this.toggleAccount}
              style={{ color: "#29166F" }}
            >
              <DropdownToggle
                nav
                className={"text-white"}
                style={{ marginLeft: 20 }}
              >
                <span
                  className={`${s.avatar} rounded-circle thumb-sm float-left mr-2`}
                >
                  {user.avatar || user.email === "admin@flatlogic.com" ? (
                    <img src={user.avatar || userAvatar} alt="..." />
                  ) : (
                    <span>{firstUserLetter}</span>
                  )}
                </span>
              </DropdownToggle>
              <DropdownMenu
                right
                className={`${s.notificationsWrapper} py-0 animated animated-fast fadeInUp`}
              >
                <Notifications notificationsTabSelected={4} />
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Navbar>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
