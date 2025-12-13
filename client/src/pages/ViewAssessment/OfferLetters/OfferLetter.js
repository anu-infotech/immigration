import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button, Label } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  deleteOfferLetter,
  createDeposit,
  updateApplicationType,
} from "../../../actions/assessment";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import "./style.css";

const OfferLetter = ({
  assessment,
  deleteOfferLetter,
  createDeposit,
  updateApplicationType,
}) => {
  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [running, setRunning] = useState(false);
  // Form Values
  const [file, setFile] = useState(null);
  const [depositType, setDepositType] = useState(null);
  const [amount, setAmount] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [dateOfIssue, setDateOfIssue] = useState(null);
  const [number, setNumber] = useState(null);
  const [bank, setBank] = useState(null);
  const [courierName, setCourierName] = useState(null);
  const [docketNumber, setDocketNumber] = useState(null);
  const [dateOfDispatch, setDateOfDispatch] = useState(null);
  const [ddDescription, setDDDescription] = useState(null);
  const [deferIntake, setDeferIntake] = useState(null);
  const [deferRemarks, setDeferRemarks] = useState(null);

  const save = async () => {
    const formValues = {
      depositType,
      amount,
      remarks,
      dateOfDispatch,
      dateOfIssue,
      number,
      bank,
      courierName,
      docketNumber,
      ddDescription,
      assessment: assessment.ref_no,
      caseHandler: assessment.case_handled_by.email,
      offerLetter: selected,
    };

    const formData = new FormData();
    if (file) {
      formData.append("file", file, file.name);
    }
    formData.append("formValues", JSON.stringify(formValues));
    setRunning(true);
    await createDeposit(assessment.ref_no, formData);
    setRunning(false);
    setModalType(null);
  };

  const saveDefer = async (apn) => {
    const formValues = {
      deferRemarks,
      deferIntake,
    };

    setRunning(true);
    await updateApplicationType(assessment.ref_no, apn, formValues);
    setRunning(false);
    setModalType(null);
  };

  const closeModal = () => {
    setSelected(null);
    setModalType(null);
  };

  const columns = [
    {
      name: "offerNumber",
      label: "Offer No.",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "date",
      label: "R Date.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          console.log(tableMeta);
          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                {new Date(value).toDateString()}
              </span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].program}</span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].university.label}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{tableMeta.rowData[3]}</span>
            </div>
          );
        },
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: "exclude",
        filter: false,
        sort: false,
      },
    },

    {
      name: "intake",
      label: "Intake",
      options: {
        display: false,
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.program;
        },
      },
    },
    {
      name: "course",
      label: "University",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.university.label;
        },
      },
    },

    {
      name: "offerLetterUri",
      label: "Doc",
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
    {
      name: "_id",
      label: "Deposit/Defer",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  setModalType("deposit");
                  setSelected(value);
                }}
              >
                Deposit
              </Button>
            </>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Act.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  const sure = window.confirm(
                    "Are you sure you want to delete this entry?"
                  );
                  if (sure) {
                    deleteOfferLetter(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "apn",
      label: "Application No.",
      options: {
        display: false,
      },
    },
  ];

  const columns1 = [
    {
      name: "offerNumber",
      label: "Offer No.",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "date",
      label: "R Date.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          console.log(tableMeta);
          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                {new Date(value).toDateString()}
              </span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].program}</span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].university.label}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{tableMeta.rowData[3]}</span>
            </div>
          );
        },
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: "exclude",
        filter: false,
        sort: false,
      },
    },

    {
      name: "intake",
      label: "Intake",
      options: {
        display: false,
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.program;
        },
      },
    },
    {
      name: "course",
      label: "University",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.university.label;
        },
      },
    },

    {
      name: "offerLetterUri",
      label: "Doc",
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
    {
      name: "_id",
      label: "Deposit/Defer",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <>
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  setModalType("deposit");
                  setSelected(value);
                }}
              >
                Deposit
              </Button>
            </>
          );
        },
      },
    },
    {
      name: "conditions",
      label: "Conditions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <textarea readOnly className="form-control" cols={12} rows={7}>
              {value}
            </textarea>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Act.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  const sure = window.confirm(
                    "Are you sure you want to delete this entry?"
                  );
                  if (sure) {
                    deleteOfferLetter(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const columns2 = [
    {
      name: "offerNumber",
      label: "Offer No.",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "date",
      label: "R Date.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          console.log(tableMeta);
          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                {new Date(value).toDateString()}
              </span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].program}</span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].university.label}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{tableMeta.rowData[3]}</span>
            </div>
          );
        },
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: "exclude",
        filter: false,
        sort: false,
      },
    },

    {
      name: "intake",
      label: "Intake",
      options: {
        display: false,
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.program;
        },
      },
    },
    {
      name: "course",
      label: "University",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.university.label;
        },
      },
    },
    {
      name: "moreDocuments",
      label: "Add Documents",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <textarea readOnly className="form-control" cols={12} rows={7}>
              {value}
            </textarea>
          );
        },
      },
    },

    {
      name: "_id",
      label: "Act.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  const sure = window.confirm(
                    "Are you sure you want to delete this entry?"
                  );
                  if (sure) {
                    deleteOfferLetter(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <FontAwesome name="pencil" color="orange" size={18} />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const columns3 = [
    {
      name: "offerNumber",
      label: "Offer No.",
      options: {
        filter: false,
        sort: false,
      },
    },

    {
      name: "date",
      label: "R Date.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          console.log(tableMeta);
          return (
            <div>
              <span style={{ fontWeight: "bold" }}>
                {new Date(value).toDateString()}
              </span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].program}</span>
              <br></br>
              <br></br>
              <span>{tableMeta.rowData[2].university.label}</span>
              <br></br>
              <br></br>
              <span style={{ fontWeight: "bold" }}>{tableMeta.rowData[3]}</span>
            </div>
          );
        },
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: "exclude",
        filter: false,
        sort: false,
      },
    },

    {
      name: "intake",
      label: "Intake",
      options: {
        display: false,
      },
    },

    {
      name: "course",
      label: "Course",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.program;
        },
      },
    },
    {
      name: "course",
      label: "University",
      options: {
        display: false,
        customBodyRender: (value) => {
          return value.university.label;
        },
      },
    },
    {
      name: "rejectionReason",
      label: "Reason",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <textarea readOnly className="form-control" cols={12} rows={7}>
              {value}
            </textarea>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Act.",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  const sure = window.confirm(
                    "Are you sure you want to delete this entry?"
                  );
                  if (sure) {
                    deleteOfferLetter(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
              <div style={{ display: "flex", marginLeft: "10px" }}>
                <FontAwesome name="pencil" color="orange" size={18} />
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

  const renderFieldsAccord = () => {
    if (depositType) {
      switch (depositType.value) {
        case "Telegrahic Transfer":
          return (
            <Row>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Amount to Deposit</Label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    required
                    className="form-control"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Telegraphic Transfer Number</Label>
                  <input
                    type="text"
                    placeholder="Enter transfer no."
                    required
                    className="form-control"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Bank Drawn on</Label>
                  <input
                    type="text"
                    placeholder="Enter bank name"
                    required
                    className="form-control"
                    onChange={(e) => setBank(e.target.value)}
                    value={bank}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Date of issue</Label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    onChange={(e) => setDateOfIssue(e.target.value)}
                    value={dateOfIssue}
                  />
                </div>
              </Col>
            </Row>
          );
          break;

        case "Demand Draft":
          return (
            <Row>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Amount to Deposit</Label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    required
                    className="form-control"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Demand Draft Number</Label>
                  <input
                    type="text"
                    placeholder="Enter DD no."
                    required
                    className="form-control"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Bank Drawn on</Label>

                  <input
                    type="text"
                    placeholder="Enter bank name"
                    required
                    className="form-control"
                    onChange={(e) => setBank(e.target.value)}
                    value={bank}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Date of issue</Label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    onChange={(e) => setDateOfIssue(e.target.value)}
                    value={dateOfIssue}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Courier Name</Label>
                  <input
                    type="text"
                    placeholder="Enter courier name"
                    required
                    className="form-control"
                    onChange={(e) => setCourierName(e.target.value)}
                    value={courierName}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Docket Number</Label>
                  <input
                    type="text"
                    placeholder="Enter docket no."
                    required
                    className="form-control"
                    onChange={(e) => setDocketNumber(e.target.value)}
                    value={docketNumber}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Date of Dispatch</Label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    onChange={(e) => setDateOfDispatch(e.target.value)}
                    value={dateOfDispatch}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>DD Description</Label>
                  <input
                    type="text"
                    placeholder="Enter DD Description"
                    required
                    className="form-control"
                    onChange={(e) => setDDDescription(e.target.value)}
                    value={ddDescription}
                  />
                </div>
              </Col>
            </Row>
          );
          break;
        case "Credit Card":
          return (
            <Row>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Amount to Deposit</Label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    required
                    className="form-control"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Credit Card Number</Label>
                  <input
                    type="number"
                    placeholder="Enter cc no."
                    required
                    className="form-control"
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Bank Drawn on</Label>
                  <input
                    type="text"
                    placeholder="Enter bank name"
                    required
                    className="form-control"
                    onChange={(e) => setBank(e.target.value)}
                    value={bank}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Date of issue</Label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    onChange={(e) => setDateOfIssue(e.target.value)}
                    value={dateOfIssue}
                  />
                </div>
              </Col>
            </Row>
          );
          break;

        case "Direct Payment":
          return (
            <Row>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Amount to Deposit</Label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    required
                    className="form-control"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
              </Col>
              <Col lg={3}>
                <div className="form-group">
                  <Label>Date of issue</Label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    onChange={(e) => setDateOfIssue(e.target.value)}
                    value={dateOfIssue}
                  />
                </div>
              </Col>
            </Row>
          );
          break;

        default:
          break;
      }
    }
  };

  const renderDefer = () => {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Transfer to Defer</p>}
          >
            <div className="form-group">
              <Label>Intake</Label>
              <Select
                onChange={(value) => {
                  setDeferIntake(value);
                }}
                onBlur={(event) => event.preventDefault()}
                options={[
                  { value: "January 2024", label: "January 2024 " },
                  { value: "February 2024", label: "February 2024 " },
                  { value: "March 2024", label: "March 2024 " },
                  { value: "April 2024", label: "April 2024 " },
                  { value: "May 2024", label: "May 2024 " },
                  { value: "June 2024", label: "June 2024 " },
                  { value: "July 2024", label: "July 2024 " },
                  { value: "August 2024", label: "August 2024 " },
                  { value: "September 2024", label: "September 2024 " },
                  { value: "October 2024", label: "October 2024 " },
                  { value: "November 2024", label: "November 2024 " },
                  { value: "December 2024", label: "December 2024 " },
                  { value: "January 2025", label: "January 2025 " },
                  { value: "February 2025", label: "February 2025 " },
                  { value: "March 2025", label: "March 2025 " },
                  { value: "April 2025", label: "April 2025 " },
                  { value: "May 2025", label: "May 2025 " },
                  { value: "June 2025", label: "June 2025 " },
                  { value: "July 2025", label: "July 2025 " },
                  { value: "August 2025", label: "August 2025 " },
                  { value: "September 2025", label: "September 2025 " },
                  { value: "October 2025", label: "October 2025 " },
                  { value: "November 2025", label: "November 2025 " },
                  { value: "December 2025", label: "December 2025 " },
                  { value: "January 2026", label: "January 2026 " },
                  { value: "February 2026", label: "February 2026 " },
                  { value: "March 2026", label: "March 2026 " },
                  { value: "April 2026", label: "April 2026 " },
                  { value: "May 2026", label: "May 2026 " },
                  { value: "June 2026", label: "June 2026 " },
                  { value: "July 2026", label: "July 2026 " },
                  { value: "August 2026", label: "August 2026 " },
                  { value: "September 2026", label: "September 2026 " },
                  { value: "October 2026", label: "October 2026 " },
                  { value: "November 2026", label: "November 2026 " },
                  { value: "December 2026", label: "December 2026 " },
                ]}
                className="select"
              />
            </div>
            <Row>
              <Col lg={12}>
                <div className="form-group">
                  <Label>Enter Remarks</Label>
                  <textarea
                    className="form-control"
                    placeholder="Enter remarks"
                    onChange={(e) => setDeferRemarks(e.target.value)}
                  >
                    {remarks}
                  </textarea>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12} style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  size="lg"
                  onClick={saveDefer}
                  disabled={running}
                >
                  Save&rarr;
                </Button>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
    );
  };

  const renderModal = () => {
    if (modalType) {
      switch (modalType) {
        case "deposit":
          return renderDepoist();
        case "defer":
          return renderDefer();
        default:
          break;
      }
    }
  };

  const renderDepoist = () => {
    return (
      <Row style={{ marginTop: "20px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Create Deposit</p>}
          >
            <div className="form-group">
              <Label>Deposit Type</Label>
              <Select
                onChange={(value) => {
                  setDepositType(value);
                }}
                onBlur={(event) => event.preventDefault()}
                options={[
                  {
                    value: "No Payment Required by University",
                    label: "No Payment Required by University",
                  },
                  {
                    value: "Telegrahic Transfer",
                    label: "Telegrahic Transfer",
                  },
                  { value: "Demand Draft", label: "Demand Draft" },
                  { value: "Credit Card", label: "Credit Card" },
                  { value: "Direct Payment", label: "Direct Payment" },
                ]}
                className="select"
              />
            </div>
            {renderFieldsAccord()}
            <Row>
              <Col lg={12}>
                <div className="form-group">
                  <Label>Enter Deposit Remarks</Label>
                  <textarea
                    className="form-control"
                    placeholder="Enter remarks"
                    onChange={(e) => setRemarks(e.target.value)}
                  >
                    {remarks}
                  </textarea>
                </div>
              </Col>
              <Col lg={12}>
                <div className="form-group">
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  <label for="file">
                    {file ? file.name : "Click to upload legal paperwork"}
                  </label>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12} style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  size="lg"
                  onClick={save}
                  disabled={running}
                >
                  Save&rarr;
                </Button>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
    );
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          backgroundColor: "rgba(41, 22, 111, 0.4)",
          display: modalType ? "block" : "none",
          zIndex: 10000000000000,
          padding: "40px",
        }}
      >
        <div
          onClick={() => closeModal()}
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            cursor: "pointer",
            height: "40px",
            width: "40px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <FontAwesome name="remove" color="white" size={22} />
        </div>
        {renderModal()}
      </div>

      <Row style={{ marginTop: "30px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>My Offer Letter(s)</p>}
          >
            <Tabs>
              <TabList>
                <Tab>Unconditional</Tab>
                <Tab>Conditional</Tab>
                <Tab>More Documents Required</Tab>
                <Tab>Rejected</Tab>
              </TabList>

              <TabPanel>
                <Row style={{ marginTop: "50px" }}>
                  <Col lg={12}>
                    <MUIDataTable
                      style={{ textTransform: "capitalize" }}
                      title={"Unconditional Offer Letter(s)"}
                      data={assessment.offerLetters.filter(
                        (offer) => offer.status.value === "Unconditional"
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
                      title={"Conditional Offer Letter(s)"}
                      data={assessment.offerLetters.filter(
                        (offer) => offer.status.value === "Conditional"
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
                      title={"More Documents Required"}
                      data={assessment.offerLetters.filter(
                        (offer) =>
                          offer.status.value ===
                          "More Documents Required by University"
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
                      title={"Rejected Offer Letter(s)"}
                      data={assessment.offerLetters.filter(
                        (offer) => offer.status.value === "Rejected"
                      )}
                      columns={columns3}
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
  deleteOfferLetter: deleteOfferLetter,
  createDeposit: createDeposit,
  updateApplicationType,
})(OfferLetter);

export default reduxForm({
  form: "addFollowups",
  destroyOnUnmount: true,
})(decoratedComponent);
