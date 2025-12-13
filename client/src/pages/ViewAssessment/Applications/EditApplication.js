import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import { FontAwesome } from "react-web-vector-icons";
import { useEffect } from "react";
import { connect } from "react-redux";
import { createApplication, getAssessment } from "../../actions/assessment";
import MUIDataTable from "mui-datatables";
import { PacmanLoader } from "react-spinners";
import Select from "react-select";
import { Label } from "reactstrap";

import CreatableSelect from "react-select/creatable";
const ViewApplication = ({
  match,
  getAssessment,
  assessment,
  createApplication,
  history,
}) => {
  useEffect(() => {
    getAssessment(match.params.assessmentId);
  }, []);
  const [applicationType, setApplicationType] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [running, setRunning] = useState(false);
  const onlySave = async () => {
    const course = assessment.coursesApplied.find(
      (course) => course._id == match.params.courseId
    );

    const formValues = {
      applicationType,
      documents,
      status: { value: "saved", label: "Saved" },
      course: course.course.value,
      university: course.university.value,
      intake: course.intake.value,
      country: course.country,
    };
    setRunning(true);
    await createApplication(
      assessment.ref_no,
      formValues,
      match.params.courseId
    );
    history.push("/app/view-assessment/" + assessment.ref_no);
    setRunning(false);
  };
  const saveAndSubmit = async () => {
    const course = assessment.coursesApplied.find(
      (course) => course._id == match.params.courseId
    );

    const formValues = {
      applicationType,
      documents,
      status: { value: "submitted", label: "Application Submitted" },
      course: course.course.value,
      university: course.university.value,
      intake: course.intake.value,
      country: course.country,
    };

    setRunning(true);
    await createApplication(
      assessment.ref_no,
      formValues,
      match.params.courseId
    );
    history.push("/app/view-assessment/" + assessment.ref_no);

    setRunning(false);
  };

  const renderStudentInformation = () => {
    const columns = [
      { name: "first_name", label: "First Name" },
      { name: "surname", label: "Surname" },
      { name: "mobile", label: "Mobile" },
      {
        name: "location",
        label: "Location",
        options: {
          customBodyRender: (value) => {
            return value.label;
          },
        },
      },
    ];

    const options = {
      selectableRows: false,
    };

    return (
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Student Details</p>}
          >
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  title={"Student Details"}
                  data={[assessment]}
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
    );
  };

  const renderCourseInformation = () => {
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
        label: "Intake",
        options: {
          customBodyRender: (value) => {
            return value.label;
          },
        },
      },
    ];

    const options = {
      selectableRows: false,
    };

    const course = assessment.coursesApplied.filter(
      (course) => course._id == match.params.courseId
    );
    return (
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Course Details</p>}
          >
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  title={"Course Details"}
                  data={course}
                  columns={columns}
                  options={options}
                />
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
    );
  };

  const renderStep1 = () => {
    return (
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Step-1 (Application Type)</p>}
          >
            <div className="form-group">
              <Label htmlFor="">Select Application Type</Label>
              <Select
                onChange={(value) => setApplicationType(value)}
                onBlur={(event) => event.preventDefault()}
                options={[
                  { value: "New Application", label: "New Application" },
                  { value: "Online Application", label: "Online Application" },
                  { value: "UCAS", label: "UCAS" },
                  { value: "On Spot Offers", label: "On Spot Offers" },
                  { value: "Defer", label: "Defer" },
                  {
                    value: "Authorization Letter",
                    label: "Authorization Letter",
                  },
                ]}
                className="select"
              />
            </div>
          </Widget>
        </Col>
      </Row>
    );
  };

  const renderStep2 = () => {
    const documents = assessment.documents.map((doc) => {
      return {
        value: doc,
        label: doc.name,
      };
    });

    return (
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Step-2 (Documents)</p>}
          >
            <div className="form-group">
              <Label htmlFor="">Select Documents</Label>
              <CreatableSelect
                isMulti
                onBlur={(event) => event.preventDefault()}
                onChange={(value) => setDocuments(value)}
                options={documents}
              />
            </div>
          </Widget>
        </Col>
      </Row>
    );
  };

  const renderStep3 = () => {

    return (
      <div style={{ textAlign: "center" }}>
        <Button
          color="danger"
          style={{ padding: "10px" }}
          onClick={() => {
            onlySave();
          }}
        >
          Save
        </Button>
      </div>
    );
  };

  if (!assessment || running) {
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
  } else {
    return (
      <div>
        {renderStudentInformation()}
        {renderCourseInformation()}
        {renderStep1()}
        {renderStep2()}
        {renderStep3()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { assessment: state.singleAssessment };
};

export default connect(mapStateToProps, {
  getAssessment: getAssessment,
  createApplication: createApplication,
})(ViewApplication);
