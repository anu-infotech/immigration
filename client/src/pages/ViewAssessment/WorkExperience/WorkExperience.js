import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import {
  addWorkExperience,
  deleteWorkExperience,
} from "../../../actions/assessment";
import Widget from "../../../components/Widget";
import { workFields } from "../fields";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { renderInput } from "../../../renderInputs";
import EditWork from "./EditWork";

const WorkExperience = ({
  handleSubmit,
  addWorkExperience,
  assessment,
  deleteWorkExperience,
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
    { name: "companyName", label: "Company Name" },
    { name: "city", label: "City" },
    { name: "designation", label: "Designation" },
    {
      name: "fromYear",
      label: "From Year",
    },
    {
      name: "fromMonth",
      label: "From Month",
    },
    {
      name: "toYear",
      label: "To Year",
    },
    {
      name: "toMonth",
      label: "To Month",
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
                    deleteWorkExperience(assessment.ref_no, value);
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
                <FontAwesome name="pencil" color="orange" size={18} />
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
    return workFields.map((field) => {
      return (
        <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
          <Field
            name={field.name}
            component={renderInput}
            label={field.label.toUpperCase()}
            type={field.type}
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
            await addWorkExperience(assessment.ref_no, data);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Add Work Experience</p>}
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
        <EditWork
          initialValues={assessment.workExperience.find(
            (work) => work._id == selected
          )}
          closeModal={closeModal}
        />
      ) : (
        renderModal()
      )}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Work Experience(s)</p>}
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
                  Add Work Experience
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  title={"List of work experience(s)"}
                  data={assessment.workExperience}
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
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
  addWorkExperience,
  deleteWorkExperience,
})(WorkExperience);

export default reduxForm({
  form: "addWork",
  destroyOnUnmount: true,
})(decoratedComponent);
