import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { passportFields } from "../fields";
import { renderInput } from "../../../renderInputs";
import { editPassport } from "../../../actions/assessment";

const EditPassport = ({
  handleSubmit,
  assessment,
  editPassport,
  closeModal,
  initialValues,
}) => {
  const [adding, setAdding] = useState(false);
  const renderFields = () => {
    return passportFields.map((field) => {
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
          backgroundColor: "rgba(254, 176, 73, 0.8)",
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
            await editPassport(assessment.ref_no, data);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Edit Passport</p>}
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
  editPassport,
})(EditPassport);

export default reduxForm({
  form: "editPassport",
  destroyOnUnmount: true,
})(decoratedComponent);
