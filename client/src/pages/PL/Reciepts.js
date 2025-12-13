import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { reduxForm } from "redux-form";
import { getAllReciepts } from "../../actions/reciepts";
import Widget from "../../components/Widget/Widget";


const Reciepts = ({ reciepts, createReciept, assessment, getAllReciepts }) => {


  useEffect(() => {
    getAllReciepts();
  }, []);

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
        <Widget customDropDown title={<p className={"fw-bold"}>Invoice(s)</p>}>
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
  getAllReciepts,
})(Reciepts);

export default decoratedComponent
