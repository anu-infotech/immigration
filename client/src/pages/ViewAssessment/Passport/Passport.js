import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { passportFields } from "../fields";
import { renderInput } from "../../../renderInputs";
import {
  addOfficialMobileNumber,
  addOfficialEmail,
  addTotalAmount,
  addPassport,
  deletePassport,
} from "../../../actions/assessment";
import EditPassport from "./EditPassport";

const Passport = ({
  handleSubmit,
  assessment,
  deletePassport,
  addPassport,
  addOfficialMobileNumber,
  addOfficialEmail,
  addTotalAmount,
}) => {
  const [modal, setModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState(null);
  const [amount, setAmount] = useState(null);

  const closeModal = () => {
    setModal(false);
    setSelected(null);
    setEdit(false);
  };
  const columns = [
    {
      name: "number",
      label: "Passport No.",
    },
    {
      name: "validFrom",
      label: "From",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    {
      name: "validTo",
      label: "To",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    {
      name: "address",
      label: "address",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className='form-control' rows={5} cols={6} readonly>
              {value}
            </textarea>
          );
        },
      },
    },
    { name: "issuePlace", label: "Issued Place" },
  ];

  const options = {
    selectableRows: false,
  };

  const renderFields = () => {
    return passportFields.map((field) => {
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
          <FontAwesome name='remove' color='white' size={22} />
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            setAdding(true);
            await addPassport(assessment.ref_no, data);
            setAdding(false);
            closeModal();
          })}
          style={{ width: "100%" }}
        >
          <Row style={{ marginTop: "30px" }}>
            <Col sm={12}>
              <Widget
                customDropDown
                title={<p className={"fw-bold"}>Add Passport</p>}
              >
                <Row>{renderFields()}</Row>
                <Row style={{ textAlign: "center", marginTop: "20px" }}>
                  <Col sm={12} md={12} lg={12}>
                    <Button type='submit' color='success' size={"lg"}>
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
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Official Mobile Number(s)</p>}
          >
            <div className='form-group'>
              <label htmlFor=''>Official Mobile Number</label>
              <input
                type='number'
                name=''
                id=''
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className='form-control'
              />
            </div>
            <button
              className='btn btn-success'
              onClick={async () => {
                await addOfficialMobileNumber(assessment.ref_no, mobile);
              }}
            >
              Save Mobile
            </button>
          </Widget>
        </Col>
      </Row>

      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Official Email(s)</p>}
          >
            <div className='form-group'>
              <label htmlFor=''>Official Email</label>
              <input
                type='email'
                name=''
                id=''
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
              />
            </div>
            <button
              className='btn btn-success'
              onClick={async () => {
                await addOfficialEmail(assessment.ref_no, email);
              }}
            >
              Save Email
            </button>
          </Widget>
        </Col>
      </Row>


      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Total Package Amount</p>}
          >
            <div className='form-group'>
              <label htmlFor=''>Total Amount</label>
              <input
                type='number'
                name=''
                id=''
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='form-control'
              />
            </div>
            <button
              className='btn btn-success'
              onClick={async () => {
                await addTotalAmount(assessment.ref_no, amount);
              }}
            >
              Save Amount
            </button>
          </Widget>
        </Col>
      </Row>

      {edit ? (
        <EditPassport
          initialValues={assessment.passport.find((passport) => {
            return passport._id === selected;
          })}
        closeModal={closeModal}
        />
      ) : (
        renderModal()
      )}
      <Row style={{ marginTop: "15px" }}>
        <Col sm={12}>
          <Widget
            customDropDown
            title={<p className={"fw-bold"}>Qualification(s)</p>}
          >
            <Row style={{ marginBottom: "15px", textAlign: "right" }}>
              <Col lg={12}>
                <Button
                  color='success'
                  size='md'
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Add Passport
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <MUIDataTable
                  style={{ textTransform: "capitalize" }}
                  title={"Passport"}
                  data={assessment.passport}
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
  addPassport,
  deletePassport,
  addOfficialMobileNumber: addOfficialMobileNumber,
  addOfficialEmail: addOfficialEmail,
  addTotalAmount
})(Passport);

export default reduxForm({
  form: "addPassports",
  destroyOnUnmount: true,
})(decoratedComponent);
