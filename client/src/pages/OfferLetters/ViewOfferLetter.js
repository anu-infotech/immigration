import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import { FontAwesome } from "react-web-vector-icons";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  createApplication,
  getAssessment,
  updateApplicationDocs,
  updateApplicationRemarks,
  updateApplicationStatus,
  updateUniversityApplicationNumber,
} from "../../actions/assessment";
import { PacmanLoader } from "react-spinners";
import Select from "react-select";
import { Label } from "reactstrap";

import CreatableSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ViewOfferLetter = ({
  match,
  getAssessment,
  assessment,
  documents,
  updateApplicationRemarks,
  updateApplicationStatus,
  updateUniversityApplicationNumber,
  updateApplicationDocs,
}) => {
  const [running, setRunning] = useState(false);
  const [remarks, setRemarks] = useState(null);
  const [uniNumber, setUniNumber] = useState(null);
  const [newStatus, setStatus] = useState(null);
  const [newdocuments, setDocuments] = useState(documents);

  const find = async () => {
    setRunning(true);
    await getAssessment(match.params.assessmentId);
    setRunning(false);
  };

  useEffect(() => {
    find();
  }, []);

  const updateRemarks = async () => {
    if (remarks !== null) {
      if (remarks.length > 0) {
        const formValues = {
          remarks,
        };
        setRunning(true);
        await updateApplicationRemarks(
          match.params.assessmentId,
          formValues,
          match.params.applicationId
        );
        setRunning(false);
      } else {
        toast.error("Please enter a valid remark.");
      }
    } else {
      toast.error("Please enter a valid remark.");
    }
  };

  const updateUniversityNumber = async () => {
    if (uniNumber !== null) {
      if (uniNumber.length > 0) {
        const formValues = {
          universityApplicationNumber: uniNumber,
        };
        setRunning(true);
        await updateUniversityApplicationNumber(
          match.params.assessmentId,
          formValues,
          match.params.applicationId
        );
        setRunning(false);
      } else {
        toast.error("Please enter a valid university application number.");
      }
    } else {
      toast.error("Please enter a valid university application number.");
    }
  };

  const updateStatus = async () => {
    if (newStatus !== null) {
      const formValues = {
        status: newStatus,
      };
      setRunning(true);
      await updateApplicationStatus(
        match.params.assessmentId,
        formValues,
        match.params.applicationId
      );
      setRunning(false);
    } else {
      toast.error("Please select a valid status update to proceed.");
    }
  };

  const updateDocs = async () => {
    if (newdocuments !== null) {
      const formValues = {
        documents: newdocuments,
      };

      setRunning(true);
      await updateApplicationDocs(
        match.params.assessmentId,
        formValues,
        match.params.applicationId
      );

      setRunning(false);
    } else {
      toast.error(
        "Please select documents from the dropdown in order to proceed."
      );
    }
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
        <PacmanLoader size={30} color={"#FEB049"} loading={true} />
      </div>
    );
  } else {
    return (
      <Row style={{ marginTop: "30px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Application Details</p>}
          >
            <Row style={{ padding: "20px" }}>
              <Col lg={12} style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    if (assessment.universityApplicationNumber) {
                      toast.success("Feature Coming Soon");
                    } else {
                      toast.error(
                        "Please enter university application number in order to proceed."
                      );
                    }
                  }}
                >
                  Received Offer Letter? Click Here.
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    if (assessment.universityApplicationNumber) {
                      toast.success("Feature Coming Soon");
                    } else {
                      toast.error(
                        "Please enter university application number in order to proceed."
                      );
                    }
                  }}
                >
                  Start Visa Application
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Application No. </span>{" "}
                {assessment.apn}
              </Col>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Name. </span> {assessment.name}{" "}
                <Link to={`/app/view-assessment/${assessment.assessmentId}`}>
                  ({assessment.assessmentId})
                </Link>
              </Col>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Couns. </span>{" "}
                <a href={`mailto:${assessment.caseHandler}`}>
                  {assessment.caseHandler}
                </a>
              </Col>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Uni Application No. </span>{" "}
                {assessment.universityApplicationNumber
                  ? assessment.universityApplicationNumber
                  : "N/A"}
              </Col>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Date Applied: </span>{" "}
                {new Date(assessment.date).toDateString()}
              </Col>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Application Type: </span>{" "}
                {assessment.applicationType.label}
              </Col>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Intake: </span>{" "}
                <span
                  style={{
                    padding: "5px",
                    backgroundColor: "orange",
                    marginRight: "5px",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                >
                  {assessment.intake}
                </span>
              </Col>
              <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                <span className="heading">Application Status: </span>{" "}
                {assessment.status.label}
              </Col>
            </Row>
            <fieldset style={{ marginTop: "50px" }}>
              <legend style={{ fontSize: "22px" }}>Course Details</legend>
              <Row>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "10px" }}>
                  <span className="heading">University Name: </span>{" "}
                  {assessment.course.university.label}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "10px" }}>
                  <span className="heading">University Location: </span>{" "}
                  {assessment.course.university.value.location.label}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "10px" }}>
                  <span className="heading">Program Name:</span>{" "}
                  {assessment.course.program}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Program Duration:</span>{" "}
                  {assessment.course.duration} year(s)
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Course content link:</span>{" "}
                  <a href={assessment.course.courseContentLink} target="_blank">
                    Visit Course Content
                  </a>
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Application Fee:</span> &nbsp;${" "}
                  {assessment.course.applicationFee}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Tuition Fee:</span>
                  &nbsp;$ {assessment.course.tuitionFee}
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Application Link:</span>
                  <a href={assessment.course.applicationLink} target="_blank">
                    {" "}
                    Fill application online
                  </a>
                </Col>
                <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
                  <span className="heading">Campus:</span>{" "}
                  {assessment.course.campus}
                </Col>
                <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
                  <span className="heading">Avail. Intakes:</span>&nbsp;
                  {assessment.course.intake.map((month) => {
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
              </Row>
            </fieldset>

            <fieldset style={{ marginTop: "50px" }}>
              <legend style={{ fontSize: "22px" }}>Associated Documents</legend>
              <Row>
                <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
                  <div className="form-group">
                    <Label htmlFor="">Documents uploaded</Label>
                    <CreatableSelect
                      isMulti
                      defaultValue={assessment.documents}
                      options={documents}
                      onBlur={(event) => event.preventDefault()}
                      onChange={(value) => setDocuments(value)}
                    />
                  </div>
                </Col>
                <Col sm={12} md={12} lg={12} style={{ textAlign: "right" }}>
                  <Button color="success" onClick={updateDocs}>
                    Save&rarr;
                  </Button>
                </Col>
              </Row>
            </fieldset>

            <fieldset style={{ marginTop: "50px" }}>
              <legend style={{ fontSize: "22px" }}>Add Remarks</legend>
              <Row>
                <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
                  <textarea
                    rows={7}
                    className="form-control"
                    placeholder="Enter new remarks"
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                  >
                    {remarks}
                  </textarea>
                </Col>
                <Col sm={12} md={12} lg={6} style={{ marginTop: "18px" }}>
                  <Label>Previous Remarks: </Label>
                  <p>{assessment.remarks ? assessment.remarks : "N/A"}</p>
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={6}
                  style={{ textAlign: "right", marginTop: "18px" }}
                >
                  <Button color="success" onClick={updateRemarks}>
                    Save&rarr;
                  </Button>
                </Col>
              </Row>
            </fieldset>

            <fieldset style={{ marginTop: "50px" }}>
              <legend style={{ fontSize: "22px" }}>
                Change Application Status
              </legend>

              <Row>
                <Col sm={12} md={12} lg={12} style={{ marginTop: "20px" }}>
                  <div className="form-group">
                    <Label htmlFor="">Select new Status</Label>
                    <Select
                      onChange={(value) => {
                        setStatus(value);
                      }}
                      onBlur={(event) => event.preventDefault()}
                      options={[
                        { value: "Pending", label: "Pending" },
                        {
                          value: "Rejected",
                          label: "Rejected",
                        },
                        {
                          value: "More Documents Required",
                          label: "More Documents Required",
                        },
                        {
                          value: "Offer awaited",
                          label: "Offer awaited",
                        },
                        { value: "Not Applied", label: "Not Applied" },
                        {
                          value: "Application can't process for future intake",
                          label: "Application can't process for future intake",
                        },
                      ]}
                      className="select"
                    />
                  </div>
                </Col>
                <Col sm={12} md={12} lg={6}>
                  <span className="heading">Current Application Status: </span>{" "}
                  <span
                    style={{
                      padding: "5px",
                      backgroundColor: "red",
                      marginRight: "5px",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  >
                    {" "}
                    {assessment.status.label}
                  </span>
                </Col>

                <Col sm={12} md={12} lg={6} style={{ textAlign: "right" }}>
                  <Button color="success" onClick={updateStatus}>
                    Save&rarr;
                  </Button>
                </Col>
              </Row>
            </fieldset>

            <fieldset style={{ marginTop: "70px" }}>
              <legend style={{ fontSize: "22px" }}>
                University Application Number
              </legend>
              <Row>
                <Col lg={12}>
                  <div className="form-group">
                    <Label>Application No.</Label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Application No."
                      value={uniNumber}
                      onChange={(e) => setUniNumber(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12} lg={12} style={{ textAlign: "right" }}>
                  <Button color="success" onClick={updateUniversityNumber}>
                    Save&rarr;
                  </Button>
                </Col>
              </Row>
            </fieldset>
          </Widget>
        </Col>
      </Row>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    assessment: state.singleAssessment
      ? state.singleAssessment.applications.find((app) => {
          if (app._id === ownProps.match.params.offerId) return app;
        })
      : null,

    documents: state.singleAssessment
      ? state.singleAssessment.documents.map((doc) => {
          return {
            value: doc,
            label: doc.name,
          };
        })
      : null,
  };
};

export default connect(mapStateToProps, {
  getAssessment: getAssessment,
  createApplication: createApplication,
  updateApplicationRemarks,
  updateApplicationStatus,
  updateUniversityApplicationNumber,
  updateApplicationDocs,
})(ViewOfferLetter);
