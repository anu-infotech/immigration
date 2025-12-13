import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  deleteAssessment,
  getActiveVisaAssessments,
} from "../../actions/assessment";
import PacmanLoader from "react-spinners/PacmanLoader";
import MUIDataTable from "mui-datatables";
import { Button } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getAdmins } from "../../actions/users";
import { getBranchesList } from "../../actions/branches";

class VisaReceived extends React.Component {
  async componentDidMount() {
    await this.props.getActiveVisaAssessments();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.role = this.user.type;
    const branches = await getBranchesList();
    this.branches = branches;
    this.setState({ running: false });

    this.selected_branch = localStorage.getItem("branch");

    
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
          <PacmanLoader size={30} color={"#29166F"} loading={true} />
        </div>
      );
    } else {
      const columns = [
        {
          name: "ref_no",
          label: "Reference No.",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "first_name",
          label: "First name",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "visas",
          label: "status",
          options: {
            customBodyRender: (visas) => {
              if (!visas || visas.length === 0) return "-";
              return <span>{visas[0].status?.value || "-"}</span>;
            },
          },
        },
        {
          name: "country_apply_for",
          label: "Apply For",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return <span>{value.label}</span>;
            },
          },
        },
        {
          name: "case_handled_by",
          label: "Counsellors",
          options: {
            display: false,
            filter: true,
            customBodyRender: (value) => {
              return value.email;
            },
          },
        },
        {
          name: "case_handled_by",
          label: "Case Handler",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <span>
                  <span>{value ? value.name : "N/A"}</span>
                  <br></br>
                  <small>{value ? value.email : "N/A"}</small>
                </span>
              );
            },
          },
        },
        {
          name: "photo",
          label: "Photo",
          options: {
            filter: false,
            customBodyRender: (value) => {
              if (value) {
                return (
                  <img
                    src={value}
                    style={{
                      height: "120px",
                      width: "120px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                );
              } else {
                return "N/A";
              }
            },
          },
        },
        {
          name: "ref_no",
          label: "View",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <React.Fragment>
                  <Button
                    color="success"
                    size={"sm"}
                    onClick={() => {
                      const win = window.open(
                        "/#/app/view-assessment/" + value,
                        "_blank"
                      );
                      win.focus();
                    }}
                  >
                    View
                  </Button>
                  <Button
                    color="danger"
                    style={{ marginLeft: "10px" }}
                    size={"sm"}
                    onClick={async () => {
                      const confirm = window.confirm(
                        "Are you sure you want to proceed. Once deleted the data can not be reterieved back."
                      );
                      if (confirm) {
                        const confirm2 = window.confirm(
                          "You are about to delete this file. All data will be lost."
                        );

                        if (confirm2) {
                          this.setState({ running: true });
                          await this.props.deleteAssessment(value);
                          this.setState({ running: false });
                        } else {
                          return false;
                        }
                      } else {
                        return false;
                      }
                    }}
                  >
                    Delete
                  </Button>
                </React.Fragment>
              );
            },
          },
        },
      ];

      const options = {
        selectableRows: false,
        print: false,
        download: false,
      };
      if (this.role === "admin" || this.role === "Admission") {
        return (
          <Tabs>
            <TabList>
              {this.branches.map((item, index) => (
                <Tab>{item.name}</Tab>
              ))}
            </TabList>

            {this.branches.map((item, index) => (
            <TabPanel>
              <div>
                <MUIDataTable
                  title={"Visa Received Assessments"}
                  data={this.props.assessments.filter(
                    (assessment) => assessment.location.value === item.slug
                  )}
                  columns={columns}
                  options={options}
                />
              </div>
            </TabPanel>
             ))}
  
          </Tabs>
        );
      }
      if(this.role == 'manager'){
        return (
          <div>
              <MUIDataTable
                  title={"Visa Received Assessments"}
                  data={this.props.assessments.filter(
                    (assessment) => assessment.location.value === this.selected_branch
                  )}
                  columns={columns}
                  options={options}
                />
          </div>
        )
      }
      return (
        <div>
          <MUIDataTable
            title={"Visa Received Assessments"}
            data={this.props.assessments.filter((assessment) => {
              const user = JSON.parse(localStorage.getItem("user"));
              const email = user.email;
              if (assessment.case_handled_by) {
                if (assessment.case_handled_by.email === email) {
                  return assessment;
                }
              }
            })}
            columns={columns}
            options={options}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { assessments: state.assessment ? state.assessment.reverse() : [] };
};
const decoratedComponent = withRouter(
  connect(mapStateToProps, {
    getActiveVisaAssessments,
    deleteAssessment,
    getAdmins: getAdmins,
  })(VisaReceived)
);

export default decoratedComponent;
