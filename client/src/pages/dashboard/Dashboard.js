import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../components/Widget";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getResultsByMobile,
  getResultsByName,
  getResultsByDOB,
  getResultsByOfficialMobile,
  getResultsByOfficialEmail,
} from "../../actions/search";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { ClipLoader, PacmanLoader } from "react-spinners";
import MUIDataTable from "mui-datatables";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { getActiveAssessments } from "../../actions/assessment";
import { getStats } from "../../actions/dashboard";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.role = user.type;
  }

  state = {
    searchType: null,
    keyword: null,
    modal: false,
    running: false,
    assessments: this.props.assessments,
    events: [],
    pendingGeneric: [],
    todayGeneric: [],
    upcomingGeneric: [],
    pendingAppointments: [],
    todayAppointments: [],
    upcomingAppointments: [],
    pendingExpected: [],
    todayExpected: [],
    upcomingExpected: [],
  };
  closeModal = () => {
    this.setState({ modal: false });
  };

  createCalenderDates = () => {
    const nextFollowUpDates = [];
    const generics = [];
    const appointment = [];
    const expecteds = [];
    let assessments;

    if (this.role === "admin") {
      assessments = this.props.assessments;
    } 
    else if (this.role === "manager") {
      assessments = this.props.assessments.filter((assessment) => {
        const branch = localStorage.getItem("branch");
        if (assessment.location) {
          if (assessment.location.value === branch) {
            return assessment;
          }
        }
      });
    } else {
      assessments = this.props.assessments.filter((assessment) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user.email;
        if (assessment.case_handled_by) {
          if (assessment.case_handled_by.email === email) {
            return assessment;
          }
        }
      });
    }

    const events = assessments?.map((assessment) => {
      return assessment?.followUps.map((followUp) => {
        function pad(n) {
          return n < 10 ? "0" + n : n;
        }
        const year = new Date(followUp.nextFollowUpDate).getFullYear();
        const month = new Date(followUp.nextFollowUpDate).getMonth();
        const day = new Date(followUp.nextFollowUpDate).getDate();
        const newDate = year + "-" + pad(month + 1) + "-" + pad(day);

        if (followUp?.action?.value == "Generic Follow Up") {
          generics.push(followUp);
        }

        if (followUp?.action?.value == "Appointment") {
          appointment.push(followUp);
        }

        if (followUp?.action?.value == "Expected Applicant") {
          expecteds.push(followUp);
        }

        return nextFollowUpDates.push({
          title: assessment.first_name + " " + assessment.surname,
          date: newDate,
          mobile: assessment.mobile,
          id: assessment.ref_no,
          type: followUp?.action?.label,
        });
      });
    });

    const pendingGeneric = generics.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).valueOf() < new Date(Date.now()).valueOf()
      )
        return follow;
    });

    const todayGeneric = generics.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).toDateString() ==
          new Date(Date.now()).toDateString()
      )
        return follow;
    });

    const upcomingGeneric = generics.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).valueOf() > new Date(Date.now()).valueOf()
      )
        return follow;
    });

    const pendingAppointments = appointment.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).valueOf() < new Date(Date.now()).valueOf()
      )
        return follow;
    });

    const todayAppointments = appointment.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).toDateString() ==
          new Date(Date.now()).toDateString()
      )
        return follow;
    });

    const upcomingAppointments = appointment.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).valueOf() > new Date(Date.now()).valueOf()
      )
        return follow;
    });

    const pendingExpected = expecteds.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).valueOf() < new Date(Date.now()).valueOf()
      )
        return follow;
    });

    const todayExpected = expecteds.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).toDateString() ==
          new Date(Date.now()).toDateString()
      )
        return follow;
    });

    const upcomingExpected = expecteds.filter((follow) => {
      if (
        follow.remarks === null &&
        new Date(follow.followUpDate).valueOf() > new Date(Date.now()).valueOf()
      )
        return follow;
    });

    return this.setState({
      events: nextFollowUpDates,
      pendingGeneric,
      todayGeneric,
      upcomingGeneric,
      pendingAppointments,
      todayAppointments,
      upcomingAppointments,
      pendingExpected,
      todayExpected,
      upcomingExpected,
      getResultsByOfficialMobile,
      getResultsByOfficialEmail,
    });
  };

  componentDidMount = async () => {
    this.setState({ running: true });
    await this.props.getActiveAssessments();
    this.createCalenderDates();
    await this.props.getStats();
    this.setState({ running: false });
  };

  onSubmit = async () => {
    if (this.state.searchType === "mobile") {
      if (this.state.keyword.length < 10 || this.state.keyword.length === 0) {
        toast.error("Please enter a valid mobile number");
      } else {
        this.setState({ modal: true, running: true });
        await this.props.getResultsByMobile(this.state.keyword);
        this.setState({ running: false });
      }
    } else if (this.state.searchType === "dob") {
      if (this.state.keyword) {
        this.setState({ modal: true, running: true });
        await this.props.getResultsByDOB(this.state.keyword);
        this.setState({ running: false });
      } else {
        toast.error("Please enter a valid DOB");
      }
    } else if (this.state.searchType === "officialMobile") {
      if (this.state.keyword) {
        this.setState({ modal: true, running: true });
        await this.props.getResultsByOfficialMobile(this.state.keyword);
        this.setState({ running: false });
      } else {
        toast.error("Please enter a valid DOB");
      }
    } else if (this.state.searchType === "officialEmail") {
      if (this.state.keyword) {
        this.setState({ modal: true, running: true });
        await this.props.getResultsByOfficialEmail(this.state.keyword);
        this.setState({ running: false });
      } else {
        toast.error("Please enter a valid Email");
      }
    } else {
      if (this.state.keyword.length > 0) {
        this.setState({ modal: true, running: true });
        await this.props.getResultsByName(this.state.keyword);
        this.setState({ running: false });
      } else {
        toast.error("Please enter a valid name");
      }
    }
  };

  renderModalContent = () => {
    if (!this.props.results || this.state.running) {
      return (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PacmanLoader size={30} color={"#29166F"} loading={true} />
        </div>
      );
    }

    if (this.props.results.length == 0) {
      return (
        <Row style={{ marginTop: "30px" }}>
          <Col sm={12}>
            <Widget
              customDropDown
              title={<p className={"fw-bold"}>Search Results</p>}
            >
              <Row>
                <Col lg={12}>
                  <h5 style={{ textAlign: "center" }}>
                    Your query does not match any assessments.
                  </h5>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <Button
                    disabled={
                      this.state.keyword === null ||
                      this.state.searchType === null
                        ? true
                        : false
                    }
                    color='danger'
                    style={{ textAlign: "center" }}
                    onClick={() => {
                      this.closeModal();
                    }}
                  >
                    Try Again
                  </Button>
                </Col>
              </Row>
            </Widget>
          </Col>
        </Row>
      );
    }

    if (this.props.results.length > 0) {
      const columns = [
        {
          name: "ref_no",
          label: "Reference No.",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "dob",
          label: "DOB",
          options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
              if (value) {
                return new Date(value).toLocaleDateString();
              } else {
                return "N/A";
              }
            },
          },
        },
        {
          name: "first_name",
          label: "First name",
          options: {
            filter: true,
            sort: true,
          },
        },

        {
          name: "country_apply_for",
          label: "Apply For",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              console.log(value);
              return <span>{value.label}</span>;
            },
          },
        },
        {
          name: "english_test_type",
          label: "Test",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              console.log(value);
              return <span>{value.label}</span>;
            },
          },
        },
        {
          name: "ref_no",
          label: "View",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <Button
                  color='success'
                  size={"sm"}
                  onClick={() =>
                    this.props.history.push("/app/view-assessment/" + value)
                  }
                >
                  View
                </Button>
              );
            },
          },
        },
      ];

      const options = {
        selectableRows: false,
      };

      return (
        <div style={{ marginTop: "20px" }}>
          <MUIDataTable
            title={"Assessments"}
            data={this.props.results}
            columns={columns}
            options={options}
          />
        </div>
      );
    }
  };

  render() {
    if (!this.props.assessments || this.state.running) {
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClipLoader size={50} color={"#29166F"} loading={true} />
        </div>
      );
    }

    if (this.role === "user" || this.role === "admin" || this.role === "manager") {
      return (
        <div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(254, 176, 73, 0.4)",
              zIndex: 10000000000000,
              display: this.state.modal ? "block" : "none",
              padding: "40px",
            }}
          >
            <div
              onClick={() => this.closeModal()}
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                cursor: "pointer",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <FontAwesome name='remove' color='white' size={22} />
            </div>
            {this.renderModalContent()}
          </div>
          <Row>
            <Col lg={2}>
              <Widget title={<p className={"fw-bold"}>Active</p>}>
                <h1>{this.props.stats.active}</h1>
                <Link to='/app/active-assessments'>View All&rarr;</Link>
              </Widget>
            </Col>
            <Col lg={2}>
              <Widget title={<p className={"fw-bold"}>Inactive</p>}>
                <h1>{this.props.stats.rejected}</h1>
                <Link to='/app/rejected-assessments'>View All&rarr;</Link>
              </Widget>
            </Col>
            <Col lg={2}>
              <Widget title={<p className={"fw-bold"}>New</p>}>
                <h1>{this.props.stats.unattended}</h1>
                <Link to='/app/new-assessments'>View All&rarr;</Link>
              </Widget>
            </Col>
            <Col lg={2}>
              <Widget title={<p className={"fw-bold"}>Applications</p>}>
                <h1>{this.props.stats.applications}</h1>
                <Link to='/app/applications'>View All&rarr;</Link>
              </Widget>
            </Col>
            <Col lg={2}>
              <Widget title={<p className={"fw-bold"}>Offers</p>}>
                <h1>{this.props.stats.offerLetters}</h1>
                <Link to='/app/offers'>View All&rarr;</Link>
              </Widget>
            </Col>
            <Col lg={2}>
              <Widget title={<p className={"fw-bold"}>Visas</p>}>
                <h1>{this.props.stats.visas}</h1>
                <Link to='/app/visas'>View All&rarr;</Link>
              </Widget>
            </Col>
          </Row>
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget title={<p className={"fw-bold"}>Search</p>}>
                <Row>
                  <Col lg={4}>
                    <Select
                      className='basic-single'
                      name='search'
                      options={[
                        { value: "mobile", label: "Mobile" },
                        { value: "officialMobile", label: "Official Mobile" },
                        { value: "officialEmail", label: "Official Email" },
                        { value: "name", label: "Name" },
                        { value: "dob", label: "Date Of Birth" },
                      ]}
                      onChange={(value) => {
                        this.setState({ searchType: value.value });
                      }}
                    />
                  </Col>

                  <Col lg={6}>
                    {this.state.searchType === "dob" ? (
                      <input
                        type='date'
                        className='form-control'
                        placeholder='Keyword here'
                        onChange={(e) => {
                          this.setState({ keyword: e.target.value });
                        }}
                      />
                    ) : (
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Keyword here'
                        onChange={(e) => {
                          this.setState({ keyword: e.target.value });
                        }}
                      />
                    )}
                  </Col>

                  <Col lg={2}>
                    <Button
                      disabled={
                        this.state.keyword === null ||
                        this.state.searchType === null
                          ? true
                          : false
                      }
                      color='success'
                      onClick={this.onSubmit}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Widget>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Generic Follow Up's</p>}
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>{this.state.pendingGeneric.length}</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>{this.state.todayGeneric.length}</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>{this.state.upcomingGeneric.length}</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col>
            <Col lg={4}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Appointment(s)</p>}
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>{this.state.pendingAppointments.length}</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>{this.state.todayAppointments.length}</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>{this.state.upcomingAppointments.length}</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col>
            {/* <Col lg={4}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Revenue Follow Up's</p>}
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col> */}
            {/* <Col lg={4}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Defer Follow Up's</p>}
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col> */}
            {/* <Col lg={4}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Upload Documents Follow Up's</p>}
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col> */}
            {/* <Col lg={4}>
              <Widget
                customDropDown
                title={
                  <p className={"fw-bold"}>Upload AL/Application Follow Up's</p>
                }
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col> */}
            {/* <Col lg={4}>
              <Widget
                customDropDown
                title={
                  <p className={"fw-bold"}>Edit Country/Cohort Follow Up's</p>
                }
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col> */}

            <Col lg={4}>
              <Widget
                customDropDown
                title={
                  <p className={"fw-bold"}>Expected Applicant Follow Up's</p>
                }
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>{this.state.pendingExpected.length}</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>{this.state.todayExpected.length}</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>{this.state.upcomingExpected.length}</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col>
            {/* <Col lg={4}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Expected Document Follow Up's</p>}
              >
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>Pending</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Today</td>
                      <td>15</td>
                    </tr>
                    <tr>
                      <td>Future</td>
                      <td>20</td>
                    </tr>
                  </tbody>
                </table>
              </Widget>
            </Col> */}
          </Row>

          <Row>
            <Col lg={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Daily Follow Up's</p>}
              >
                <Row>
                  <Col lg={12}>
                    <FullCalendar
                      plugins={[dayGridPlugin]}
                      initialView='dayGridMonth'
                      eventContent={(info) => {
                        return (
                          <div>
                            <i>{info.event.title}</i>
                            <br></br>
                            <span>{info.event.extendedProps.type}</span>
                          </div>
                        );
                      }}
                      weekends={true}
                      eventClick={(info) => {
                        console.log(info.event);
                        window.location.href =
                          "/#/app/view-assessment/" + info.event.id;
                      }}
                      events={this.state.events}
                    />
                  </Col>
                </Row>
              </Widget>
            </Col>
          </Row>
        </div>
      );
    }

    if (this.role === "reception" || this.role === "Admission") {
      return (
        <div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(254, 176, 73, 0.4)",
              zIndex: 10000000000000,
              display: this.state.modal ? "block" : "none",
              padding: "40px",
            }}
          >
            <div
              onClick={() => this.closeModal()}
              style={{
                position: "absolute",
                top: "10px",
                right: "20px",
                cursor: "pointer",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <FontAwesome name='remove' color='white' size={22} />
            </div>
            {this.renderModalContent()}
          </div>
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Search</p>}
              >
                <Row>
                  <Col lg={4}>
                    <Select
                      className='basic-single'
                      name='search'
                      options={[
                        { value: "mobile", label: "Mobile" },
                        { value: "name", label: "Name" },
                      ]}
                      onChange={(value) => {
                        this.setState({ searchType: value.value });
                      }}
                    />
                  </Col>

                  <Col lg={6}>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Keyword here'
                      onChange={(e) => {
                        this.setState({ keyword: e.target.value });
                      }}
                    />
                  </Col>

                  <Col lg={2}>
                    <Button
                      disabled={
                        this.state.keyword === null ||
                        this.state.searchType === null
                          ? true
                          : false
                      }
                      color='success'
                      onClick={this.onSubmit}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Widget>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.searchResults,
    assessments: state.assessment,
    stats: state.stats,
  };
};

export default connect(mapStateToProps, {
  getResultsByMobile: getResultsByMobile,
  getResultsByOfficialMobile: getResultsByOfficialMobile,
  getResultsByOfficialEmail: getResultsByOfficialEmail,
  getResultsByName: getResultsByName,
  getResultsByDOB: getResultsByDOB,
  getActiveAssessments: getActiveAssessments,
  getStats: getStats,
})(Dashboard);
