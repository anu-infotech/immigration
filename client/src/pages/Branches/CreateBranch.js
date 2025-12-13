import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import Widget from "../../components/Widget/Widget";
import { renderInput } from "../../renderInputs";
import { createBranch } from "../../actions/branches";
import { fields } from "./fields";
import { PacmanLoader } from "react-spinners";

const CreateBranch = ({ handleSubmit, createBranch, reset }) => {
  const [statusUpdate, setStatusUpdate] = useState(false);

  // Render dynamic fields
  const renderFields = () => {
    return fields.map((field) => (
      <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }} key={field.name}>
        <Field
          name={field.name}
          component={renderInput}
          label={field.label.toUpperCase()}
          type={field.type}
        />
      </Col>
    ));
  };

  // Show loader when saving
  if (statusUpdate) {
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
        <PacmanLoader size={30} color={"#FEB049"} loading={true} />
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          setStatusUpdate(true);
          await createBranch(data);
          setStatusUpdate(false);
          reset();
        })}
        style={{ width: "100%" }}
      >
        <Row style={{ marginTop: "30px" }}>
          <Col sm={12}>
            <Widget
              customDropDown
              title={<p className="fw-bold">Add New Branch</p>}
            >
              <Row>{renderFields()}</Row>

              <Col
                sm={12}
                md={12}
                lg={12}
                style={{
                  marginTop: "30px",
                  textAlign: "center",
                }}
              >
                <Button type="submit" color="success" size="lg">
                  {statusUpdate ? "Please wait..." : "Add Branch"}
                </Button>
              </Col>
            </Widget>
          </Col>
        </Row>
      </form>
    </div>
  );
};

const validate = (formValues) => {
  const errors = {};

  fields.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      errors[field.name] = field.label + " is required";
    }
  });

  return errors;
};

// Correct connect syntax
const decoratedComponent = connect(null, { createBranch })(CreateBranch);

export default reduxForm({
  form: "createBranch",
  validate,
})(decoratedComponent);
