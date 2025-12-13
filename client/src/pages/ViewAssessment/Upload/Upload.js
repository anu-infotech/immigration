import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import { FontAwesome } from "react-web-vector-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { addDocument, deleteDocument } from "../../../actions/assessment";
import { renderInput } from "../../../renderInputs";
import "./style.css";

const Upload = ({ handleSubmit, addDocument, assessment, deleteDocument }) => {
  const [modal, setModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);

  


  const closeModal = () => {
    setModal(false);
    setSelected(null);
    setEdit(false);
  };

  const columns = [
    { name: "name", label: "Document Name" },
    {
      name: "uri",
      label: "Download",
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <a href={value} target="_blank">
                <FontAwesome name="cloud-download" color="green" size={25} />
              </a>
            </div>
          );
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
                    deleteDocument(assessment.ref_no, value);
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

  const options = {
    selectableRows: false,
  };

  const renderModal = () => {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(254, 176, 73, 0.4)",
          zIndex: 10000000000000,
          display: modal ? "block" : "none",
          padding: "150px",
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
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <FontAwesome name="remove" color="white" size={22} />
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            // Create an object of formData
            const formData = new FormData();
            // Update the formData object
            formData.append("file", file, file.name);
            setAdding(true);
            await addDocument(
              assessment.ref_no,
              formData,
              data.name,
              assessment.case_handled_by.email
            );
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
          encType="multipart/form-data"
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Upload Document</p>}
              >
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <Field
                      name="name"
                      component={renderInput}
                      type="text"
                      label="Document Name"
                      placeholder="Document Name"
                    />
                  </Col>
                  <Col sm={12} md={12} lg={12}>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />

                    <label for="file">
                      {file ? file.name : "Click to upload supporting document"}
                    </label>
                  </Col>
                </Row>
                <Row style={{ textAlign: "center", marginTop: "20px" }}>
                  <Col sm={12} md={12} lg={12}>
                    <Button type="submit" color="success" size={"lg"}>
                      {adding === false ? "Save" : "Please wait..."}
                    </Button>
                  </Col>
                </Row>
              </Widget>
            </Col>
          </Row>
        </form>
      </div>
    );
  };

  return (
    <div>
      {renderModal()}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Document(s)</p>}
          >
            <Row style={{ marginBottom: "15px", textAlign: "right" }}>
              <Col lg={12}>
                <Button
                  color="success"
                  size="md"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Upload Documents
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  style={{ textTransform: "capitalize" }}
                  title={"List of Document(s)"}
                  data={assessment.documents}
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
  addDocument: addDocument,
  deleteDocument,
})(Upload);

export default reduxForm({
  form: "addDocuments",
  destroyOnUnmount: true,
})(decoratedComponent);
