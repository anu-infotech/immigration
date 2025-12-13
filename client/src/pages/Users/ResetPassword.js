import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { renderInput } from "../../renderInputs";
import { updatePassword } from "../../actions/users";

const ResetPassword = ({ handleSubmit, match, dispatch, history }) => {
  const [loading, setLoading] = useState(false);
  

  const email = match.params.email;

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoading(true);

        await dispatch(updatePassword(email, data.password));

        setLoading(false);
        history.push("/app/users");
      })}
    >
      <div className="card card-body">
        <Row>
          <Col sm={12} md={6} lg={6} style={{ marginTop: "20px" }}>
            <Field
              name="password"
              component={renderInput}
              label="New Password"
              type="password"
            />
          </Col>

          <Col sm={12} md={6} lg={6} style={{ marginTop: "20px" }}>
            <Field
              name="confirm_password"
              component={renderInput}
              label="Confirm New Password"
              type="password"
            />
          </Col>

          <Col sm={12} style={{ marginTop: "30px" }}>
            <Button type="submit" color="primary" size="md">
              {loading ? "Please wait..." : "Update Password"}
            </Button>
          </Col>
        </Row>
      </div>
    </form>
  );
};

// VALIDATION
const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Confirm password is required";
  }

  if (values.password !== values.confirm_password) {
    errors.confirm_password = "Passwords do not match";
  }

  return errors;
};

export default reduxForm({
  form: "adminResetPasswordForm",
  validate,
})(ResetPassword);
