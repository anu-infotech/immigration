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
  editQualification,
} from "../../../actions/assessment";

const EditQualification = ({
  handleSubmit,
  addQualification,
  assessment,
  editQualification,
  closeModal,
  initialValues,
}) => {
  const [adding, setAdding] = useState(false);
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
          padding: "100px",
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
            await editQualification(assessment.ref_no, data, initialValues._id);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Edit Qualification</p>}
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

  return <div>{renderModal()}</div>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    assessment: state.singleAssessment,
    initialValues: ownProps.initialValues,
  };
};

const decoratedComponent = connect(mapStateToProps, {
  editQualification,
})(EditQualification);

export default reduxForm({
  form: "editQualification",
  destroyOnUnmount: true,
})(decoratedComponent);
