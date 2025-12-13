import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import { addTest, deleteTest } from "../../../actions/assessment";
import Widget from "../../../components/Widget/Widget";
import { testTakenFields } from "../fields";
import EditTest from "./EditTest";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { renderInput, renderSelect } from "../../../renderInputs";
const TestTaken = ({ handleSubmit, addTest, assessment, deleteTest }) => {
  const [modal, setModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const closeModal = () => {
    setModal(false);
    setSelected(null);
    setEdit(false);
  };
  const columns = [
    {
      name: "testName",
      label: "Test Name",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    { name: "testScore", label: "Test Score" },
    { name: "referenceNo", label: "Reference No." },
    {
      name: "date",
      label: "Test Date",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toDateString();
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
                    deleteTest(assessment.ref_no, value);
                  } else {
                    return false;
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <FontAwesome name="trash-o" color="red" size={18} />
              </div>
              <div
                style={{ cursor: "pointer", marginLeft: "20px" }}
                onClick={() => {
                  setSelected(value);
                  setEdit(true);
                }}
              >
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

  const renderFields = () => {
    return testTakenFields.map((field) => {
      if (field.type === "select") {
        return (
          <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
            <Field
              name={field.name}
              component={renderSelect}
              label={field.label.toUpperCase()}
              options={field.options}
            />
          </Col>
        );
      }

      return (
        <Col sm={12} md={6} lg={4} style={{ marginTop: "20px" }}>
          <Field
            name={field.name}
            component={renderInput}
            label={field.label.toUpperCase()}
            type={field.type}
          />
        </Col>
      );
    });
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
          backgroundColor: "rgba(41, 22, 111, 0.4)",
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
            setAdding(true);
            await addTest(assessment.ref_no, data);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Add Test</p>}
              >
                <Row>{renderFields()}</Row>
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
      {edit ? (
        <EditTest
          initialValues={assessment.testTaken.find((test) => {
            if (test._id == selected) {
              function pad(n) {
                return n < 10 ? "0" + n : n;
              }
              const year = new Date(test.date).getFullYear();
              const month = new Date(test.date).getMonth();
              const day = new Date(test.date).getDate();
              test.date = year + "-" + pad(month + 1) + "-" + pad(day);
              return test;
            }
          })}
          closeModal={closeModal}
        />
      ) : (
        renderModal()
      )}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget customDropDown title={<p className={"fw-bold"}>Test(s)</p>}>
            <Row style={{ marginBottom: "15px", textAlign: "right" }}>
              <Col lg={12}>
                <Button
                  color="success"
                  size="md"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Add Test
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  title={"List of test(s) taken"}
                  data={assessment.testTaken}
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
  addTest,
  deleteTest,
})(TestTaken);

export default reduxForm({
  form: "addTest",
  destroyOnUnmount: true,
})(decoratedComponent);
