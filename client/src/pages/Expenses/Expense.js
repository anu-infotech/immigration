import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { reduxForm } from "redux-form";
import { createExpense, getExpenses } from "../../actions/expenses";
import Widget from "../../components/Widget/Widget";

const Expenses = ({ reciepts, createExpense, assessment, getExpenses }) => {
  const [rName, setRname] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    getExpenses(assessment._id);
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

    await createExpense(data);
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
  ];

  const options = {
    selectableRows: false,
    print: false,
    download: false,
  };

  return (
    <Row style={{ marginTop: "15px" }}>
      <Col sm={12}>
        <Widget customDropDown title={<p className={"fw-bold"}>Expenses(s)</p>}>
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
                Generate Expense
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
    reciepts: state.expenses.map((el, index) => {
      el.index = index;
      return el;
    }),
  };
};

const decoratedComponent = connect(mapStateToProps, {
  createExpense: createExpense,
  getExpenses: getExpenses,
})(Expenses);

export default reduxForm({
  form: "addExpense",
  destroyOnUnmount: true,
})(decoratedComponent);
