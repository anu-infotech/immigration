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
import { createDataSet } from "./createExcel";
import { getBranchesList } from "../../actions/branches";

class AllOfferLetters extends React.Component {
  state = { running: true };

  async componentDidMount() {
    await this.props.getActiveAssessments();

    this.user = JSON.parse(localStorage.getItem("user"));
    this.selectedBranch = localStorage.getItem("branch");
    this.role = this.user.type;

    const branches = await getBranchesList();
    this.branches = branches;

    this.offers = [];
    this.branchOffers = {};

    /* INIT BRANCH BUCKETS */
    branches.forEach((b) => {
      this.branchOffers[b.slug] = [];
    });

    /* ADMIN / MANAGER → BRANCH-WISE OFFERS */
    this.props.assessments.forEach((assessment) => {
      const branch = assessment.location?.value;
      if (branch && this.branchOffers[branch]) {
        assessment.offerLetters.forEach((offer) => {
          this.branchOffers[branch].push(offer);
        });
      }
    });

    /* NON-ADMIN → OWN OFFERS */
    const email = this.user.email;
    this.props.assessments.forEach((assessment) => {
      if (
        assessment.case_handled_by &&
        assessment.case_handled_by.email === email
      ) {
        assessment.offerLetters.forEach((offer) => {
          this.offers.push(offer);
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
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta) => {
              return (
                <div>
                  <span>{tableMeta.rowData[5]}</span>
                  <br></br>
                  <br></br>
                  <span>{value.label}</span>
                  <br></br>
                  <br></br>
                  <span>
                    <a href={tableMeta.rowData[13]} target='_blank'>
                      Offer Letter
                    </a>
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
                <textarea className='form-control' readOnly cols={12} rows={7}>
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
                      to={`/app/view-assessment/${tableMeta.rowData[8]}`}
                    >
                      <FontAwesome
                        name='arrow-circle-right'
                        color='green'
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

        {
          name: "status",
          label: "Status",
          options: {
            filter: true,
            display: false,
            customBodyRender: (value) => {
              return value.label;
            },
          },
        },

        {
          name: "offerLetterUri",
          label: "Offer",
          options: {
            filter: false,
            display: false,
          },
        },
      ];

    const options = {
      selectableRows: false,
      download: false,
      print: false,
      filterType: "multiselect",
      onDownload: (buildHead, buildBody, columns, data) =>
        "\uFEFF" + buildHead(columns) + buildBody(data),
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
              {createDataSet([...this.branchOffers[branch.slug]].reverse())}
              <MUIDataTable
                title="Applications"
                data={[...this.branchOffers[branch.slug]].reverse()}
                columns={columns}
                options={options}
              />
            </TabPanel>
          ))}
        </Tabs>
      );
    }

    /* 🔹 MANAGER VIEW (SELECTED BRANCH) */
    if (this.role === "manager") {
      return (
        <div>
          {createDataSet(
            [...this.branchOffers[this.selectedBranch]].reverse()
          )}
          <MUIDataTable
            title="Applications"
            data={[...this.branchOffers[this.selectedBranch]].reverse()}
            columns={columns}
            options={options}
          />
        </div>
      );
    }

    /* 🔹 NON-ADMIN VIEW */
    return (
      <div>
        {createDataSet([...this.offers].reverse())}
        <MUIDataTable
          title="Applications"
          data={[...this.offers].reverse()}
          columns={columns}
          options={options}
        />
      </div>
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
  })(AllOfferLetters)
);
