import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { followUpFileds } from "../fields";
import { renderInput, renderSelect } from "../../../renderInputs";
import { addQualification, editFollowUp } from "../../../actions/assessment";

const EditFollowUp = ({
  handleSubmit,
  assessment,
  editFollowUp,
  closeModal,
  initialValues,
}) => {
  const [adding, setAdding] = useState(false);
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
            await editFollowUp(assessment.ref_no, data, initialValues._id);
            setAdding(false);
            return closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Edit Follow Up</p>}
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
  editFollowUp,
})(EditFollowUp);

export default reduxForm({
  form: "editFollowUp",
  destroyOnUnmount: true,
})(decoratedComponent);
