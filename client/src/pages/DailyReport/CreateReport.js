import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Label, Row } from "reactstrap";
import { reduxForm } from "redux-form";
import Widget from "../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import Select from "react-select";
import "./style.css";
import { addDailyReport, getUser } from "../../actions/assessment";
const CreateDailyReport = ({ handleSubmit, user, addDailyReport, getUser }) => {
  const [modal, setModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [file, setFile] = useState(null);
  const [addInfo, setInfo] = useState(null);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getUser(user.email);
  }, []);

  const columns = [
    {
      name: "task",
      label: "Task",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },

    {
      name: "task",
      label: "Time",
      options: {
        customBodyRender: (value) => {
          return value.value;
        },
      },
    },

    {
      name: "document",
      label: "Supporting File",
      options: {
        customBodyRender: (value) => {
          return <a href={value}>Document</a>;
        },
      },
    },

    {
      name: "addInfo",
      label: "Additional Information",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={7} cols={12} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
  };

  const closeModal = () => {
    setModal(false);
  };

  const renderFields = () => {
    return (
      <React.Fragment>
        <Col sm={12} md={6} lg={12} style={{ marginTop: "20px" }}>
          <Label htmlFor="">Task</Label>
          <Select
            onChange={(value) => {
              setTask(value);
            }}
            onBlur={(event) => event.preventDefault()}
            options={[
              { value: 20, label: "Al Uploading" },
              { value: 20, label: "Email" },
              { value: 20, label: "External Training" },
              { value: 20, label: "Internal Training" },
              { value: 20, label: "Interview prepration" },
              { value: 20, label: "More Docs Op's" },
              { value: 20, label: "Other Tasks" },
              { value: 20, label: "Report Compilation" },
              { value: 20, label: "SOP Review editing" },
              { value: 20, label: "Team Meeting" },
            ]}
            className="select"
          />
        </Col>
        <Col sm={12} md={6} lg={12} style={{ marginTop: "20px" }}>
          <Label htmlFor="">Additional information</Label>
          <textarea
            className="form-control"
            placeholder="Add Additional information"
            onChange={(e) => setInfo(e.target.value)}
          ></textarea>
        </Col>
        <Col sm={12} md={6} lg={12} style={{ marginTop: "20px" }}>
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <label for="file">
            {file ? file.name : "Click to upload supporting document"}
          </label>
        </Col>
      </React.Fragment>
    );
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
          backgroundColor: "rgba(254, 176, 73, 0.4)",
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
            setAdding(true);
            const user = JSON.parse(localStorage.getItem("user"));
            const formData = new FormData();
            // Update the formData object
            const formValues = {
              file,
              addInfo,
              task,
            };
            if (file) {
              formData.append("file", file, file.name);
            }
            formData.append("formValues", JSON.stringify(formValues));
            setAdding(true);
            await addDailyReport(user.email, formData);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Add Daily Report</p>}
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
    <Row style={{ marginTop: "15px" }}>
      {renderModal()}
      <Col sm={12}>
        <Widget
          customDropDown
          title={<p className={"fw-bold"}>Daily Reports(s)</p>}
        >
          <Row style={{ marginBottom: "15px", textAlign: "right" }}>
            <Col lg={12}>
              <Button
                color="success"
                size="md"
                onClick={() => {
                  setModal(true);
                }}
              >
                Add Report
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <MUIDataTable
                style={{ textTransform: "capitalize" }}
                title={"List of Report(s)"}
                data={user ? user.dailyReportExtended.reverse() : []}
                columns={columns}
                options={options}
              />
            </Col>
          </Row>
        </Widget>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const decoratedComponent = connect(mapStateToProps, {
  addDailyReport,
  getUser: getUser,
})(CreateDailyReport);

export default reduxForm({
  form: "addReport",
})(decoratedComponent);
