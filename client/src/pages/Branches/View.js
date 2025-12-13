import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { deleteBranch } from "../../actions/branches";
import Widget from "../../components/Widget/Widget";

const ViewBranch = ({ selected, branch, closeModal, deleteBranch }) => {
  const [working, setWorking] = useState(false);
  return (
    <Row style={{ marginTop: "30px" }}>
      <Col sm={12}>
        <Widget
          customDropDown
          title={<p className={"fw-bold"}>Branch information</p>}
        >
          <Row>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Branch Name: </span>{" "}
              {branch.name}
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} lg={4} style={{ marginTop: "20px" }}>
              <span className="heading">Branch Slug: </span>{" "}
              {branch.slug}
            </Col>
          </Row>
        </Widget>
      </Col>
    </Row>
  );
};

export default connect(null, {
  deleteBranch: deleteBranch,
})(ViewBranch);
