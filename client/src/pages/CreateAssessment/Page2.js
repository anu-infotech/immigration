import React, { useState, useEffect } from "react";
import { otherInformation } from "./fields";
import { reduxForm, Field } from "redux-form";
import { renderSelect, renderInput } from "../../renderInputs";
import { Row, Button, Col } from "reactstrap";
import { getBranchesListForSelect } from "../../actions/branches";

const Page2 = ({ nextPage, previousPage, handleSubmit }) => {
  const [branchOptions, setBranchOptions] = useState([]);

  // ---- Load branch list on mount ----
  useEffect(() => {
    async function load() {
      const list = await getBranchesListForSelect();
      setBranchOptions(list);
    }
    load();
  }, []);

  // ---- Render dynamic fields ----
  const renderFields = () =>
    otherInformation.map((field) => {
      if (!field.render) return null;

      const isSelect = field.type === "select";

      return (
        <Col
          sm={12}
          md={6}
          lg={4}
          style={{ marginTop: "20px" }}
          key={field.name}
        >
          <Field
            name={field.name}
            component={isSelect ? renderSelect : renderInput}
            label={field.label.toUpperCase()}
            type={field.type}
            options={
              field.name === "location"
                ? branchOptions // inject async options
                : field.options
            }
          />
        </Col>
      );
    });

  return (
    <form onSubmit={handleSubmit(() => nextPage())}>
      <Row>{renderFields()}</Row>

      <Row>
        <Col sm={6} style={{ marginTop: "40px", textAlign: "left" }}>
          <Button color="warning" size="lg" onClick={previousPage}>
            Back
          </Button>
        </Col>

        <Col sm={6} style={{ marginTop: "40px", textAlign: "right" }}>
          <Button type="submit" color="success" size="lg">
            Proceed
          </Button>
        </Col>
      </Row>
    </form>
  );
};

// --------------------- VALIDATION ---------------------

export const validate = (formValues) => {
  const errors = {};

  otherInformation.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      errors[field.name] = `${field.label} is required`;
    }
  });

  return errors;
};

export default reduxForm({
  form: "createAssessment",
  destroyOnUnmount: false,
  validate,
})(Page2);
