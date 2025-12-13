import React, { useState } from "react";
import { generalFields } from "./fields";
import { reduxForm, Field } from "redux-form";
import { renderSelect, renderInput } from "../../renderInputs";
import { Row, Button, Col } from "reactstrap";
import server from "../../api/server";
import { PacmanLoader, PulseLoader } from "react-spinners";
const Page1 = ({ nextPage, handleSubmit }) => {
  const [validate, setValidate] = useState(false);

  const renderFields = (fields) => {
    return generalFields.map((field) => {
      if (field.type === "select") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderSelect}
              label={field.label.toUpperCase()}
              type={field.type}
              options={field.options}
            />
          </Col>
        );
      }

      if (field.name === "mobile") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderInput}
              label={field.label.toUpperCase()}
              type={field.type}
              onChange={() => setValidate(true)}
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
          />
        </Col>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(() => nextPage())}>
      <Row>{renderFields()}</Row>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          style={{ marginTop: "40px", textAlign: "right" }}
        >
          <Button
            type="submit"
            color="success"
            className="auth-btn mb-3"
            size="lg"
          >
            Proceed
          </Button>
        </Col>
      </Row>
    </form>
  );
};

const asyncValidate = async (values, ownProps) => {
  if (values.mobile.length == 10) {
    try {
      await server.get("/api/enquiry/unique/mobile", {
        params: {
          mobile: values.mobile,
        },
      });
    } catch (e) {
      if (e) {
        throw { mobile: "Mobile already registered" };
      }
    }
  }
};
export const validate = (formValues) => {
  const errors = {};

  generalFields.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      return (errors[field.name] = field.label + " is required");
    }
  });

  return errors;
};

export default reduxForm({
  form: "createAssessment",
  destroyOnUnmount: false,
  validate,
  asyncValidate,
  asyncChangeFields: ["mobile", "email"],
})(Page1);
