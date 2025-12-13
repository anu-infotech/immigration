import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import LoadingOverlay from "react-loading-overlay";
import Dashboard from "../../pages/dashboard";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "../../actions/navigation";
import s from "./Layout.module.scss";
import BreadcrumbHistory from "../BreadcrumbHistory";

import CreateAssessment from "../../pages/CreateAssessment/CreateAssessment";
import NewAssessments from "../../pages/NewAssessments/NewAssessments";
import ViewAssessment from "../../pages/ViewAssessment/ViewAssessment";
import ActiveAssessments from "../../pages/ActiveAssessments/ActiveAssessments";
import RejectedAssessments from "../../pages/RejectedAssessments/RejectedAssessments";
import VisaReceived from "../../pages/VisaReceived/VisaReceived";
import Account from "../../pages/Account/Account";
import Users from "../../pages/Users/Users";
import University from "../../pages/Universities/University";
import Courses from "../../pages/Courses/Courses";
import Branches from "../../pages/Branches/Branches";
import ApplyApplication from "../../pages/Application/ApplyApplication";
import AllApplications from "../../pages/Application/AllApplications";
import ViewApplication from "../../pages/Application/ViewApplication";
import AllFollowups from "../../pages/Followups/AllFollowups";
import ViewOfferLetter from "../../pages/OfferLetters/ViewOfferLetter";
import CreateDailyReport from "../../pages/DailyReport/CreateReport";
import ViewReport from "../../pages/DailyReport/ViewReport";
import AllOfferLetters from "../../pages/OfferLetters/AllOfferLetters";
import AllDeposits from "../../pages/Deposits/AllDeposits";
import AllDeferedApplications from "../../pages/Deferd/AllDefered";
import AllVisas from "../../pages/Visas/AllVisas";
import Reciepts from "../../pages/Reciepts/Reciepts";
import Analytics from "../../pages/Analytics/Analytics";
import Cases from "../../pages/Couns/Cases";
import Attendance from "../../pages/Users/Attendance";
import ResetPassword from "../../pages/Users/ResetPassword";
import PL from "../../pages/PL/PL"
class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
  };

  constructor(props) {
    super(props);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    } else if (window.innerWidth >= 768) {
      this.props.dispatch(openSidebar());
    }
  }

  handleCloseSidebar(e) {
    if (this.props.sidebarOpened && window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          !this.props.sidebarOpened ? s.sidebarClose : "",
          "flatlogic-one",
          "dashboard-light",
        ].join(" ")}
        onClick={(e) => this.handleCloseSidebar(e)}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header />

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames='fade'
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path='/app/main'
                      exact
                      render={() => <Redirect to='/app/main/dashboard' />}
                    />
                    <Route
                      path='/app/main/dashboard'
                      exact
                      component={Dashboard}
                    />
                    <Route
                      path='/app/new-assessments'
                      exact
                      component={NewAssessments}
                    />
                    <Route
                      path='/app/create-assessment'
                      component={CreateAssessment}
                    />
                    <Route
                      path='/app/view-assessment/:id'
                      exact
                      component={ViewAssessment}
                    />
                    <Route
                      path='/app/active-assessments'
                      exact
                      component={ActiveAssessments}
                    />

                    <Route
                      path='/app/visa-received'
                      exact
                      component={VisaReceived}
                    />

                    <Route
                      path='/app/universities'
                      exact
                      component={University}
                    />
                    <Route path='/app/visas' exact component={AllVisas} />

                    <Route
                      path='/app/application/apply/:assessmentId/:courseId'
                      exact
                      component={ApplyApplication}
                    />

                    <Route
                      path='/app/application/view/:assessmentId/:applicationId'
                      exact
                      component={ViewApplication}
                    />

                    <Route
                      path='/app/offer/view/:assessmentId/:offerId'
                      exact
                      component={ViewOfferLetter}
                    />
                    <Route
                      path='/app/applications'
                      exact
                      component={AllApplications}
                    />
                    <Route
                      path='/app/offers'
                      exact
                      component={AllOfferLetters}
                    />
                    <Route path='/app/reciepts' exact component={Reciepts} />
                    <Route
                      path='/app/deferd'
                      exact
                      component={AllDeferedApplications}
                    />
                    <Route path='/app/deposits' exact component={AllDeposits} />
                    <Route
                      path='/app/create/daily'
                      exact
                      component={CreateDailyReport}
                    />

                    <Route
                      path='/app/report/view/:email'
                      exact
                      component={ViewReport}
                    />

                    <Route
                      path='/app/user/reset-password/:email'
                      exact
                      component={ResetPassword}
                    />

                    <Route
                      path='/app/followups'
                      exact
                      component={AllFollowups}
                    />

                    <Route path='/app/cases/:email' exact component={Cases} />

          

                    <Route path='/app/analytics' exact component={Analytics} />
                    <Route path='/app/P&L' exact component={PL} />

                    <Route path='/app/courses' exact component={Courses} />
                    <Route path='/app/branches' exact component={Branches} />
                    <Route
                      path='/app/rejected-assessments'
                      exact
                      component={RejectedAssessments}
                    />
                    <Route path='/app/account' exact component={Account} />
                    <Route path='/app/users' exact component={Users} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
