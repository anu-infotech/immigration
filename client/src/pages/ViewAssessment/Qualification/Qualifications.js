import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { qualificationFields } from "../fields";
import { renderInput } from "../../../renderInputs";
import {
  addQualification,
  deleteQualification,
} from "../../../actions/assessment";
import EditQualification from "./EditQualification";

const Qualifications = ({
  handleSubmit,
  addQualification,
  assessment,
  deleteQualification,
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
      name: "qualification",
      label: "Qualification",
    },
    { name: "courseStudied", label: "Course Studied" },
    { name: "uniOrBoard", label: "University/Board" },
    { name: "grade", label: "%age" },
    { name: "startingYear", label: "S. Year" },
    { name: "startingMonth", label: "S. Month" },
    { name: "passingYear", label: "P. Year" },
    { name: "passingMonth", label: "P. Month" },
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
                    deleteQualification(assessment.ref_no, value);
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
    return qualificationFields.map((field) => {
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
            setAdding(true);
            await addQualification(assessment.ref_no, data);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Add Qualification</p>}
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
        <EditQualification
          initialValues={assessment.qualifications.find(
            (qual) => qual._id == selected
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
            title={<p className={"fw-bold"}>Qualification(s)</p>}
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
                  Add Qualification
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  style={{ textTransform: "capitalize" }}
                  title={"List of Qualification(s)"}
                  data={assessment.qualifications}
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
  addQualification: addQualification,
  deleteQualification,
})(Qualifications);

export default reduxForm({
  form: "addQualifications",
  destroyOnUnmount: true,
})(decoratedComponent);
