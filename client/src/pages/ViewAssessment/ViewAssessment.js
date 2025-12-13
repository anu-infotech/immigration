import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  getAssessment,
  updateAssessmentStatus,
  sendStatusUpdate,
} from "../../actions/assessment";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../components/Widget";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { reduxForm, Field } from "redux-form";
import { renderSelect, renderInput } from "../../renderInputs";
import Other from "./Other";
import FollowUps from "./FollowUps/FollowUps";
import Upload from "./Upload/Upload";
import Application from "./Applications/Application";
import OfferLetter from "./OfferLetters/OfferLetter";
import Remarks from "./Remarks/Remarks";
import Deposits from "./Deposits/Deposits";
import Visa from "./Visa/Visa";
import Transfer from "./Transfer/Transfer";
import TransferAssessment from "./Transfer/Transfer";
import WebcamComponent from "./PhotoOp/Webcam";
import Reciepts from "../Reciepts/Reciepts";
import Expense from "../Expenses/Expense";
import COE from "./COE/COE";

const ViewAssessment = ({
  history,
  getAssessment,
  assessment,
  updateAssessmentStatus,
  handleSubmit,
  sendStatusUpdate,
  reset,
}) => {
  window.scrollTo(0, 0);
  const [ref_no, setRef_no] = useState(history.location.pathname.split("/")[3]);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    getAssessment(ref_no);
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user.type);
    setEmail(user.email);
  }, []);

  const renderOverviewContent = (assessment) => {
    return (
      <Table className={"mb-0"} borderless responsive>
        <thead>
          <tr>
            <th key={0} scope='col' className={"pl-0"}>
              First Name
            </th>
            <th key={1} scope='col' className={"pl-0"}>
              Surname
            </th>

            <th key={2} scope='col' className={"pl-0"}>
              Mobile
            </th>

            <th key={2} scope='col' className={"pl-0"}>
              Official Mobile
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Official Email
            </th>
            <th key={3} scope='col' className={"pl-0"}>
              Email
            </th>
            <th key={3} scope='col' className={"pl-0"}>
              DOB
            </th>
            <th key={5} scope='col' className={"pl-0"}>
              Case Handler
            </th>
            <th key={5} scope='col' className={"pl-0"}>
              Spouse
            </th>
            <th key={5} scope='col' className={"pl-0"}>
              Photo
            </th>
          </tr>
        </thead>
        <tbody className='text-dark'>
          <tr key={0}>
            <td className='fw-thin pl-0 fw-thin'>{assessment.first_name}</td>
            <td className={"pl-0 fw-thin"}>{assessment.surname}</td>
            <td className={"pl-0 fw-thin"}>
              {/* {assessment.case_handled_by ? (
                assessment.case_handled_by.email === email ||
                role === "admin" ? (
                  assessment.mobile
                ) : (
                  <React.Fragment>
                    <span>Contact Couns.</span>
                    <br></br>
                    <span>Contact Admin</span>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <span>Contact Admin</span>
                </React.Fragment>
              )} */}
              {assessment.mobile}
            </td>
            <td className={"pl-0 fw-thin"}>
              {/* {assessment.case_handled_by ? (
                assessment.case_handled_by.email === email ||
                role === "admin" ? (
                  assessment.officialMobile
                ) : (
                  <React.Fragment>
                    <span>Contact Couns.</span>
                    <br></br>
                    <span>Contact Admin</span>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <span>Contact Admin</span>
                </React.Fragment>
              )} */}
              {assessment.officialMobile}
            </td>
            <td className={"pl-0 fw-thin"}>
              {/* {assessment.case_handled_by ? (
                assessment.case_handled_by.email === email ||
                role === "admin" ? (
                  assessment.officialEmail
                ) : (
                  <React.Fragment>
                    <span>Contact Couns.</span>
                    <br></br>
                    <span>Contact Admin</span>
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <span>Contact Admin</span>
                </React.Fragment>
              )} */}
              {assessment.officialEmail}
            </td>
            <td className={"pl-0 fw-normal"}>{assessment.email}</td>
            <td>{new Date(assessment.dob).toLocaleDateString()}</td>

            <td className={"pl-0 text-warning fw-normal"}>
              {assessment.case_handled_by
                ? assessment.case_handled_by.name
                : "N/A"}
              <br></br>
              <small>
                {assessment.case_handled_by
                  ? assessment.case_handled_by.email
                  : "N/A"}
              </small>
            </td>
            <td className={"pl-0 fw-normal"}>
              {assessment.spouse ? assessment.spouse.label : "N/A"}
              <br></br>
              {assessment.spouseName ? assessment.spouseName : "N/A"}
            </td>
            <td>
              {assessment.photo ? (
                <img
                  src={assessment.photo}
                  style={{
                    height: "120px",
                    width: "120px",
                    objectFit: "cover",
                  }}
                  alt=''
                />
              ) : (
                "N/A"
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const renderVisaInformationTable = (assessment) => {
    return (
      <Table className={"mb-0"} borderless responsive>
        <thead>
          <tr>
            <th key={0} scope='col' className={"pl-0"}>
              Any Refusal
            </th>
            <th key={1} scope='col' className={"pl-0"}>
              Country Applied For
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Test
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Package Amount
            </th>
          </tr>
        </thead>
        <tbody className='text-dark'>
          <tr key={0}>
            <td className='fw-thin pl-0 fw-thin'>
              {assessment.any_refusal.label} -{" "}
              {assessment.visa_refused_for
                ? assessment.visa_refused_for.label
                : null}
            </td>
            <td className={"pl-0 fw-thin"}>
              {assessment.country_apply_for.label}
            </td>
            <td className={"pl-0 fw-thin"}>
              {assessment.english_test_type.label} -{" "}
              {assessment.english_test_type.value === "pte"
                ? assessment.pte_score
                : `Listening: ${assessment.ielts_score_listening}, Reading: ${assessment.ielts_score_reading}, Writing: ${assessment.ielts_score_writing}, Speaking: ${assessment.ielts_score_speaking}, Overall: ${assessment.overall}`}
            </td>
            <td className={"pl-0 fw-thin"}>
              {assessment.total_amount ? assessment.total_amount : "N/A"}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const renderOtherInformationTable = (assessment) => {
    return (
      <Table className={"mb-0"} borderless responsive>
        <thead>
          <tr>
            <th key={0} scope='col' className={"pl-0"}>
              Address
            </th>
            <th key={1} scope='col' className={"pl-0"}>
              Pincode
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              City
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Country
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Qualification
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Stream/Degree/Diploma in
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Passout Year
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Percentage
            </th>
            <th key={2} scope='col' className={"pl-0"}>
              Enquiry Generated By
            </th>
          </tr>
        </thead>
        <tbody className='text-dark'>
          <tr key={0}>
            <td className='fw-thin pl-0 fw-thin'>{assessment.address}</td>
            <td className={"pl-0 fw-thin"}>{assessment.pincode}</td>
            <td className={"pl-0 fw-thin"}>{assessment.city}</td>
            <td className={"pl-0 fw-thin"}>{assessment.country.label}</td>
            <td className={"pl-0 fw-thin"}>{assessment.qualification.label}</td>
            <td className={"pl-0 fw-thin"}>{assessment.stream}</td>
            <td className={"pl-0 fw-thin"}>{assessment.passout_year}</td>
            <td className={"pl-0 fw-thin"}>{assessment.percentage}</td>
            <td className={"pl-0 fw-thin"}>
              {assessment.created_by ? assessment.created_by.name : "N/A"}
              <br></br>
              <small>
                {assessment.created_by ? assessment.created_by.email : "N/A"}
              </small>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const updateStatus = async (ref_no, status) => {
    setStatusUpdate(true);
    const user = JSON.parse(localStorage.getItem("user"));
    await updateAssessmentStatus(ref_no, status, user.name, user.email);
    reset();
    setStatusUpdate(false);
  };

  const renderButtons = (assessment) => {
    if (assessment.accepted === null && role != 'manager') {
      return (
        <React.Fragment>
          <Button
            color='success'
            style={{ marginLeft: "15px" }}
            onClick={() => updateStatus(assessment.ref_no, true)}
          >
            {statusUpdate === false ? "Active" : "Updating Please wait..."}
          </Button>
          <Button
            color='danger'
            style={{ marginLeft: "15px" }}
            onClick={() => updateStatus(assessment.ref_no, false)}
          >
            {statusUpdate === false ? "Reject" : "Updating Please wait..."}
          </Button>
        </React.Fragment>
      );
    } else if (assessment.accepted === true) {
      if (assessment.case_handled_by.email === email || role === "admin") {
        return (
          <Button
            color='danger'
            style={{ marginLeft: "15px" }}
            onClick={() => updateStatus(assessment.ref_no, false)}
          >
            {statusUpdate === false ? "Reject" : "Updating Please wait..."}
          </Button>
        );
      }
    } else if (assessment.accepted === false) {
      return (
        <Button
          color='success'
          style={{ marginLeft: "15px" }}
          onClick={() => updateStatus(assessment.ref_no, true)}
        >
          {statusUpdate === false ? "Accept" : "Updating Please wait..."}
        </Button>
      );
    }
  };

  const renderVerticalTimeline = (assessment) => {
    const docs = assessment.status_updates.filter(
      (doc) => doc.action_required === false
    );
    const latest = docs.reverse();
    return latest.map((update) => {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{
            background: "#29166F",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: "7px solid  #29166F",
          }}
          date='2011 - present'
          iconStyle={{
            background: "#29166F",
            color: "#fff",
          }}
        >
          <h6
            className='vertical-timeline-element-title'
            style={{ textTransform: "uppercase" }}
          >
            {update.type}
          </h6>
          <h4
            className='vertical-timeline-element-subtitle'
            style={{ marginTop: "10px", fontSize: "15px" }}
          >
            {new Date(update.date).toDateString()}
          </h4>
          <h4
            className='vertical-timeline-element-subtitle'
            style={{ marginTop: "10px", fontSize: "13px" }}
          >
            {new Date(update.time).toTimeString()}
          </h4>
          <p>{update.msg}</p>
        </VerticalTimelineElement>
      );
    });
  };

  const sendUpdate = async (formValues, ref_no) => {
    setStatusUpdate(true);
    await sendStatusUpdate(formValues, ref_no);
    setStatusUpdate(false);
  };

  const onDrop = (files) => {
    console.log(files);
  };

  const renderSentAlerts = (assessment) => {
    const docs = assessment.status_updates.filter(
      (doc) => doc.action_required === true
    );
    const latest = docs.reverse();
    return latest.map((update) => {
      return (
        <VerticalTimelineElement
          className='vertical-timeline-element--work'
          contentStyle={{
            background: "#29166F",
            color: "#fff",
          }}
          contentArrowStyle={{
            borderRight: "7px solid  #29166F",
          }}
          date='2011 - present'
          iconStyle={{
            background: "#29166F",
            color: "#fff",
          }}
        >
          <h6
            className='vertical-timeline-element-title'
            style={{ textTransform: "uppercase" }}
          >
            {update.type}
          </h6>
          <h6
            className='vertical-timeline-element-subtitle'
            style={{ marginTop: "10px", fontSize: "15px" }}
          >
            {new Date(update.date).toDateString()}
          </h6>
          <h6
            className='vertical-timeline-element-subtitle'
            style={{ marginTop: "10px", fontSize: "13px" }}
          >
            {new Date(update.time).toTimeString()}
          </h6>
          <p>{update.msg}</p>
        </VerticalTimelineElement>
      );
    });
  };

  if (!assessment) {
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
      <React.Fragment>
        <Row>
          <Col xl={12}>
            <Widget
              title={
                <p style={{ fontWeight: 600 }}>Client's Assessment Report</p>
              }
              customDropDown
            >
              <div style={{ marginTop: "40px" }}>
                <Tabs>
                  <TabList>
                    <Tab>Overview</Tab>
                    {assessment.case_handled_by ? (
                      assessment.case_handled_by.email === email ||
                      role === "admin" ||
                      role === "Admission" ? (
                        <React.Fragment>
                          <Tab>Upload Webcam Photo</Tab>
                          <Tab>Remarks</Tab>
                          <Tab>Receipts</Tab>
                          <Tab>Expenses</Tab>
                          <Tab>Other Information</Tab>
                          <Tab>Documents Upload</Tab>
                          <Tab>My Applications</Tab>
                          <Tab>My COE</Tab>
                          <Tab>My Offers</Tab>
                          <Tab>My Visa</Tab>
                          <Tab>My Deposits</Tab>
                          <Tab>Status Updates</Tab>
                          <Tab>Send New Update</Tab>
                          <Tab>Follow ups</Tab>
                          <Tab>Transfer Assessment</Tab>
                        </React.Fragment>
                      ) : null
                    ) : null}
                    {  role === "manager"?(
                      <Tab>Transfer Assessment</Tab>
                      ): null
                    }
                  </TabList>
                    <TabPanel>
                    <Row>
                      <Col
                        xl={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "30px",
                        }}
                      >
                        {renderButtons(assessment)}
                      </Col>
                    </Row>

                    <Row style={{ marginTop: "10px" }}>
                      <Col sm={12}>
                        <Widget
                          customDropDown
                          title={<p className={"fw-bold"}>General overview</p>}
                        >
                          {renderOverviewContent(assessment)}
                        </Widget>
                      </Col>
                    </Row>
                   
                    <Row style={{ marginTop: "10px" }}>
                      <Col sm={12}>
                        <Widget
                          customDropDown
                          title={<p className={"fw-bold"}>Visa Information</p>}
                        >
                          {renderVisaInformationTable(assessment)}
                        </Widget>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: "10px" }}>
                      <Col sm={12}>
                        <Widget
                          customDropDown
                          title={<p className={"fw-bold"}>Other Information</p>}
                        >
                          {renderOtherInformationTable(assessment)}
                        </Widget>
                      </Col>
                    </Row>
                  </TabPanel>

                   {assessment.case_handled_by ? (
                      assessment.case_handled_by.email === email ||
                      role === "admin" ||
                      role === "Admission" ? (
                    <React.Fragment>
                  
                  <TabPanel>
                    <WebcamComponent assessmentId={assessment.ref_no} />
                  </TabPanel>
                  <TabPanel>
                    <Remarks />
                  </TabPanel>
                  <TabPanel>
                    <Reciepts assessment={assessment} />
                  </TabPanel>
                  <TabPanel>
                    <Expense assessment={assessment} />
                  </TabPanel>
                  <TabPanel>
                    <Other />
                  </TabPanel>
                  <TabPanel>
                    <Upload />
                  </TabPanel>
                  <TabPanel>
                    <Application />
                  </TabPanel>
                  <TabPanel>
                    <COE />
                  </TabPanel>
                  <TabPanel>
                    <OfferLetter />
                  </TabPanel>
                  <TabPanel>
                    <Visa />
                  </TabPanel>
                  <TabPanel>
                    <Deposits />
                  </TabPanel>
                  <TabPanel>
                    <VerticalTimeline>
                      {renderVerticalTimeline(assessment)}
                    </VerticalTimeline>
                  </TabPanel>

                  <TabPanel>
                    <form
                      onSubmit={handleSubmit((data) =>
                        sendUpdate(data, assessment.ref_no)
                      )}
                    >
                      <Row style={{ marginTop: "30px" }}>
                        <Col sm={12}>
                          <Widget
                            customDropDown
                            title={
                              <p className={"fw-bold"}>
                                Send new status update
                              </p>
                            }
                          >
                            <Col
                              sm={12}
                              md={12}
                              lg={12}
                              style={{ marginTop: "20px" }}
                            >
                              <Field
                                name='msg'
                                component={renderInput}
                                label='Message'
                                type='text'
                              />
                            </Col>
                            <Col
                              sm={12}
                              md={12}
                              lg={12}
                              style={{ marginTop: "20px" }}
                            >
                              <Field
                                name='action_required'
                                component={renderSelect}
                                label='Immediate Action Required'
                                type='select'
                                options={[
                                  { value: false, label: "No" },
                                  { value: true, label: "Yes" },
                                ]}
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
                              <Button type='submit' color='success' size={"lg"}>
                                {statusUpdate === false
                                  ? "Send Update"
                                  : "Sending Please wait..."}
                              </Button>
                            </Col>
                          </Widget>
                        </Col>
                      </Row>
                    </form>
                  </TabPanel>
                  <TabPanel>
                    <FollowUps />
                  </TabPanel>
                  <TabPanel>
                    {role === "admin" ? (
                      <TransferAssessment />
                    ) : (
                      "Feature Not available for counsellors."
                    )}
                   
                  </TabPanel>
                  </React.Fragment>
                  ) : null
                    ) : null}
                    {  role === "manager"?(
                       <React.Fragment> 
                    
                        <TabPanel>
                          <TransferAssessment />
                         </TabPanel>
                         </React.Fragment>
                      ): null
                    }
                </Tabs>
              </div>
            </Widget>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return { assessment: state.singleAssessment };
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.msg) {
    errors.msg = "Message field is required";
  }

  if (!formValues.action_required) {
    errors.action_required = "Please select the type of action.";
  }

  return errors;
};

const decoratedComponent = withRouter(
  connect(mapStateToProps, {
    getAssessment: getAssessment,
    updateAssessmentStatus: updateAssessmentStatus,
    sendStatusUpdate: sendStatusUpdate,
  })(ViewAssessment)
);

export default reduxForm({
  form: "addNewStatus",
  validate,
  destroyOnUnmount: true,
})(decoratedComponent);
