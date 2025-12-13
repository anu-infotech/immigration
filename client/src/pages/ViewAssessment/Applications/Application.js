import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { deleteApplication } from "../../../actions/assessment";
import { Link } from "react-router-dom";

const Applications = ({ assessment, deleteApplication }) => {
  const columns = [
    {
      name: "apn",
      label: "Appl No.",
    },
    {
      name: "date",
      label: "Appl Date",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toDateString();
        },
      },
    },

    {
      name: "applicationType",
      label: "Type",
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
          return value.program;
        },
      },
    },

    {
      name: "intake",
      label: "Intake",
    },
    {
      name: "status",
      label: "Status",
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
                    deleteApplication(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
              <div style={{ display: "flex" }}>
                <Link
                  disabled={true}
                  style={{ marginLeft: "10px" }}
                  to={`/app/application/view/${assessment.ref_no}/${value}`}
                >
                  <FontAwesome name="envelope-open" color="green" size={18} />
                </Link>
              </div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
  };

  return (
    <div>
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>My Application(s)</p>}
          >
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  style={{ textTransform: "capitalize" }}
                  title={"List of Application(s)"}
                  data={assessment.applications.reverse()}
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
  return { assessment: state.singleAssessment };
};

const decoratedComponent = connect(mapStateToProps, {
  deleteApplication: deleteApplication,
})(Applications);

export default reduxForm({
  form: "addFollowups",
  destroyOnUnmount: true,
})(decoratedComponent);
