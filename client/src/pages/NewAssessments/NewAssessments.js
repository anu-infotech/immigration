import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { deleteAssessment, getNewAssessments } from "../../actions/assessment";
import PacmanLoader from "react-spinners/PacmanLoader";
import MUIDataTable from "mui-datatables";
import { Button } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { getBranchesList } from "../../actions/branches";
class NewAssessments extends React.Component {
  state = { running: true };

  constructor(props) {
    super(props);
    this.state.running = true;
  }

  async componentDidMount() {
    await this.props.getNewAssessments();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.role = this.user.type;
    const branches = await getBranchesList();
    this.branches = branches;

    this.selected_branch = localStorage.getItem("branch");

    this.setState({ running: false });
  }

  render() {
    if (!this.props.assessments || this.state.running == true) {
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
            filter: true,
            sort: true,
          },
        },
        {
          name: "status_updates",
          label: "Date",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value) => {
              return new Date(value[0].date).toLocaleDateString();
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
                    className={this.role == 'admin'?'':'d-none'}
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

      if (this.role === "admin") {
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
                  title={"New Assessments"}
                  data={this.props.assessments
                    .reverse()
                    .filter(
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
        return(
          <div>
            <MUIDataTable
                  title={"New Assessments"}
                  data={this.props.assessments
                    .reverse()
                    .filter(
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
            title={"New Assessments"}
            data={this.props.assessments}
            columns={columns}
            options={options}
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
    getNewAssessments,
    deleteAssessment: deleteAssessment,
  })(NewAssessments)
);

export default decoratedComponent;
