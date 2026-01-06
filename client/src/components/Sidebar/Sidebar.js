import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup/LinksGroup";
import { changeActiveSidebarItem } from "../../actions/navigation";
import { logoutUser } from "../../actions/user";

import lightDashboardIcon from "../../images/light-dashboard.svg";
import darkDashboardIcon from "../../images/dark-dashboard.svg";
import logo from "../../images/logo.svg";
import settingsIcon from "../../images/settings.svg";
import logoutIcon from "../../images/logout.svg";
import accountIcon from "../../images/account.svg";

import documentationLight from "../../images/icons/Documentation_outlined.svg";
import documentationDark from "../../images/icons/Documentation_filled.svg";
import gridLight from "../../images/icons/Grid_outlined.svg";
import gridDark from "../../images/icons/Grid_filled.svg";

import emailLight from "../../images/icons/Email_outlined.svg";
import emailDark from "../../images/icons/Email_filled.svg";

import packLight from "../../images/icons/Package_outlined.svg";
import packDark from "../../images/icons/Package_filled.svg";

import profileLight from "../../images/icons/Profile_outlined.svg";
import profileDark from "../../images/icons/Profile_filled.svg";

import notificationLight from "../../images/icons/Maps_outlined.svg";
import notificationDark from "../../images/icons/Maps_filled.svg";

import packageLight from "../../images/icons/Typography_outlined.svg";
import pacakageDark from "../../images/icons/Typography_filled.svg";

import eLight from "../../images/icons/E-commerce_outlined.svg";
import eDark from "../../images/icons/E-commerce_filled.svg";

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    activeItem: "",
  };

  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.role = user.type;
    this.doLogout = this.doLogout.bind(this);
    this.selected_branch = localStorage.getItem("branch");
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    if (
      this.role === "admin" ||
      this.role === "user" ||
      this.role === "Admission" ||
      this.role === "manager"
    ) {
      return (
        <div
          className={`${
            !this.props.sidebarOpened && !this.props.sidebarStatic
              ? s.sidebarClose
              : ""
          } ${s.sidebarWrapper}`}
          id={"sidebar-drawer"}
        >
          <nav className={s.root}>
            <header className={s.logo}>
              <img
                src="https://aussiehub.co.in/wp-content/uploads/2020/10/Aussie-Hub-Logo-1.jpg"
                alt="logo"
                style={{ height: "100%", padding: "5px" }}
                className={s.logoStyle}
              />
              {/* <span>Aussie&nbsp;</span> Hub */}
            </header>
            <hr />
            {this.role != 'admin' && (
              <LinksGroup>
                <span className="text-capitalize">Branch: <b>{this.selected_branch}</b></span>
              </LinksGroup>
            )}
            
             
            <ul className={s.nav}>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Dashboard"
                isHeader
                link="/app/main/dashboard"
                index="main"
              >
                {window.location.href.includes("dashboard") ? (
                  <img
                    src={darkDashboardIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={lightDashboardIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Create Assessment"
                isHeader
                link="/app/create-assessment"
              >
                {window.location.href.includes("create-assessment") ? (
                  <img
                    src={documentationDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={documentationLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Active Assessments"
                isHeader
                link="/app/active-assessments"
                index="main"
              >
                {window.location.href.includes("active-assessments") ? (
                  <img
                    src={gridDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={gridLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>

              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="New Assessments"
                isHeader
                link="/app/new-assessments"
                index="main"
              >
                {window.location.href.includes("new-assessments") ? (
                  <img
                    src={emailDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={emailLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>

              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Visa Received"
                isHeader
                link="/app/visa-received"
                index="main"
              >
                {window.location.href.includes("visa-received") ? (
                  <img
                    src={gridDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={gridLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>

              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Inactive Assessments"
                isHeader
                link="/app/rejected-assessments"
                index="main"
              >
                {window.location.href.includes("rejected-assessments") ? (
                  <img
                    src={packDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={packLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Universities"
                isHeader
                link="/app/universities"
                index="main"
              >
                {window.location.href.includes("universities") ? (
                  <img
                    src={notificationDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={notificationLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>

              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Receipts P&L"
                isHeader
                link="/app/P&L"
                index="main"
                showNavItem={(this.role === 'admin' || this.role === 'manager')?true:false}
              >
                {window.location.href.includes("P&L") ? (
                  <img
                    src={notificationDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={notificationLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Courses"
                isHeader
                link="/app/courses"
                index="main"
              >
                {window.location.href.includes("courses") ? (
                  <img
                    src={pacakageDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={packageLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>

              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Branches"
                isHeader
                showNavItem={this.role === 'admin'?true:false}
                link="/app/branches"
                index="main"
              >
                {window.location.href.includes("branches") ? (
                  <img
                    src={pacakageDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={packageLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>

              {/* <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Invoices"
                isHeader
                link="/app/reciepts"
                index="main"
              >
                {window.location.href.includes("reciepts") ? (
                  <img
                    src={eDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={eLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup> */}
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Users"
                isHeader
                showNavItem={this.role === 'admin'?true:false}
                link="/app/users"
                index="main"
              >
                {window.location.href.includes("users") ? (
                  <img
                    src={profileDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={profileLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              
              <hr />
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                header="Logout"
                isHeader
                onClick={() => this.doLogout()}
              >
                {window.location.href.includes("account") ? (
                  <img
                    src={logoutIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={logoutIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
            </ul>
          </nav>
        </div>
      );
    }

    if (this.role === "reception") {
      return (
        <div
          className={`${
            !this.props.sidebarOpened && !this.props.sidebarStatic
              ? s.sidebarClose
              : ""
          } ${s.sidebarWrapper}`}
          id={"sidebar-drawer"}
        >
          <nav className={s.root}>
            <header className={s.logo}>
              <img src={logo} alt="logo" className={s.logoStyle} />
              <span>Aussie&nbsp;</span> Hub
            </header>
            <h5 className={s.navTitle}>APP</h5>
            <ul className={s.nav}>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Dashboard"
                isHeader
                link="/app/main/dashboard"
                index="main"
              >
                {window.location.href.includes("dashboard") ? (
                  <img
                    src={darkDashboardIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={lightDashboardIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Create Assessment"
                isHeader
                link="/app/create-assessment"
              >
                {window.location.href.includes("create-assessment") ? (
                  <img
                    src={documentationDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={documentationLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>

              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Universities"
                isHeader
                link="/app/universities"
                index="main"
              >
                {window.location.href.includes("universities") ? (
                  <img
                    src={notificationDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={notificationLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                activeItem={this.props.activeItem}
                header="Courses"
                isHeader
                link="/app/courses"
                index="main"
              >
                {window.location.href.includes("courses") ? (
                  <img
                    src={pacakageDark}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={packageLight}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
              
            </ul>

            <ul className={s.downNav}>
              <hr />
              <LinksGroup
                onActiveSidebarItemChange={(activeItem) =>
                  this.props.dispatch(changeActiveSidebarItem(activeItem))
                }
                header="Logout"
                isHeader
                onClick={() => this.doLogout()}
              >
                {window.location.href.includes("account") ? (
                  <img
                    src={logoutIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                ) : (
                  <img
                    src={logoutIcon}
                    alt="lightDashboard"
                    width={"24px"}
                    height={"24px"}
                  />
                )}
              </LinksGroup>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
