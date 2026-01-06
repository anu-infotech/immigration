import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { connect } from "react-redux";
import { getAdmins } from "../../actions/users";
import {
  getActiveAssessments,
  getAllAssessments,
} from "../../actions/assessment";
import { PacmanLoader } from "react-spinners";
import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import { getBranchesList } from "../../actions/branches";

const Analytics = ({
  getAdmins,
  getActiveAssessments,
  getAllAssessments,
  users,
}) => {
  const [running, setRunning] = useState(true);
  const [userData, setUserData] = useState(null);
  const [enquiriesAll, setEnquiriesAll] = useState(null);
  const [branchCharts, setBranchCharts] = useState([]);

  const buildMonthlyData = (assessments) => {
    const months = Array(12).fill(0);
    const year = new Date().getFullYear();

    assessments.forEach((a) => {
      const d = new Date(a.status_updates[0].date);
      if (d.getFullYear() === year) {
        months[d.getMonth()]++;
      }
    });

    return [
      ["Month", "Enquiries"],
      ["January", months[0]],
      ["February", months[1]],
      ["March", months[2]],
      ["April", months[3]],
      ["May", months[4]],
      ["June", months[5]],
      ["July", months[6]],
      ["August", months[7]],
      ["September", months[8]],
      ["October", months[9]],
      ["November", months[10]],
      ["December", months[11]],
    ];
  };

  const init = async () => {
    setRunning(true);

    const admins = await getAdmins();
    const active = await getActiveAssessments();
    const all = await getAllAssessments();
    const branches = await getBranchesList();

    /* 🔹 Active Applicants per User */
    const userChart = [["Users", "Active Applicants"]];
    admins.forEach((admin) => {
      const count = active.filter(
        (a) => a.case_handled_by?.email === admin.email
      ).length;
      userChart.push([admin.name.toUpperCase(), count]);
    });
    setUserData(userChart);

    /* 🔹 ALL BRANCHES */
    setEnquiriesAll(buildMonthlyData(all));

    /* 🔹 BRANCH WISE */
    const charts = branches.map((branch) => {
      const filtered = all.filter(
        (a) => a.location?.value === branch.slug
      );
      return {
        name: branch.name,
        data: buildMonthlyData(filtered),
      };
    });

    setBranchCharts(charts);
    setRunning(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (!users || running) {
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <PacmanLoader size={30} color={"#FEB049"} loading />
      </div>
    );
  }

  return (
    <>
      {/* USERS */}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget title="Active Applicants for each User">
            <Chart
              chartType="ColumnChart"
              data={userData}
              width="100%"
              height="600px"
            />
          </Widget>
        </Col>
      </Row>

      {/* ALL BRANCHES */}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            title={`Monthly Enquiry Rate Analytics (ALL) ${new Date().getFullYear()}`}
          >
            <Chart
              chartType="ColumnChart"
              data={enquiriesAll}
              width="100%"
              height="600px"
            />
          </Widget>
        </Col>
      </Row>

      {/* BRANCH WISE */}
      <Row style={{ marginTop: "15px" }}>
        {branchCharts.map((b) => (
          <Col sm={6} key={b.name}>
            <Widget
              title={`Monthly Enquiry Rate - ${b.name} (${new Date().getFullYear()})`}
            >
              <Chart
                chartType="BarChart"
                data={b.data}
                width="100%"
                height="600px"
              />
            </Widget>
          </Col>
        ))}
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.admins || [],
});

export default connect(mapStateToProps, {
  getAdmins,
  getActiveAssessments,
  getAllAssessments,
})(Analytics);
