import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { deleteCourse } from "../../actions/courses";
import Widget from "../../components/Widget/Widget";

const ViewCourse = ({ selected, course, closeModal, deleteCourse }) => {
  const [working, setWorking] = useState(false);
   let user = JSON.parse(localStorage.getItem("user"));
  let role = user?.type;
  return (
    <Row style={{ marginTop: "30px" }}>
      <Col sm={12}>
        <Widget
          customDropDown
          title={<p className={"fw-bold"}>Course information</p>}
        >
          <Row>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">University Name: </span>{" "}
              {course.university.label}
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">University Location: </span>{" "}
              {course.university.value.location.label}
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Program Name:</span> {course.program}
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Program Duration:</span>{" "}
              {course.duration} year(s)
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Course content link:</span>{" "}
              <a href={course.courseContentLink}>Visit Course Content</a>
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Application Fee:</span> &nbsp;${" "}
              {course.applicationFee}
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Tuition Fee:</span>
              &nbsp;$ {course.tuitionFee}
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Application Link:</span>
              <a href={course.applicationLink}> Fill application online</a>
            </Col>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Campus:</span> {course.campus}
            </Col>
            <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
              <span className="heading">Intakes:</span>&nbsp;
              {course.intake.map((month) => {
                return (
                  <span
                    style={{
                      padding: "5px",
                      backgroundColor: "green",
                      marginRight: "5px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    {month.label}
                  </span>
                );
              })}
            </Col>
            <fieldset
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                marginTop: "30px",
              }}
            >
              <legend>English Test's and other requirements</legend>
              <Row>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">IELTS:</span>&nbsp;
                  {course.ielts}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">PTE:</span>&nbsp;
                  {course.pte}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">TOEFL:</span>&nbsp;
                  {course.toefl}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">GRE:</span>&nbsp;
                  {course.gre}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">GMAT:</span>&nbsp;{course.gmat}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">SAT:</span>&nbsp;
                  {course.sat}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Graduation type:</span>&nbsp;{" "}
                  {course.graduateType.label}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Entry Requirements:</span>&nbsp;{" "}
                  {course.entryRequirement}
                </Col>
              </Row>
            </fieldset>
          </Row>
          <Row>
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
              <Button
              className={role == 'admin'? '': 'd-none'}
                type="submit"
                color="danger"
                size={"lg"}
                disabled={working}
                onClick={async () => {
                  setWorking(true);
                  closeModal();
                  await deleteCourse(course._id);
                  setWorking(false);
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Widget>
      </Col>
    </Row>
  );
};

export default connect(null, {
  deleteCourse: deleteCourse,
})(ViewCourse);
