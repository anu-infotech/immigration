import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import {
  addCourseToApply,
  deleteCourseToApply,
} from "../../../actions/assessment";
import Widget from "../../../components/Widget";
import { renderSelect } from "../../../renderInputs";
import { coursesAppliedFields } from "../fields";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { getUniversities } from "../../../actions/university";
import { getCourses } from "../../../actions/courses";
import { useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CoursesApplied = ({
  handleSubmit,
  addCourseToApply,
  assessment,
  deleteCourseToApply,
  universities,
  courses,
  getCourses,
  getUniversities,
}) => {
  const [modal, setModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredUniversities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedIntake, setSelectedIntake] = useState(null);
  useEffect(() => {
    getCourses();
    getUniversities();
  }, []);

  const closeModal = () => {
    setModal(false);
    setSelected(null);
    setEdit(false);
  };

  const columns = [
    {
      name: "country",
      label: "Country",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "university",
      label: "University",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "type",
      label: "UG/PG",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "course",
      label: "Course",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "intake",
      label: "Intake Date",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "_id",
      label: "Act.",
      options: {
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  const sure = window.confirm(
                    "Are you sure you want to delete this entry?"
                  );
                  if (sure) {
                    deleteCourseToApply(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Start",
      options: {
        customBodyRender: (value) => {
          const course = assessment.coursesApplied.find((course) => {
            if (course._id == value) {
              return course;
            }
          });

          if (course.applied === true) {
            return (
              <Button
                onClick={() => {
                  toast.success(
                    "You have already started an application for this course. Please check the my applications secttion in order to edit your application."
                  );
                }}
                color="primary"
              >
                Applied
              </Button>
            );
          }
          return (
            <div style={{ display: "flex" }}>
              <Link
                className="btn btn-warning"
                disabled={true}
                to={`/app/application/apply/${assessment.ref_no}/${value}`}
              >
                Start Application
              </Link>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
  };

  const renderFields = () => {
    return coursesAppliedFields.map((field) => {
      if (field.name === "country") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderSelect}
              label={field.label.toUpperCase()}
              type={field.type}
              options={field.options}
              onChange={(value) => {
                const filterTheUniversities = universities.filter(
                  (uni) => uni.country.value === value.value
                );
                const optionsForUniversities = filterTheUniversities.map(
                  (uni) => {
                    return {
                      value: uni,
                      label: uni.name,
                    };
                  }
                );
                console.log(optionsForUniversities);
                setUniversities(optionsForUniversities);
              }}
            />
          </Col>
        );
      }
      if (field.name === "university") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderSelect}
              label={field.label.toUpperCase()}
              type={field.type}
              options={filteredUniversities}
              onChange={(value) => {
                setSelectedUniversity(value);
              }}
            />
          </Col>
        );
      }

      if (field.name === "course") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderSelect}
              label={field.label.toUpperCase()}
              type={field.type}
              options={filteredCourses}
              onChange={(value) => setSelectedCourse(value)}
            />
          </Col>
        );
      }

      if (field.name === "type") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderSelect}
              label={field.label.toUpperCase()}
              type={field.type}
              options={field.options}
              onChange={(value) => {
                if (selectedUniversity) {
                  const filterTheCourses = courses.filter((course) => {
                    if (
                      course.university.label === selectedUniversity.label &&
                      course.graduateType.value == value.value
                    ) {
                      return course;
                    }
                  });
                  const optionsForCourses = filterTheCourses.map((course) => {
                    return {
                      value: course,
                      label: course.program,
                    };
                  });
                  setSelectedType(value);
                  setFilteredCourses(optionsForCourses);
                } else {
                  alert("Please select a university to proceed");
                }
              }}
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
            onChange={(value) => setSelectedIntake(value)}
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
          display: modal ? "block" : "none",
          padding: "150px",
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
            await addCourseToApply(assessment.ref_no, data);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Select Course to Apply</p>}
              >
                <Row>{renderFields()}</Row>
                <Row style={{ textAlign: "center", marginTop: "20px" }}>
                  <Col sm={12} md={12} lg={12}>
                    <Button
                      type="submit"
                      color="success"
                      size={"lg"}
                      disabled={
                        !filteredCourses ||
                        !filteredUniversities ||
                        !selectedUniversity ||
                        !selectedCourse ||
                        !selectedType ||
                        !selectedIntake
                          ? true
                          : false
                      }
                    >
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

  if (!courses || !universities) {
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
        <PacmanLoader size={30} color={"#29166F"} loading={true} />
      </div>
    );
  }

  return (
    <div>
      {renderModal()}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={
              <p className={"fw-bold"}>
                Course(s) Applied (Not yet registered)
              </p>
            }
          >
            <Row style={{ marginBottom: "15px", textAlign: "right" }}>
              <Col lg={12}>
                <Button
                  color="success"
                  size="md"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Add Course
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  title={"List of course(s) to apply for"}
                  data={assessment.coursesApplied}
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    assessment: state.singleAssessment,
    universities: state.university,
    courses: state.courses,
  };
};

const decoratedComponent = connect(mapStateToProps, {
  addCourseToApply,
  getUniversities: getUniversities,
  getCourses: getCourses,
  deleteCourseToApply: deleteCourseToApply,
})(CoursesApplied);

export default reduxForm({
  form: "addCourseApply",
  destroyOnUnmount: true,
})(decoratedComponent);
