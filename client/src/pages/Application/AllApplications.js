import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  deleteApplication,
  getActiveAssessments,
} from "../../actions/assessment";
import PacmanLoader from "react-spinners/PacmanLoader";
import MUIDataTable from "mui-datatables";
import { Button } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesome } from "react-web-vector-icons";
import { Link } from "react-router-dom";

class AllApplications extends React.Component {
  async componentDidMount() {
    await this.props.getActiveAssessments();
    this.user         = JSON.parse(localStorage.getItem("user"));
    this.role         = this.user.type;
    this.applications = [];
    this.adminGsp     = [];
    this.adminBat     = [];

    const gurdaspurFiltered = this.props.assessments.filter((assessment) => {
      if (assessment.location.value === "gurdaspur") {
        return assessment;
      }
    });

    const allApplicationsGsp = gurdaspurFiltered.map((application) => {
      return application.applications;
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
      return application.applications;
    });

    for (let index = 0; index < allApplicationsBat.length; index++) {
      allApplicationsBat[index].map((app) => {
        return this.adminBat.push(app);
      });
    }

    const filteredItems = this.props.assessments.filter((assessment) => {
      const user  = JSON.parse(localStorage.getItem("user"));
      const email = user.email;
      if (assessment.case_handled_by) {
        if (assessment.case_handled_by.email === email) {
          return assessment;
        }
      }
    });

    const allApplications = filteredItems.map((application) => {
      return application.applications;
    });

    for (let index = 0; index < allApplications.length; index++) {
      allApplications[index].map((app) => {
        return this.applications.push(app);
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
            position      : "absolute",
            top           : "50%",
            left          : "50%",
            transform     : "translate(-50%, -50%)",
            display       : "flex",
            justifyContent: "center",
            alignItems    : "center",
          }}
        >
          <PacmanLoader size = {30} color = {"#FEB049"} loading = {true} />
        </div>
      );
    } else {
      const columns = [
        {
          name   : "name",
          label  : "Client",
          options: {
            download        : false,
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[8]
              );
              return (
                <div>
                  <Link to = {`/app/view-assessment/${tableMeta.rowData[8]}`}>
                    {value}
                  </Link>
                  <br></br>
                  <br></br>
                  <span>{assessment.ref_no}</span>
                  <br></br>
                  <br></br>
                  <span>{assessment.email}</span>
                </div>
              );
            },
          },
        },
        {
          name   : "name",
          label  : "Mobile",
          options: {
            filter          : false,
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[8]
              );
              return assessment.mobile;
            },
          },
        },
        {
          name   : "date",
          label  : "Appl Date",
          options: {
            filter          : false,
            display         : false,
            customBodyRender: (value) => {
              return new Date(value).toDateString();
            },
          },
        },

        {
          name : "applicationType",
          label: "Type",

          options: {
            display         : false,
            customBodyRender: (value) => {
              return value.label;
            },
          },
        },

        {
          name   : "course",
          label  : "Course",
          options: {
            download        : false,
            filter          : false,
            sort            : false,
            customBodyRender: (value, tableMeta) => {
              return (
                <div>
                  <span>
                    {new Date(tableMeta.rowData[2]).toLocaleDateString()}
                  </span>
                  <br></br>
                  <br></br>
                  <span>{value.university.label}</span>
                  <br></br>
                  <br></br>
                  <span>{value.program}</span>
                  <br></br>
                  <br></br>
                  <span>{tableMeta.rowData[3].label}</span>
                </div>
              );
            },
          },
        },

        {
          name   : "intake",
          label  : "Intake",
          options: {
            filter    : true,
            sort      : true,
            searchable: true,
            display   : false,
          },
        },
        {
          name   : "status",
          label  : "Intake/Status",
          options: {
            customBodyRender: (value, tableMeta) => {
              return (
                <div>
                  <span>{tableMeta.rowData[5]}</span>
                  <br></br>
                  <br></br>
                  <span>{value.label}</span>
                </div>
              );
            },
          },
        },

        {
          name   : "caseHandler",
          label  : "Couns.",
          options: {
            customBodyRender: (value) => {
              return <a href = {`mailto:${value}`}>{value}</a>;
            },
          },
        },

        {
          name   : "assessmentId",
          label  : "Couns.",
          options: {
            filter  : false,
            download: false,

            display: "excluded",
          },
        },
        {
          name   : "remarks",
          label  : "Remarks",
          options: {
            filter          : false,
            customBodyRender: (value) => {
              return (
                <textarea className = "form-control" readOnly cols = {12} rows = {7}>
                  {value}
                </textarea>
              );
            },
          },
        },
        {
          name   : "_id",
          label  : "Act.",
          options: {
            filter  : false,
            download: false,

            customBodyRender: (value, tableMeta) => {
              return (
                <div style = {{ display: "flex" }}>
                <div style = {{ display: "flex" }}>
                    <Link
                      disabled = {true}
                      style    = {{ marginLeft: "10px" }}
                      to       = {`/app/application/view/${tableMeta.rowData[8]}/${value}`}
                    >
                      <FontAwesome
                        name  = "arrow-circle-right"
                        color = "green"
                        size  = {20}
                      />
                    </Link>
                  </div>
                </div>
              );
            },
          },
        },

        {
          name   : "course",
          label  : "Course",
          options: {
            customBodyRender: (value) => {
              return value.program;
            },
            display   : false,
            filter    : true,
            sort      : true,
            searchable: true,
          },
        },
      ];

      const options = {
        selectableRows: false,
        download      : false,
        print         : false,
        filterType    : "multiselect",
        onDownload    : (buildHead, buildBody, columns, data) => {
          return "\uFEFF" + buildHead(columns) + buildBody(data);
        },
      };
      if (this.role === "admin") {
        return (
          <Tabs>
            <TabList>
              <Tab>Gurdaspur</Tab>
              <Tab>Batala</Tab>
            </TabList>

            <TabPanel>
              <div>
                <MUIDataTable
                  title   = {"Applications"}
                  data    = {this.adminGsp.reverse()}
                  columns = {columns}
                  options = {options}
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <MUIDataTable
                  title   = {"Applications"}
                  data    = {this.adminBat.reverse()}
                  columns = {columns}
                  options = {options}
                />
              </div>
            </TabPanel>
          </Tabs>
        );
      }
      return (
        <div>
          <MUIDataTable
            title   = {"Applications"}
            data    = {this.applications.reverse()}
            columns = {columns}
            options = {options}
          />
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
  })(AllApplications)
);

export default decoratedComponent;
