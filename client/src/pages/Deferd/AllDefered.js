import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  deleteApplication,
  getActiveAssessments,
} from "../../actions/assessment";
import PacmanLoader from "react-spinners/PacmanLoader";
import MUIDataTable from "mui-datatables";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FontAwesome } from "react-web-vector-icons";
import { Link } from "react-router-dom";
import { getBranchesList } from "../../actions/branches";

class AllDeferedApplications extends React.Component {
  state = { running: true };

  async componentDidMount() {
    await this.props.getActiveAssessments();

    this.user = JSON.parse(localStorage.getItem("user"));
    this.role = this.user.type;
    this.selectedBranch = localStorage.getItem("branch");

    const branches = await getBranchesList();
    this.branches = branches;

    this.branchApplications = {};
    this.applications = [];

    /* INIT BRANCHES */
    branches.forEach((b) => {
      this.branchApplications[b.slug] = [];
    });

    /* ADMIN → BRANCH WISE */
    this.props.assessments.forEach((assessment) => {
      const branch = assessment.location?.value;
      if (branch && this.branchApplications[branch]) {
        assessment.applications.forEach((app) => {
          if (app.applicationType.value === "Defer") {
            this.branchApplications[branch].push(app);
          }
        });
      }
    });

    /* NON-ADMIN → OWN */
    const email = this.user.email;
    this.props.assessments.forEach((assessment) => {
      if (
        assessment.case_handled_by &&
        assessment.case_handled_by.email === email
      ) {
        assessment.applications.forEach((app) => {
          if (app.applicationType.value === "Defer") {
            this.applications.push(app);
          }
        });
      }
    });

    this.setState({ running: false });
  }

  render() {
    if (!this.props.assessments || this.state.running) {
      return (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <PacmanLoader size={30} color={"#FEB049"} loading />
        </div>
      );
    }

     const columns = [
        {
          name: "name",
          label: "Client",
          options: {
            download: false,
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[8]
              );
              return (
                <div>
                  <Link to={`/app/view-assessment/${tableMeta.rowData[8]}`}>
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
          name: "name",
          label: "Mobile",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[8]
              );
              return assessment.mobile;
            },
          },
        },
        {
          name: "date",
          label: "Appl Date",
          options: {
            filter: false,
            display: false,
            customBodyRender: (value) => {
              return new Date(value).toDateString();
            },
          },
        },

        {
          name: "applicationType",
          label: "Type",

          options: {
            display: false,
            customBodyRender: (value) => {
              return value.label;
            },
          },
        },

        {
          name: "course",
          label: "Course",
          options: {
            download: false,
            filter: false,
            sort: false,
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
          name: "intake",
          label: "Intake",
          options: {
            filter: true,
            sort: true,
            searchable: true,
            display: false,
          },
        },
        {
          name: "status",
          label: "Intake/Status",
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
          name: "caseHandler",
          label: "Couns.",
          options: {
            customBodyRender: (value) => {
              return <a href={`mailto:${value}`}>{value}</a>;
            },
          },
        },

        {
          name: "assessmentId",
          label: "Couns.",
          options: {
            filter: false,
            download: false,

            display: "excluded",
          },
        },
        {
          name: "remarks",
          label: "Remarks",
          options: {
            filter: false,
            customBodyRender: (value) => {
              return (
                <textarea className="form-control" readOnly cols={12} rows={7}>
                  {value}
                </textarea>
              );
            },
          },
        },
        {
          name: "_id",
          label: "Act.",
          options: {
            filter: false,
            download: false,

            customBodyRender: (value, tableMeta) => {
              return (
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <Link
                      disabled={true}
                      style={{ marginLeft: "10px" }}
                      to={`/app/application/view/${tableMeta.rowData[8]}/${value}`}
                    >
                      <FontAwesome
                        name="arrow-circle-right"
                        color="green"
                        size={20}
                      />
                    </Link>
                  </div>
                </div>
              );
            },
          },
        },

        {
          name: "course",
          label: "Course",
          options: {
            customBodyRender: (value) => {
              return value.program;
            },
            display: false,
            filter: true,
            sort: true,
            searchable: true,
          },
        },
      ];

    const options = {
      selectableRows: false,
      download: false,
      print: false,
      filterType: "multiselect",
    };

    /* 🔹 ADMIN */
    if (this.role === "admin") {
      return (
        <Tabs>
          <TabList>
            {this.branches.map((b) => (
              <Tab key={b.slug}>{b.name}</Tab>
            ))}
          </TabList>

          {this.branches.map((b) => (
            <TabPanel key={b.slug}>
              <MUIDataTable
                title="Deferred Applications"
                data={this.branchApplications[b.slug].reverse()}
                columns={columns}
                options={options}
              />
            </TabPanel>
          ))}
        </Tabs>
      );
    }

    /* 🔹 MANAGER */
    if (this.role === "manager") {
      return (
        <MUIDataTable
          title="Deferred Applications"
          data={this.branchApplications[this.selectedBranch].reverse()}
          columns={columns}
          options={options}
        />
      );
    }

    /* 🔹 USER */
    return (
      <MUIDataTable
        title="Deferred Applications"
        data={this.applications.reverse()}
        columns={columns}
        options={options}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  assessments: state.assessment,
});

export default withRouter(
  connect(mapStateToProps, {
    getActiveAssessments,
    deleteApplication,
  })(AllDeferedApplications)
);
