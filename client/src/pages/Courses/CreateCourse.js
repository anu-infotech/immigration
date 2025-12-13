import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import Widget from "../../components/Widget/Widget";
import { multiSelect, renderInput, renderSelect } from "../../renderInputs";
import { createCourse } from "../../actions/courses";
import { getUniversities } from "../../actions/university";
import { fields } from "./fields";
import { PacmanLoader } from "react-spinners";

const CreateCourse = ({
  handleSubmit,
  createCourse,
  reset,
  getUniversities,
  universities,
}) => {
  const [statusUpdate, setStatusUpdate] = useState(false);

  useEffect(() => {
    getUniversities();
  }, []);

  if (!universities) {
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

  const renderFields = () => {
    const options = universities.map((uni) => {
      return {
        value: {
          name: uni.name,
          location: uni.country,
        },
        label: uni.name,
      };
    });

    return fields.map((field) => {
      if (field.type === "multiSelect") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={multiSelect}
              label={field.label.toUpperCase()}
              type={field.type}
              options={field.options}
            />
          </Col>
        );
      }
      if (field.type === "select") {
        if (field.name === "university") {
          return (
            <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
              <Field
                name={field.name}
                component={renderSelect}
                label={field.label.toUpperCase()}
                type={field.type}
                options={options}
              />
            </Col>
          );
        }

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
    <div>
      <form
        onSubmit={handleSubmit(async (data) => {
          setStatusUpdate(true);
          await createCourse(data);
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
              <Row>{renderFields()}</Row>
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

const validate = (formValues) => {
  const errors = {};

  fields.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      return (errors[field.name] = field.label + " is required");
    }
  });

  return errors;
};

const mapStateToProps = (state) => {
  return { universities: state.university };
};

const decoratedComponent = connect(mapStateToProps, {
  createCourse: createCourse,
  getUniversities: getUniversities,
})(CreateCourse);

export default reduxForm({
  form: "addUniversity",
  validate,
})(decoratedComponent);
