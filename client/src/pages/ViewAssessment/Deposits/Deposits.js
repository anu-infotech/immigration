import MUIDataTable from "mui-datatables";
import React from "react";
import { Row, Col } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { deleteDeposit } from "../../../actions/assessment";

const Deposits = ({ assessment, deleteDeposit }) => {
  const columns = [
    {
      name: "id",
      label: "Details",
      options: {
        customBodyRender: (value) => {
          const deposit = assessment.deposits.find((deposit) => {
            if (deposit.id === value) {
              return deposit;
            }
          });

          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                Doc:{" "}
                <a href={deposit.documentURI}>
                  {deposit.documentURI ? "Legal doc" : "N/A"}
                </a>
              </span>
            </div>
          );
        },
      },
    },

    {
      name: "remarks",
      label: "Remarks",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={7} cols={12} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "offerLetter",
      label: "Details",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const offerLetter = assessment.offerLetters.find(
            (offer) => offer._id === value
          );
          return (
            <div>
              <span>{offerLetter.course.program}</span>
              <br></br>
              <br></br>
              <span>{offerLetter.university.name}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{offerLetter.intake}</span>
            </div>
          );
        },
      },
    },
  ];

  const columns1 = [
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "dateOfIssue",
      label: "Date of Issue",

      options: {
        customBodyRender: (value) => {
          return new Date(value).toDateString();
        },
        filter: false,
        sort: false,
      },
    },

    {
      name: "id",
      label: "Details",
      options: {
        customBodyRender: (value) => {
          const deposit = assessment.deposits.find((deposit) => {
            if (deposit.id === value) {
              return deposit;
            }
          });

          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                Tele No: {deposit.number}
              </span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>Bank: {deposit.bank}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>
                Doc:{" "}
                <a href={deposit.documentURI}>
                  {deposit.documentURI ? "Legal doc" : "N/A"}
                </a>
              </span>
            </div>
          );
        },
      },
    },

    {
      name: "remarks",
      label: "Remarks",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={7} cols={12} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "offerLetter",
      label: "Details",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const offerLetter = assessment.offerLetters.find(
            (offer) => offer._id === value
          );
          return (
            <div>
              <span>{offerLetter.course.program}</span>
              <br></br>
              <br></br>
              <span>{offerLetter.university.name}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{offerLetter.intake}</span>
            </div>
          );
        },
      },
    },

    {
      name: "documentURI",
      label: "Legal Doc.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <a href={value} target="_blank">
              Offer Letter
            </a>
          );
        },
      },
    },
  ];

  const columns2 = [
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return `₹ ${value}`;
        },
      },
    },

    {
      name: "dateOfIssue",
      label: "Date of Issue",

      options: {
        customBodyRender: (value) => {
          return new Date(value).toDateString();
        },
        filter: false,
        sort: false,
      },
    },
    {
      name: "docketNumber",
      label: "Details",
      options: {
        customBodyRender: (value) => {
          const deposit = assessment.deposits.find((deposit) => {
            if (deposit.docketNumber === value) {
              return deposit;
            }
          });

          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                DD No: {deposit.number}
              </span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>
                C Name: {deposit.courierName}
              </span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>
                Docket No: {deposit.docketNumber}
              </span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>Bank: {deposit.bank}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>
                DOD: {new Date(deposit.dateOfDispatch).toLocaleDateString()}
              </span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>
                Doc:{" "}
                <a href={deposit.documentURI}>
                  {deposit.documentURI ? "Legal doc" : "N/A"}
                </a>
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "remarks",
      label: "Remarks",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={7} cols={12} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "offerLetter",
      label: "Details",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const offerLetter = assessment.offerLetters.find(
            (offer) => offer._id === value
          );

          console.log(offerLetter);
          return (
            <div>
              <span>{offerLetter.course.program}</span>
              <br></br>
              <br></br>
              <span>{offerLetter.university.name}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{offerLetter.intake}</span>
            </div>
          );
        },
      },
    },

    {
      name: "documentURI",
      label: "Legal Doc.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <a href={value} target="_blank">
              Offer Letter
            </a>
          );
        },
      },
    },
  ];

  const columns3 = [
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "dateOfIssue",
      label: "Date of Issue",

      options: {
        customBodyRender: (value) => {
          return new Date(value).toDateString();
        },
        filter: false,
        sort: false,
      },
    },

    {
      name: "id",
      label: "Details",
      options: {
        customBodyRender: (value) => {
          const deposit = assessment.deposits.find((deposit) => {
            if (deposit.id === value) {
              return deposit;
            }
          });

          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                CC No: {deposit.number}
              </span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>Bank: {deposit.bank}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>
                Doc:{" "}
                <a href={deposit.documentURI}>
                  {deposit.documentURI ? "Legal doc" : "N/A"}
                </a>
              </span>
            </div>
          );
        },
      },
    },

    {
      name: "remarks",
      label: "Remarks",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={7} cols={12} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "offerLetter",
      label: "Details",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const offerLetter = assessment.offerLetters.find(
            (offer) => offer._id === value
          );

          console.log(offerLetter);
          return (
            <div>
              <span>{offerLetter.course.program}</span>
              <br></br>
              <br></br>
              <span>{offerLetter.university.name}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{offerLetter.intake}</span>
            </div>
          );
        },
      },
    },
  ];

  const columns4 = [
    {
      name: "amount",
      label: "Amount",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "dateOfIssue",
      label: "Date of Issue",

      options: {
        customBodyRender: (value) => {
          return new Date(value).toDateString();
        },
        filter: false,
        sort: false,
      },
    },
    {
      name: "remarks",
      label: "Remarks",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={7} cols={12} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "offerLetter",
      label: "Details",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          const offerLetter = assessment.offerLetters.find(
            (offer) => offer._id === value
          );

          console.log(offerLetter);
          return (
            <div>
              <span>{offerLetter.course.program}</span>
              <br></br>
              <br></br>
              <span>{offerLetter.university.name}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{offerLetter.intake}</span>
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
      <Row style={{ marginTop: "30px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>My Deposits</p>}
          >
            <Tabs>
              <TabList>
                <Tab>No Payment Required by University</Tab>
                <Tab>Telegrahic Transfer</Tab>
                <Tab>Demand Draft</Tab>
                <Tab>Credit Card</Tab>
                <Tab>Direct Payment</Tab>
              </TabList>

              <TabPanel>
                <Row style={{ marginTop: "50px" }}>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"No Payment Required by University"}
                      data={assessment.deposits.filter(
                        (offer) =>
                          offer.depositType.value ===
                          "No Payment Required by University"
                      )}
                      columns={columns}
                      options={options}
                    />
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel>
                <Row style={{ marginTop: "50px" }}>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"Telegrahic Transfer"}
                      data={assessment.deposits.filter(
                        (offer) =>
                          offer.depositType.value === "Telegrahic Transfer"
                      )}
                      columns={columns1}
                      options={options}
                    />
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel>
                <Row style={{ marginTop: "50px" }}>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"Demand Drafts"}
                      data={assessment.deposits.filter(
                        (offer) => offer.depositType.value === "Demand Draft"
                      )}
                      columns={columns2}
                      options={options}
                    />
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel>
                <Row style={{ marginTop: "50px" }}>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"Credit Card"}
                      data={assessment.deposits.filter(
                        (offer) => offer.depositType.value === "Credit Card"
                      )}
                      columns={columns3}
                      options={options}
                    />
                  </Col>
                </Row>
              </TabPanel>
              <TabPanel>
                <Row style={{ marginTop: "50px" }}>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"Direct Payments"}
                      data={assessment.deposits.filter(
                        (offer) => offer.depositType.value === "Direct Payment"
                      )}
                      columns={columns4}
                      options={options}
                    />
                  </Col>
                </Row>
              </TabPanel>
            </Tabs>
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
  deleteDeposit: deleteDeposit,
})(Deposits);

export default reduxForm({
  form: "addFollowups",
  destroyOnUnmount: true,
})(decoratedComponent);
