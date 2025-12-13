import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  deleteApplication,
  getActiveAssessments,
} from "../../actions/assessment";
import PacmanLoader from "react-spinners/PacmanLoader";
import MUIDataTable from "mui-datatables";
import { Button, Col, Row } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesome } from "react-web-vector-icons";
import { Link } from "react-router-dom";

class AllFollowups extends React.Component {
  async componentDidMount() {
    await this.props.getActiveAssessments();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.role = this.user.type;
    this.followups = [];
    this.adminGsp = [];
    this.adminBat = [];

    const gurdaspurFiltered = this.props.assessments.filter((assessment) => {
      if (assessment.location.value === "gurdaspur") {
        return assessment;
      }
    });

    const allApplicationsGsp = gurdaspurFiltered.map((application) => {
      return application.followUps;
    });

    for (let index = 0; index < allApplicationsGsp.length; index++) {
      allApplicationsGsp[index].map((app) => {
        return this.adminGsp.push(app);
      });
    }

    const batalaFiltered = this.props.assessments.filter((assessment) => {
      if (assessment.location.value === "batala") {
        return assessment;
      }
    });

    const allApplicationsBat = batalaFiltered.map((application) => {
      return application.followUps;
    });

    for (let index = 0; index < allApplicationsBat.length; index++) {
      allApplicationsBat[index].map((app) => {
        return this.adminBat.push(app);
      });
    }

    const filteredItems = this.props.assessments.filter((assessment) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const email = user.email;
      if (assessment.case_handled_by) {
        if (assessment.case_handled_by.email === email) {
          return assessment;
        }
      }
    });

    const allApplications = filteredItems.map((application) => {
      return application.followUps;
    });

    for (let index = 0; index < allApplications.length; index++) {
      allApplications[index].map((app) => {
        return this.followups.push(app);
      });
    }
    this.setState({ running: false });
  }

  state = { running: true };

  render() {
    if (!this.props.assessments || this.state.running === true) {
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
          <PacmanLoader size={30} color={"#FEB049"} loading={true} />
        </div>
      );
    } else {
      const columns = [
        {
          name: "assessmentId",
          label: "Client",
          options: {
            filter: false,
            customBodyRender: (value) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == value
              );

              return (
                <div>
                  <span>
                    {assessment.first_name + " " + assessment.surname}
                  </span>
                  <br></br>
                  <br></br>
                  <Link to={`/app/view-assessment/${value}`}>{value}</Link>
                  <br></br>
                  <br></br>
                  <span>{assessment.email}</span>
                </div>
              );
            },
          },
        },
        {
          name: "mobile",
          label: "Mobile",
          options: {
            filter: false,
          },
        },
        {
          name: "caseHandler",
          label: "Couns.",
        },
        {
          name: "spoken",
          label: "Spoken",
          options: {
            display: false,
            customBodyRender: (value) => {
              return value.label;
            },
          },
        },
        {
          name: "studentStatus",
          label: "Details",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta) => {
              return (
                <div>
                  <span>
                    {new Date(tableMeta.rowData[6]).toLocaleDateString()}
                  </span>

                  <br></br>
                  <br></br>
                  <span>{tableMeta.rowData[5].label}</span>
                  <br></br>
                  <br></br>
                  <span>{tableMeta.rowData[3].label}</span>

                  <br></br>
                  <br></br>
                  <span>{value.label}</span>
                </div>
              );
            },
          },
        },

        {
          name: "action",
          label: "Action",
          options: {
            display: false,
            customBodyRender: (value) => {
              return value.label;
            },
          },
        },
        {
          name: "followUpDate",
          label: "Date",
          options: {
            display: false,
            filter: false,
            customBodyRender: (value) => {
              return new Date(value).toLocaleDateString();
            },
          },
        },
        {
          name: "studentStatus",
          label: "Student Status",
          options: {
            display: false,
            filter: true,
            customBodyRender: (value) => {
              return value.label;
            },
          },
        },
        {
          name: "remarks",
          label: "Remarks",
          options: {
            filter: false,
            customBodyRender: (value) => {
              return (
                <textarea className="form-control" readOnly rows="6">
                  {value}
                </textarea>
              );
            },
          },
        },
        {
          name: "nextFollowUpDate",
          label: "Next",
          options: {
            customBodyRender: (value) => {
              return new Date(value).toLocaleDateString();
            },
          },
        },
      ];

      const columns1 = [
        {
          name: "assessmentId",
          label: "Client",
          options: {
            filter: false,
            customBodyRender: (value) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == value
              );

              return (
                <div>
                  <span>
                    {assessment.first_name + " " + assessment.surname}
                  </span>
                  <br></br>
                  <br></br>
                  <Link to={`/app/view-assessment/${value}`}>{value}</Link>
                  <br></br>
                  <br></br>
                  <span>{assessment.email}</span>
                </div>
              );
            },
          },
        },
        {
          name: "mobile",
          label: "Mobile",
          options: {
            filter: false,
          },
        },
        {
          name: "caseHandler",
          label: "Couns.",
        },
        {
          name: "action",
          label: "Action",
          options: {
            customBodyRender: (value) => {
              return value.label;
            },
          },
        },
        {
          name: "followUpDate",
          label: "Date",
          options: {
            filter: false,
            customBodyRender: (value) => {
              return new Date(value).toDateString();
            },
          },
        },
      ];

      const options = {
        selectableRows: false,
        download: false,
        print: false,
        filterType: "multiselect",
      };
      if (this.role === "admin") {
        return (
          <Tabs>
            <TabList>
              <Tab>Gurdaspur</Tab>
              <Tab>Batala</Tab>
            </TabList>

            <TabPanel>
              <Tabs style={{marginTop: "30px"}}>
                <TabList>
                  <Tab>Completed</Tab>
                  <Tab>Today</Tab>
                  <Tab>Upcoming</Tab>
                  <Tab>Pending</Tab>
                </TabList>

                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of completed FollowUp(s)"}
                        data={this.adminGsp.filter(
                          (follow) => follow.remarks !== null
                        )}
                        columns={columns}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>
                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of Today FollowUp(s)"}
                        data={this.adminGsp.filter((follow) => {
                          if (
                            follow.remarks === null &&
                            new Date(
                              follow.followUpDate
                            ).toLocaleDateString() ==
                              new Date(Date.now()).toLocaleDateString()
                          )
                            return follow;
                        })}
                        columns={columns1}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>

                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of upcoming FollowUp(s)"}
                        data={this.adminGsp.filter((follow) => {
                          if (
                            follow.remarks === null &&
                            new Date(follow.followUpDate).valueOf() >
                              new Date(Date.now()).valueOf()
                          )
                            return follow;
                        })}
                        columns={columns1}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>
                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of pending FollowUp(s)"}
                        data={this.adminGsp.filter((follow) => {
                          if (
                            follow.remarks === null &&
                            new Date(follow.followUpDate).valueOf() <
                              new Date(Date.now()).valueOf()
                          )
                            return follow;
                        })}
                        columns={columns1}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs style={{marginTop: "30px"}}>
                <TabList>
                  <Tab>Completed</Tab>
                  <Tab>Today</Tab>
                  <Tab>Upcoming</Tab>
                  <Tab>Pending</Tab>
                </TabList>
                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of completed FollowUp(s)"}
                        data={this.adminBat.filter(
                          (follow) => follow.remarks !== null
                        )}
                        columns={columns}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>
                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of Today FollowUp(s)"}
                        data={this.adminBat.filter((follow) => {
                          if (
                            follow.remarks === null &&
                            new Date(
                              follow.followUpDate
                            ).toLocaleDateString() ==
                              new Date(Date.now()).toLocaleDateString()
                          )
                            return follow;
                        })}
                        columns={columns1}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>

                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of upcoming FollowUp(s)"}
                        data={this.adminBat.filter((follow) => {
                          if (
                            follow.remarks === null &&
                            new Date(follow.followUpDate).valueOf() >
                              new Date(Date.now()).valueOf()
                          )
                            return follow;
                        })}
                        columns={columns1}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>
                <TabPanel>
                  <Row>
                    <Col lg={12}>
                      <MUIDataTable
                        style={{ textTransform: "capitalize" }}
                        title={"List of pending FollowUp(s)"}
                        data={this.adminBat.filter((follow) => {
                          if (
                            follow.remarks === null &&
                            new Date(follow.followUpDate).valueOf() <
                              new Date(Date.now()).valueOf()
                          )
                            return follow;
                        })}
                        columns={columns1}
                        options={options}
                      />
                    </Col>
                  </Row>
                </TabPanel>
              </Tabs>
            </TabPanel>
          </Tabs>
        );
      }
      return (
        <div>
          <Tabs>
            <TabList>
              <Tab>Completed</Tab>
              <Tab>Today</Tab>
              <Tab>Upcoming</Tab>
              <Tab>Pending</Tab>
            </TabList>

            <TabPanel>
              <Row>
                <Col lg={12}>
                  <MUIDataTable
                    style={{ textTransform: "capitalize" }}
                    title={"List of completed FollowUp(s)"}
                    data={this.followups.filter(
                      (follow) => follow.remarks !== null
                    )}
                    columns={columns}
                    options={options}
                  />
                </Col>
              </Row>
            </TabPanel>
            <TabPanel>
              <Row>
                <Col lg={12}>
                  <MUIDataTable
                    style={{ textTransform: "capitalize" }}
                    title={"List of Today FollowUp(s)"}
                    data={this.followups.filter((follow) => {
                      if (
                        follow.remarks === null &&
                        new Date(follow.followUpDate).toLocaleDateString() ==
                          new Date(Date.now()).toLocaleDateString()
                      )
                        return follow;
                    })}
                    columns={columns1}
                    options={options}
                  />
                </Col>
              </Row>
            </TabPanel>
            <TabPanel>
              <Row>
                <Col lg={12}>
                  <MUIDataTable
                    style={{ textTransform: "capitalize" }}
                    title={"List of upcoming FollowUp(s)"}
                    data={this.followups.filter((follow) => {
                      if (
                        follow.remarks === null &&
                        new Date(follow.followUpDate).valueOf() >
                          new Date(Date.now()).valueOf()
                      )
                        return follow;
                    })}
                    columns={columns1}
                    options={options}
                  />
                </Col>
              </Row>
            </TabPanel>
            <TabPanel>
              <Row>
                <Col lg={12}>
                  <MUIDataTable
                    style={{ textTransform: "capitalize" }}
                    title={"List of pending FollowUp(s)"}
                    data={this.followups.filter((follow) => {
                      if (
                        follow.remarks === null &&
                        new Date(follow.followUpDate).valueOf() <
                          new Date(Date.now()).valueOf()
                      )
                        return follow;
                    })}
                    columns={columns1}
                    options={options}
                  />
                </Col>
              </Row>
            </TabPanel>
          </Tabs>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { assessments: state.assessment };
};
const decoratedComponent = withRouter(
  connect(mapStateToProps, {
    getActiveAssessments,
    deleteApplication: deleteApplication,
  })(AllFollowups)
);

export default decoratedComponent;
