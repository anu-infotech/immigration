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

class AllDeposits extends React.Component {
  state = { running: true };

  async componentDidMount() {
    await this.props.getActiveAssessments();

    this.user = JSON.parse(localStorage.getItem("user"));
    this.role = this.user.type;
    this.selectedBranch = localStorage.getItem("branch");

    const branches = await getBranchesList();
    this.branches = branches;

    this.branchDeposits = {};
    this.offers = [];

    /* INIT BRANCHES */
    branches.forEach((b) => {
      this.branchDeposits[b.slug] = [];
    });

    /* ADMIN → BRANCH WISE */
    this.props.assessments.forEach((assessment) => {
      const branch = assessment.location?.value;
      if (branch && this.branchDeposits[branch]) {
        assessment.deposits.forEach((dep) => {
          this.branchDeposits[branch].push(dep);
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
        assessment.deposits.forEach((dep) => {
          this.offers.push(dep);
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
            filter: false,
            download: false,
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[7]
              );
              return (
                <div>
                  <Link to={`/app/view-assessment/${tableMeta.rowData[7]}`}>
                    {assessment.first_name + " " + assessment.surname}
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
                (assessment) => assessment.ref_no == tableMeta.rowData[7]
              );
              return assessment.mobile;
            },
          },
        },
        {
          name: "dateOfIssue",
          label: "Issue Date",
          options: {
            filter: false,
            display: false,
            customBodyRender: (value) => {
              return new Date(value).toDateString();
            },
          },
        },

        {
          name: "offerLetter",
          label: "Course",
          options: {
            download: false,
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[7]
              );

              const course = assessment.offerLetters.find(
                (offer) => offer._id == value
              );
              if(course){
              return (
                <div>
                  <span>{course.university.name}</span>
                  <br></br>
                  <br></br>
                  <span>{course.course.program}</span>
                  <br></br>
                  <br></br>
                  <span>{course.intake}</span>
                  <br></br>
                  <br></br>
                  <span>{course.applicationType.label}</span>
                </div>
              );
              }
            },
          },
        },

        {
          name: "offerLetter",
          label: "Intake",
          options: {
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[7]
              );

              const course = assessment.offerLetters.find(
                (offer) => offer._id == value
              );
              if(course){
                return course.intake
              }
              
            },
            filter: true,
            sort: true,
            searchable: true,
            display: false,
          },
        },
        {
          name: "id",
          label: "Details",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
              const assessment = this.props.assessments.find(
                (assessment) => assessment.ref_no == tableMeta.rowData[7]
              );

              const deposit = assessment.deposits.find(
                (offer) => offer.id == value
              );

              return (
                <div>
                  <span>{deposit.depositType.label}</span>
                  <br></br>
                  <br></br>
                  <span>$ {deposit.amount ? deposit.amount : 0}</span>
                  <br></br>
                  <br></br>
                  <span>{deposit.bank ? deposit.bank : "N/A"}</span>
                  <br></br>
                  <br></br>
                  <span>
                    {new Date(deposit.dateOfIssue).toLocaleDateString()}
                  </span>
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
          name: "assessment",
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
          name: "assessment",
          label: "Act.",
          options: {
            filter: false,
            download: false,

            customBodyRender: (value, tableMeta) => {
              return (
                <div style={{ display: "flex" }}>
                  <div style={{ display: "flex" }}>
                    <Link
                      style={{ marginLeft: "10px" }}
                      to={`/app/view-assessment/${value}`}
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
          name: "depositType",
          label: "Method",
          options: {
            display: false,
            customBodyRender: (value) => {
              return value.label;
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
                title="Deposits"
                data={this.branchDeposits[b.slug].reverse()}
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
          title="Deposits"
          data={this.branchDeposits[this.selectedBranch].reverse()}
          columns={columns}
          options={options}
        />
      );
    }

    /* 🔹 USER */
    return (
      <MUIDataTable
        title="Deposits"
        data={this.offers.reverse()}
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
  })(AllDeposits)
);
