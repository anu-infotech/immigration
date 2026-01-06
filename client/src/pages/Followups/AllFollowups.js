import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  deleteApplication,
  getActiveAssessments,
} from "../../actions/assessment";
import PacmanLoader from "react-spinners/PacmanLoader";
import MUIDataTable from "mui-datatables";
import { Col, Row } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import { getBranchesList } from "../../actions/branches";

class AllFollowups extends React.Component {
  state = { running: true };

  async componentDidMount() {
    await this.props.getActiveAssessments();

    this.user = JSON.parse(localStorage.getItem("user"));
    this.selectedBranch = localStorage.getItem("branch");
    this.role = this.user.type;

    const branches = await getBranchesList();
    this.branches = branches;


    this.followups = [];
    this.branchFollowups = {};

    /* init branches */
    branches.forEach((b) => {
      this.branchFollowups[b.slug] = [];
    });

    /* ADMIN → branch-wise followups */
    this.props.assessments.forEach((assessment) => {
      const branch = assessment.location?.value;
      if (branch && this.branchFollowups[branch]) {
        assessment.followUps.forEach((fu) => {
          this.branchFollowups[branch].push(fu);
        });
      }
    });

    console.log(this.branchFollowups);

    /* NON-ADMIN → own followups */
    const email = this.user.email;
    this.props.assessments.forEach((assessment) => {
      if (
        assessment.case_handled_by &&
        assessment.case_handled_by.email === email
      ) {
        assessment.followUps.forEach((fu) => {
          this.followups.push(fu);
        });
      }
    });

    this.setState({ running: false });
  }

  /* 🔹 FILTER HELPERS */
  filterFollowups = (data, type) => {
    const today = new Date().toLocaleDateString();

    return data.filter((follow) => {
      const date = new Date(follow.followUpDate);

      if (type === "completed") return follow.remarks !== null;
      if (type === "today")
        return (
          follow.remarks === null &&
          date.toLocaleDateString() === today
        );
      if (type === "upcoming")
        return follow.remarks === null && date > new Date();
      if (type === "pending")
        return follow.remarks === null && date < new Date();

      return false;
    });
  };

  render() {
    if (!this.props.assessments || this.state.running) {
      return (
        <div style={{ position: "absolute", top: "50%", left: "50%" }}>
          <PacmanLoader size={30} color={"#FEB049"} loading />
        </div>
      );
    }

    /* 🔹 COLUMNS (UNCHANGED) */
    const columns = [
      {
        name: "assessmentId",
        label: "Client",
        options: {
          filter: false,
          customBodyRender: (value) => {
            const assessment = this.props.assessments.find(
              (a) => a.ref_no == value
            );
            return (
              <div>
                <b>{assessment.first_name} {assessment.surname}</b>
                <br /><br />
                <Link to={`/app/view-assessment/${value}`}>{value}</Link>
                <br /><br />
                {assessment.email}
              </div>
            );
          },
        },
      },
      { name: "mobile", label: "Mobile" },
      { name: "caseHandler", label: "Couns." },
      {
        name: "remarks",
        label: "Remarks",
        options: {
          customBodyRender: (v) => (
            <textarea className="form-control" rows="6" readOnly>
              {v}
            </textarea>
          ),
        },
      },
      {
        name: "nextFollowUpDate",
        label: "Next",
        options: {
          customBodyRender: (v) => new Date(v).toLocaleDateString(),
        },
      },
    ];

    const options = {
      selectableRows: false,
      download: false,
      print: false,
      filterType: "multiselect",
    };

    /* 🔹 ADMIN VIEW */
    if (this.role === "admin") {
      return (
        <Tabs>
          <TabList>
            {this.branches.map((b) => (
              <Tab key={b.slug}>{b.name}</Tab>
            ))}
          </TabList>

          {this.branches.map((branch) => (
            <TabPanel key={branch.slug}>
              <Tabs style={{ marginTop: "30px" }}>
                <TabList>
                  <Tab>Completed</Tab>
                  <Tab>Today</Tab>
                  <Tab>Upcoming</Tab>
                  <Tab>Pending</Tab>
                </TabList>

                {["completed", "today", "upcoming", "pending"].map((type) => (
                  <TabPanel key={type}>
                    <Row>
                      <Col lg={12}>
                        <MUIDataTable
                          title={`List of ${type} FollowUp(s)`}
                          data={this.filterFollowups(
                            this.branchFollowups[branch.slug],
                            type
                          )}
                          columns={columns}
                          options={options}
                        />
                      </Col>
                    </Row>
                  </TabPanel>
                ))}
              </Tabs>
            </TabPanel>
          ))}
        </Tabs>
      );
    }

    /* 🔹 ADMIN VIEW */
    if (this.role === "manager") {
      return (
        <Tabs>
        <TabList>
          <Tab>Completed</Tab>
          <Tab>Today</Tab>
          <Tab>Upcoming</Tab>
          <Tab>Pending</Tab>
        </TabList>

        {["completed", "today", "upcoming", "pending"].map((type) => (
          <TabPanel key={type}>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                    title={`List of ${type} FollowUp(s)`}
                    data={this.filterFollowups(
                      this.branchFollowups[this.selectedBranch],
                      type
                    )}
                    columns={columns}
                    options={options}
                  />
              </Col>
            </Row>
          </TabPanel>
        ))}
      </Tabs>
      );
    }

    /* 🔹 NON-ADMIN VIEW */
    return (
      <Tabs>
        <TabList>
          <Tab>Completed</Tab>
          <Tab>Today</Tab>
          <Tab>Upcoming</Tab>
          <Tab>Pending</Tab>
        </TabList>

        {["completed", "today", "upcoming", "pending"].map((type) => (
          <TabPanel key={type}>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  title={`List of ${type} FollowUp(s)`}
                  data={this.filterFollowups(this.followups, type)}
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </TabPanel>
        ))}
      </Tabs>
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
  })(AllFollowups)
);
