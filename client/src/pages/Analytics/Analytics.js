import React, { useEffect } from "react";
import { useState } from "react";
import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import { getAdmins } from "../../actions/users";
import {
  getActiveAssessments,
  getAllAssessments,
} from "../../actions/assessment";
import { PacmanLoader } from "react-spinners";
import { Button, Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget";
const Analytics = ({
  getAdmins,
  getActiveAssessments,
  users,
  assessments,
  getAllAssessments,
}) => {
  const [running, setRunning] = useState(false);
  const [data, setData] = useState(null);
  const [showActiveByUsers, setActiveByUsers] = useState(false);
  const [enquiriesData, setEnquiriesData] = useState(null);
  const [enquiriesDataGSP, setEnquiriesDataGSP] = useState(null);
  const [enquiriesDataBAT, setEnquiriesDataBAT] = useState(null);

  const init = async () => {
    const sepratedData = [["Users", "Active Applicants"]];
    const dates = {};

    setRunning(true);
    const admins = await getAdmins();
    const incomingAssessments = await getActiveAssessments();
    const allAssessments = await getAllAssessments();

    const createData = admins.map((admin) => {
      return incomingAssessments.filter((assessment) => {
        if (assessment.case_handled_by.email === admin.email) {
          return assessment;
        }
      });
    });
    for (let index = 0; index < admins.length; index++) {
      const element = createData[index].length;
      sepratedData.push([admins[index].name.toUpperCase(), element]);
    }
    setData(sepratedData);

    //Enquiries Data ALL
    for (let index = 0; index <= 11; index++) {
      const date = new Date();
      const fileterdData = allAssessments.filter((assessment) => {
        const enquiryMonth = new Date(
          assessment.status_updates[0].date
        ).getMonth();
        const enquiryYear = new Date(
          assessment.status_updates[0].date
        ).getFullYear();
        if (enquiryYear === date.getFullYear()) {
          if (index === enquiryMonth) {
            return assessment;
          }
        }
      });

      dates[index] = fileterdData.length;
    }

    setEnquiriesData([
      ["Month", "Enquiries"],
      ["January", dates[0]],
      ["February", dates[1]],
      ["March", dates[2]],
      ["April", dates[3]],
      ["May", dates[4]],
      ["June", dates[5]],
      ["July", dates[6]],
      ["August", dates[7]],
      ["September", dates[8]],
      ["October", dates[9]],
      ["November", dates[10]],
      ["December", dates[111]],
    ]);

    //Enquiries Data GSP

    for (let index = 0; index <= 11; index++) {
      const date = new Date();
      const fileterdData = allAssessments.filter((assessment) => {
        if (assessment.location.value === "gurdaspur") {
          const enquiryMonth = new Date(
            assessment.status_updates[0].date
          ).getMonth();
          const enquiryYear = new Date(
            assessment.status_updates[0].date
          ).getFullYear();
          if (enquiryYear === date.getFullYear()) {
            if (index === enquiryMonth) {
              return assessment;
            }
          }
        }
      });

      dates[index] = fileterdData.length;
    }

    setEnquiriesDataGSP([
      ["Month", "Enquiries"],
      ["January", dates[0]],
      ["February", dates[1]],
      ["March", dates[2]],
      ["April", dates[3]],
      ["May", dates[4]],
      ["June", dates[5]],
      ["July", dates[6]],
      ["August", dates[7]],
      ["September", dates[8]],
      ["October", dates[9]],
      ["November", dates[10]],
      ["December", dates[111]],
    ]);

    //Enquiries Data GSP

    for (let index = 0; index <= 11; index++) {
      const date = new Date();
      const fileterdData = allAssessments.filter((assessment) => {
        if (assessment.location.value === "batala") {
          const enquiryMonth = new Date(
            assessment.status_updates[0].date
          ).getMonth();
          const enquiryYear = new Date(
            assessment.status_updates[0].date
          ).getFullYear();
          if (enquiryYear === date.getFullYear()) {
            if (index === enquiryMonth) {
              return assessment;
            }
          }
        }
      });

      dates[index] = fileterdData.length;
    }

    setEnquiriesDataBAT([
      ["Month", "Enquiries"],
      ["January", dates[0]],
      ["February", dates[1]],
      ["March", dates[2]],
      ["April", dates[3]],
      ["May", dates[4]],
      ["June", dates[5]],
      ["July", dates[6]],
      ["August", dates[7]],
      ["September", dates[8]],
      ["October", dates[9]],
      ["November", dates[10]],
      ["December", dates[111]],
    ]);

    setRunning(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (!users || running) {
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

  return (
    <React.Fragment>
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Active Applicants for each User</p>}
          >
            <Chart
              chartType="ColumnChart"
              data={data}
              style
              width="100%"
              height="700px"
              legendToggle
            />
          </Widget>
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={
              <p className={"fw-bold"}>
                Monthly Enquiry Rate Analytics ALL BRANCHES (
                {new Date().getFullYear()})
              </p>
            }
          >
            <Chart
              chartType="ColumnChart"
              data={enquiriesData}
              style
              width="100%"
              height="700px"
              legendToggle
            />
          </Widget>
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        <Col sm={6}>
          <Widget
            customDropDown
            title={
              <p className={"fw-bold"}>
                Monthly Enquiry Rate Analytics GURDASPUR (
                {new Date().getFullYear()})
              </p>
            }
          >
            <Chart
              chartType="BarChart"
              data={enquiriesDataGSP}
              style
              width="100%"
              height="700px"
              legendToggle
            />
          </Widget>
        </Col>
        <Col sm={6}>
          <Widget
            customDropDown
            title={
              <p className={"fw-bold"}>
                Monthly Enquiry Rate Analytics BATALA (
                {new Date().getFullYear()})
              </p>
            }
          >
            <Chart
              chartType="BarChart"
              data={enquiriesDataBAT}
              style
              width="100%"
              height="700px"
              legendToggle
            />
          </Widget>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.admins
      ? state.admins.map((admin) => {
          return admin.email;
        })
      : [],
    assessments: state.assessments,
  };
};

const decoratedComponent = connect(mapStateToProps, {
  getAdmins: getAdmins,
  getActiveAssessments: getActiveAssessments,
  getAllAssessments: getAllAssessments,
})(Analytics);

export default decoratedComponent;
