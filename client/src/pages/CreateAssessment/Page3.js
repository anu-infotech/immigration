import React, { useState } from "react";
import { visaInformation } from "./fields";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { renderSelect, renderInput } from "../../renderInputs";
import { Row, Button, Col, Alert } from "reactstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  createAssessment,
  createAssessmentWithoutLogin,
} from "../../actions/assessment";
import countryList from "react-select-country-list";

const Page3 = ({
  previousPage,
  handleSubmit,
  dispatch,
  errorMessage,
  history,
  pristine,
  submitting,
  resetForm,
  reset,
  loggedIn,
}) => {
  const [test, setTest] = useState(null);
  const [refusal, setRefusal] = useState(null);
  const [spouse, setSpouse] = useState(null);

  console.log(test);
  console.log(refusal);

  const renderSpouseName = () => {
    if (spouse) {
      if (spouse.value === true) {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name="spouseName"
              component={renderInput}
              label="Spouse Name"
              type="text"
            />
          </Col>
        );
      } else {
        return null;
      }
    }
  };

  const renderFields = () => {
    return visaInformation.map((field) => {
      if (field.type === "select") {
        if (field.render === true) {
          return (
            <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
              <Field
                name={field.name}
                component={renderSelect}
                label={field.label.toUpperCase()}
                type={field.type}
                options={field.options}
                onChange={(value) => {
                  if (field.name === "any_refusal") setRefusal(value);
                  if (field.name === "english_test_type") setTest(value);
                  if (field.name === "spouse") setSpouse(value);
                }}
              />
            </Col>
          );
        }
      }
      if (field.render === true) {
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
      }
    });
  };

  const renderRefusalCountry = () => {
    if (refusal) {
      if (refusal.value === true) {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name="visa_refused_for"
              component={renderSelect}
              label="Visa refused For"
              type="select"
              options={countryList().getData()}
            />
          </Col>
        );
      } else {
        return null;
      }
    }
  };

  const renderEnglishTestType = () => {
    if (test) {
      if (test.value === "pte") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name="pte_score"
              component={renderInput}
              label="PTE Score"
              type="number"
            />
          </Col>
        );
      } else if (test.value === "ielts") {
        return (
          <React.Fragment>
            <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
              <Field
                name="ielts_score_listening"
                component={renderInput}
                label="Listening Score"
                type="number"
              />
            </Col>
            <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
              <Field
                name="ielts_score_reading"
                component={renderInput}
                label="Reading Score"
                type="number"
              />
            </Col>
            <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
              <Field
                name="ielts_score_writing"
                component={renderInput}
                label="Writing Score"
                type="number"
              />
            </Col>
            <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
              <Field
                name="ielts_score_speaking"
                component={renderInput}
                label="Speaking Score"
                type="number"
              />
            </Col>
            <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
              <Field
                name="overall"
                component={renderInput}
                label="Overall bands"
                type="number"
              />
            </Col>
          </React.Fragment>
        );
      } else {
        return null;
      }
    }
  };

  const onSubmit = async (formValues) => {
    console.log(history);
    if (loggedIn === false) {
      return await dispatch(
        createAssessmentWithoutLogin({
          formValues,
          history,
          resetForm,
          reset,
        })
      );
    }

    return await dispatch(
      createAssessment({
        formValues,
        history,
        resetForm,
        reset,
      })
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && (
        <Alert className="alert-sm" color="danger">
          {errorMessage}
        </Alert>
      )}
      <Row>
        {renderFields()}
        {renderRefusalCountry()}
        {renderEnglishTestType()}
        {renderSpouseName()}
      </Row>
      <Row>
        <Col
          sm={6}
          md={6}
          lg={6}
          style={{ marginTop: "40px", textAlign: "left" }}
        >
          <Button
            color="warning"
            className="auth-btn mb-3"
            size="lg"
            onClick={previousPage}
            disabled={submitting}
          >
            Back
          </Button>
        </Col>
        <Col
          sm={6}
          md={6}
          lg={6}
          style={{ marginTop: "40px", textAlign: "right" }}
        >
          <Button
            type="submit"
            color="success"
            className="auth-btn mb-3"
            size="lg"
            disabled={pristine || submitting}
          >
            Save&rarr;
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export const validate = (formValues) => {
  const errors = {};

  visaInformation.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      return (errors[field.name] = field.label + " is required");
    }
  });

  return errors;
};

function mapStateToProps(state) {
  return {
    errorMessage: state.register.errorMessage,
  };
}

const selector = formValueSelector("myFormName");

const decoratedComponent = withRouter(connect(mapStateToProps)(Page3));

export default reduxForm({
  form: "createAssessment",
  destroyOnUnmount: false,
  validate,
})(decoratedComponent);
