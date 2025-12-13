import MUIDataTable from "mui-datatables";
import React from "react";
import Widget from "../../components/Widget";
import CoursesApplied from "./CoursesApplied/CoursesApplied";
import TestTaken from "./TestTaken/TestTaken";
import WorkExperience from "./WorkExperience/WorkExperience";
import { connect } from "react-redux";
import Qualifications from "./Qualification/Qualifications";
import Passport from "./Passport/Passport";
import Row from "reactstrap/lib/Row";

const Other = () => {
  return (
    <div>
      <Passport />
      <Qualifications />
      <TestTaken />
      <CoursesApplied />
      <WorkExperience />
    </div>
  );
};

const decoratedComponent = connect(null)(Other);

export default decoratedComponent;
