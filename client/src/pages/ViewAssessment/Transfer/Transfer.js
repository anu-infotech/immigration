import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Row, Label } from "reactstrap";
import { getAdmins } from "../../../actions/users";
import { transferAssessment } from "../../../actions/assessment";
import Widget from "../../../components/Widget/Widget";
import Select from "react-select";
import { PacmanLoader } from "react-spinners";

const TransferAssessment = ({
  getAdmins,
  users,
  transferAssessment,
  assessment,
  history,
}) => {
  useEffect(() => {
    getAdmins();
  }, []);

  const [user, setUser] = useState(null);
  const [running, setRunning] = useState(false);

  if (!users) {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        Please wait ...
      </div>
    );
  }

  return (
    <div>
      <Row style={{ marginTop: "30px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Transfer Applicants</p>}
          >
            <Col lg={12}>
              <div className="form-group">
                <Label htmlFor="">Select Counsellor</Label>
                <Select
                  onChange={(value) => {
                    setUser(value);
                  }}
                  onBlur={(event) => event.preventDefault()}
                  options={users}
                  className="select"
                />
              </div>
            </Col>
            <Col lg={12} style={{ textAlign: "center" }}>
              <Button
                disabled={running}
                color="danger"
                onClick={async () => {
                  const confirm = window.confirm(
                    "Are you sure you want to transfer this application to other user?"
                  );
                  if (confirm) {
                    const formValues = {
                      caseHandler: user,
                    };
                    setRunning(true);
                    await transferAssessment(
                      assessment.ref_no,
                      formValues,
                      history
                    );
                    setRunning(false);
                  }
                }}
              >
                Transfer
              </Button>
            </Col>
            <Col
              lg={12}
              style={{
                textAlign: "center",
                marginTop: "20px",
                fontSize: "20px",
                display: running ? "block" : "none",
              }}
            >
              <br></br>
              <span
                style={{
                  fontSize: "20px",
                }}
              >
                Application transfer in progress. Please wait.
              </span>
              <br />
              <span
                style={{
                  fontSize: "20px",
                }}
              >
                Do not refresh or reload the page.
              </span>
            </Col>
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.admins
      ? state.admins.map((admin) => {
          return {
            value: admin,
            label: `${admin.name} (${admin.email})`,
          };
        })
      : null,
    assessment: state.singleAssessment,
  };
};

export default connect(mapStateToProps, {
  getAdmins: getAdmins,
  transferAssessment: transferAssessment,
})(TransferAssessment);
