import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import Widget from "../../components/Widget/Widget";
import { renderInput, renderSelect } from "../../renderInputs";
import countryList from "react-select-country-list";
import { createUniversity } from "../../actions/university";

const CreateUniversity = ({ handleSubmit, createUniversity, reset }) => {
  const [statusUpdate, setStatusUpdate] = useState(false);

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          setStatusUpdate(true);
          await createUniversity(data);
          setStatusUpdate(false);
          reset();
        })}
        style={{ width: "100%" }}
      >
        <Row style={{ marginTop: "30px" }}>
          <Col sm={12}>
            <Widget
              customDropDown
              title={<p className={"fw-bold"}>Add new university</p>}
            >
              <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
                <Field
                  name="name"
                  component={renderInput}
                  label="University name"
                  type="text"
                />
              </Col>
              <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
                <Field
                  name="tieUp"
                  component={renderSelect}
                  label="Tie Up Type"
                  type="select"
                  options={[
                    { value: 0, label: "Direct" },
                    { value: 1, label: "No Tie-up" },
                    { value: 2, label: "Third Party" },
                  ]}
                />
              </Col>
              <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
                <Field
                  name="country"
                  component={renderSelect}
                  label="Country"
                  type="select"
                  options={countryList().getData()}
                />
              </Col>
              <Col
                sm={12}
                md={12}
                lg={12}
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  marginTop: "30px",
                }}
              >
                <Button type="submit" color="success" size={"lg"}>
                  {statusUpdate === false ? "Add University" : "Please wait..."}
                </Button>
              </Col>
            </Widget>
          </Col>
        </Row>
      </form>
    </div>
  );
};

const decoratedComponent = connect(null, {
  createUniversity: createUniversity,
})(CreateUniversity);

export default reduxForm({
  form: "addUniversity",
})(decoratedComponent);
