import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import Widget from "../../components/Widget/Widget";
import { multiSelect, renderInput, renderSelect } from "../../renderInputs";
import { editCourse } from "../../actions/courses";
import { getUniversities } from "../../actions/university";
import { fields } from "./fields";
import { PacmanLoader } from "react-spinners";
import { transform } from "babel-core";

const EditCourse = ({
  handleSubmit,
  editCourse,
  reset,
  getUniversities,
  universities,
  closeModal,
  initialValues,
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
          <Col sm={12} md={6} lg={3} style={{ marginTop: "20px" }}>
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
            <Col sm={12} md={6} lg={3} style={{ marginTop: "20px" }}>
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
          <Col sm={12} md={6} lg={3} style={{ marginTop: "20px" }}>
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
        <Col sm={12} md={6} lg={3} style={{ marginTop: "20px" }}>
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
          await editCourse(data, initialValues._id);
          setStatusUpdate(false);
          closeModal();
        })}
        style={{ width: "100%" }}
      >
        <Row style={{ marginTop: "30px" }}>
          <Col sm={12}>
            <Widget
              customDropDown
              title={<p className={"fw-bold"}>Edit course</p>}
            >
              <Row>
                {renderFields()}
                <Col
                  sm={12}
                  md={6}
                  lg={9}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="submit"
                    color="success"
                    size={"lg"}
                    style={{ transform: "translateY(10px)" }}
                  >
                    {statusUpdate === false ? "Save" : "Please wait..."}
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

const validate = (formValues) => {
  const errors = {};

  fields.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      return (errors[field.name] = field.label + " is required");
    }
  });

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  return {
    universities: state.university,
    initialValues: ownProps.initialValues,
  };
};

const decoratedComponent = connect(mapStateToProps, {
  editCourse: editCourse,
  getUniversities: getUniversities,
})(EditCourse);

export default reduxForm({
  form: "editCourse",
  validate,
})(decoratedComponent);
