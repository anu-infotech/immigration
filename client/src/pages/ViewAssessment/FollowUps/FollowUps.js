import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { followUpFileds } from "../fields";
import { renderInput, renderSelect } from "../../../renderInputs";
import { addFollowup, deleteFollowUp } from "../../../actions/assessment";
import EditQualification from "./EditFollowUps";
import EditFollowUps from "./EditFollowUps";
import Switch from "react-switch";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const FollowUps = ({
  handleSubmit,
  addFollowup,
  assessment,
  deleteFollowUp,
}) => {
  const [modal, setModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const closeModal = () => {
    setModal(false);
    setSelected(null);
    setEdit(false);
  };
  const columns = [
    {
      name: "spoken",
      label: "Spoken",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "studentStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
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
        customBodyRender: (value) => {
          return new Date(value).toDateString();
        },
      },
    },
    {
      name: "remarks",
      label: "Remarks",
      options: {
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
      label: "Next Followip",
      options: {
        customBodyRender: (value) => {
          return value ? new Date(value).toDateString() : "Not Scheduled";
        },
      },
    },
    {
      name: "_id",
      label: "Act.",
      options: {
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  const sure = window.confirm(
                    "Are you sure you want to delete this entry?"
                  );
                  if (sure) {
                    deleteFollowUp(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
              <div
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={() => {
                  setSelected(value);
                  setEdit(true);
                }}
              >
                <FontAwesome name="pencil" color="#29166F" size={18} />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const columns1 = [
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
      name: "name",
      label: "Name",
    },
    {
      name: "mobile",
      label: "Mobile",
    },
    {
      name: "followUpDate",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toDateString();
        },
      },
    },
    {
      name: "_id",
      label: "Act.",
      options: {
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  const sure = window.confirm(
                    "Are you sure you want to delete this entry?"
                  );
                  if (sure) {
                    deleteFollowUp(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
              <div
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={() => {
                  setSelected(value);
                  setEdit(true);
                }}
              >
                <FontAwesome name="pencil" color="#29166F" size={18} />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
  };

  const renderFields = () => {
    return followUpFileds.map((field) => {
      if (field.type === "select") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderSelect}
              label={field.label.toUpperCase()}
              type={field.type}
              options={field.options}
              required={field.required}
            />
          </Col>
        );
      }

      return (
        <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
          <Field
            name={field.name}
            component={renderInput}
            label={field.label.toUpperCase()}
            type={field.type}
            required={field.required}
          />
        </Col>
      );
    });
  };

  const renderModal = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(41, 22, 111, 0.4)",
          zIndex: 10000000000000,
          display: modal ? "block" : "none",
          padding: "150px",
        }}
      >
        <div
          onClick={() => closeModal()}
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
          <FontAwesome name="remove" color="white" size={22} />
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            if (data.nextFollowUpDate && !data.nextAction) {
              return alert(
                "You have selected next followup date please select type of follow up"
              );
            }
            if (!data.nextFollowUpDate && data.nextAction) {
              return alert(
                "You have selected next followup type please select next follow up date"
              );
            }
            setAdding(true);
            data.assessmentId = assessment.ref_no;
            data.name = assessment.first_name + " " + assessment.surname;
            data.caseHandler = assessment.case_handled_by.email;
            data.mobile = assessment.mobile;
            await addFollowup(assessment.ref_no, data);
            setAdding(false);
            return closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Add Follow Up</p>}
              >
                <Row>{renderFields()}</Row>
                <Row style={{ textAlign: "center", marginTop: "20px" }}>
                  <Col sm={12} md={12} lg={12}>
                    <Button type="submit" color="success" size={"lg"}>
                      {adding === false ? "Save" : "Please wait..."}
                    </Button>
                  </Col>
                </Row>
              </Widget>
            </Col>
          </Row>
        </form>
      </div>
    );
  };

  return (
    <div>
      {edit ? (
        <EditFollowUps
          initialValues={assessment.followUps.find((follow) => {
            if (follow._id == selected) {
              if (follow.nextFollowUpDate) {
                function pad(n) {
                  return n < 10 ? "0" + n : n;
                }
                const year = new Date(follow.nextFollowUpDate).getFullYear();
                const month = new Date(follow.nextFollowUpDate).getMonth();
                const day = new Date(follow.nextFollowUpDate).getDate();
                follow.nextFollowUpDate =
                  year + "-" + pad(month + 1) + "-" + pad(day);
              } else {
                follow.nextFollowUpDate = null;
              }

              return follow;
            }
          })}
          closeModal={closeModal}
        />
      ) : (
        renderModal()
      )}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Follow Up(s)</p>}
          >
            <Tabs>
              <TabList>
                <Tab>Completed</Tab>
                <Tab>Today</Tab>
                <Tab>Upcoming</Tab>
                <Tab>Pending</Tab>
              </TabList>

              <TabPanel>
                <Row style={{ marginBottom: "15px", textAlign: "right" }}>
                  <Col lg={12}>
                    <Button
                      color="success"
                      size="md"
                      onClick={() => {
                        setModal(true);
                      }}
                    >
                      Add FollowUp
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"List of completed FollowUp(s)"}
                      data={assessment.followUps.filter(
                        (follow) => follow.remarks !== null
                      )}
                      columns={columns}
                      options={options}
                    />
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel>
                <Row style={{ marginBottom: "15px", textAlign: "right" }}></Row>
                <Row>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"List of Today FollowUp(s)"}
                      data={assessment.followUps.filter((follow) => {
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
                <Row style={{ marginBottom: "15px", textAlign: "right" }}></Row>
                <Row>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"List of upcoming FollowUp(s)"}
                      data={assessment.followUps.filter((follow) => {
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
                <Row style={{ marginBottom: "15px", textAlign: "right" }}></Row>
                <Row>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"List of pending FollowUp(s)"}
                      data={assessment.followUps.filter((follow) => {
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
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { assessment: state.singleAssessment };
};

const decoratedComponent = connect(mapStateToProps, {
  addFollowup: addFollowup,
  deleteFollowUp,
})(FollowUps);

export default reduxForm({
  form: "addFollowups",
  destroyOnUnmount: true,
})(decoratedComponent);
