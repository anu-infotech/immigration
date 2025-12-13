import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { Button, Col, Label, Row } from "reactstrap";
import { getUser } from "../../actions/assessment";
import Widget from "../../components/Widget/Widget";




const ViewReport = ({ match, user, getUser }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [totalCalls, setTotalCalls] = useState([]);
  const [spoken, setSpoken] = useState([]);
  const [notSpoken, setNotSpoken] = useState([]);
  const [appointments, setApplointments] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [docs, setDocs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [manualWorkTime, setManualWorkTime] = useState(0);
  const [visas, setVisas] = useState(0);
  useEffect(() => {
    getUser(match.params.email);
  }, []);

  const reset = () => {
    setFrom(null);
    setTo(null);
    setFilteredData([]);
    setTotalCalls([]);
    setSpoken([]);
    setNotSpoken([]);
    setApplointments([]);
    setDeposits([]);
    setDocs([]);
    setApplications([]);
    setManualWorkTime([]);
  };

  const filterData = () => {
    let minutes = 0;

    const filteredData = user.dailyReportNormal.filter((report) => {
      const reportDate = new Date(report.date).toLocaleDateString();
      if (from <= reportDate && reportDate <= to) {
        return report;
      }
    });

    const filteredData1 = user.dailyReportExtended.filter((report) => {
      const reportDate = new Date(report.date).toLocaleDateString();
      if (from <= reportDate && reportDate <= to) {
        return report;
      }
    });

    const appoint = filteredData.filter((calls) => {
      if (calls.type === "Appointment") {
        return calls;
      }
    });

    const visa = filteredData.filter((calls) => {
      if (calls.name === "visa") {
        return calls;
      }
    });

    const depo = filteredData.filter((calls) => {
      if (calls.name === "deposit") {
        return calls;
      }
    });

    const doc = filteredData.filter((calls) => {
      if (calls.name === "docUpload") {
        return calls;
      }
    });

    const appli = filteredData.filter((calls) => {
      if (calls.name === "application") {
        return calls;
      }
    });

    const totalCalls = filteredData.filter((calls) => {
      if (calls.name === "Spoken" || calls.name === "Not Spoken") {
        return calls;
      }
    });

    const spoken = filteredData.filter((calls) => {
      if (calls.name === "Spoken") {
        return calls;
      }
    });

    const notSpoken = filteredData.filter((calls) => {
      if (calls.name === "Not Spoken") {
        return calls;
      }
    });

    filteredData1.map((data) => {
      minutes = minutes + data.task.value;
    });
    setVisas(visa.length);
    setManualWorkTime(minutes);
    setDocs(doc.length);
    setApplications(appli.length);
    setDeposits(depo.length);
    setApplointments(appoint.length);
    setSpoken(spoken.length);
    setNotSpoken(notSpoken.length);
    setTotalCalls(totalCalls.length);
    setFilteredData(filteredData1);
  };

  const columns = [
    {
      name: "task",
      label: "Task",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },

    {
      name: "task",
      label: "Time",
      options: {
        customBodyRender: (value) => {
          return value.value;
        },
      },
    },

    {
      name: "document",
      label: "Supporting File",
      options: {
        customBodyRender: (value) => {
          return <a href={value}>Document</a>;
        },
      },
    },

    {
      name: "addInfo",
      label: "Additional Information",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={4} cols={9} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    filter: false,
    print: false,
    download: false,
  };

  if (!user) {
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
      <Row>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Select timespan</p>}
          >
            <Row style={{ marginBottom: "15px", textAlign: "right" }}></Row>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col lg={5}>
                <Label>From: </Label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    setFrom(new Date(e.target.value).toLocaleDateString());
                  }}
                />
              </Col>
              <Col lg={5}>
                <Label>To: </Label>
                <input
                  type="date"
                  className="form-control"
                  disabled={!from ? true : false}
                  onChange={(e) => {
                    setTo(new Date(e.target.value).toLocaleDateString());
                  }}
                />
              </Col>

              <Col
                lg={2}
                style={{
                  transform: "translateY(15px)",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  color="danger"
                  disabled={!from || !to ? true : false}
                  onClick={() => {
                    filterData();
                  }}
                >
                  Go&rarr;
                </Button>
                <Button
                  color="warning"
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset&rarr;
                </Button>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Requested Report(s)</p>}
          >
            <Row style={{ marginBottom: "15px", textAlign: "right" }}></Row>
            <Row>
              <Col lg={12}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Counsellor</th>
                      <th>Calls Made</th>
                      <th>Appointments</th>
                      <th>Deposits Recevied</th>
                      <th>Visas</th>
                      <th>Documents Recevied / Application Recevied </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{user.name}</td>
                      <td>
                        <span>Total: {totalCalls}</span>
                        <br></br>
                        <br></br>
                        <span>Spoken: {spoken}</span>
                        <br></br>
                        <br></br>
                        <span>Not Spoken: {notSpoken}</span>
                      </td>
                      <td>
                        <span>{appointments}</span>
                      </td>
                      <td>{deposits}</td>
                      <td>{visas}</td>
                      <td>
                        <span>Documents: {docs}</span>
                        <br />
                        <br />
                        <span>Applications: {applications} </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Calls Time</p>}
          >
            <h1>{totalCalls * 5} Minutes</h1>
          </Widget>
        </Col>
        <Col lg={4}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Documents & Appointments</p>}
          >
            <h1>{docs * 20 + appointments * 30} Minutes</h1>
          </Widget>
        </Col>
        <Col lg={4}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Manual work</p>}
          >
            <h1>{manualWorkTime} Minutes</h1>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <MUIDataTable
            style={{ textTransform: "capitalize" }}
            title={"List of Report(s)"}
            data={filteredData}
            columns={columns}
            options={options}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={12}></Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {
  getUser: getUser,
})(ViewReport);
