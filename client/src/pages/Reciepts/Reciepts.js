import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { reduxForm } from "redux-form";
import { createReciepts, getReciepts } from "../../actions/reciepts";
import Widget from "../../components/Widget/Widget";
import ReactToprint from "react-to-print";
import { useRef } from "react";
import Invoice from "./Invoice";


const Reciepts = ({ reciepts, createReciept, assessment, getReciepts }) => {
  const [rName, setRname] = useState(null);
  const [amount, setAmount] = useState(null);
  const invoiceRef = useRef([]);

  useEffect(() => {
    getReciepts(assessment._id);
  }, []);

  const addReceipt = async () => {
    const data = {
      particulars: rName,
      name: assessment.first_name + " " + assessment.surname,
      address: assessment.address,
      mobile: assessment.mobile,
      recieptNumber: Date.now(),
      amount,
      assessmentId: assessment._id,
    };

    await createReciept(data);
  };

  const columns = [
    { name: "name", label: "Name" },
    { name: "mobile", label: "Mobile" },
    {
      name: "amount",
      label: "Total",
      options: {
        customBodyRender: (value) => {
          return `₹ ${value}`;
        },
      },
    },
    {
      name: "particulars",
      label: "Particulars",
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          return date.toLocaleDateString();
        },
      },
    },

    {
      name: "index",
      label: "Print",
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <ReactToprint
                trigger={() => <Button color='success'>Print&rarr;</Button>}
                content={() => invoiceRef.current[value]}
              />
              <div style={{ display: "none" }}>
                <Invoice
                  ref={(el) => (invoiceRef.current[value] = el)}
                  invoice={reciepts[value]}
                  student={assessment}
                />
              </div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    print: false,
    download: false,
  };

  return (
    <Row style={{ marginTop: "15px" }}>
      <Col sm={12}>
        <Widget customDropDown title={<p className={"fw-bold"}>Invoice(s)</p>}>
          <Row style={{ marginBottom: "30px", textAlign: "right" }}>
            <Col lg={4}>
              <input
                type='text'
                placeholder='Enter type'
                className='form-control'
                onChange={(e) => setRname(e.target.value)}
              />
            </Col>
            <Col lg={4}>
              <input
                type='number'
                placeholder='Enter amount'
                className='form-control'
                onChange={(e) => setAmount(e.target.value)}
              />
            </Col>
            <Col lg={4}>
              <Button color='success' onClick={() => addReceipt()} size='md'>
                Generate Invoice
              </Button>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <MUIDataTable
                style={{ textTransform: "capitalize" }}
                title={"List of Invoice(s)"}
                data={reciepts ? reciepts : []}
                columns={columns}
                options={options}
              />
            </Col>
          </Row>
        </Widget>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    reciepts: state.reciepts.map((el, index) => {
      el.index = index;
      return el;
    }),
  };
};

const decoratedComponent = connect(mapStateToProps, {
  createReciept: createReciepts,
  getReciepts: getReciepts,
})(Reciepts);

export default reduxForm({
  form: "addReciept",
  destroyOnUnmount: true,
})(decoratedComponent);
