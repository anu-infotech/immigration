import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getAllReciepts } from "../../actions/reciepts";
import { getAllExpenses } from "../../actions/expenses";
import { connect } from "react-redux";
import R from "./Reciepts";
import E from "./Expense";
import { useEffect } from "react";
import Row from "reactstrap/lib/Row";
import Widget from "../../components/Widget/Widget";
import Col from "reactstrap/lib/Col";

const PL = ({ getAllExpenses, getAllReciepts, reciepts, expenses }) => {
  useEffect(() => {
    getAllReciepts();
    getAllExpenses();
  }, []);

  const calculateTotalGains = () => {
    let total = 0;
    reciepts.map((el) => {
      total += el.amount;
    });
    return total;
  };

  const calculateTotalExpenses = () => {
    let total = 0;
    expenses.map((el) => {
      total += el.amount;
    });
    return total;
  };

  const calculateDifference = () => {
    return calculateTotalGains() - calculateTotalExpenses();
  };

  return (
    <React.Fragment>
      <Row>
        <Col lg={4}>
          <Widget title='Total Gains' bodyClass='profile-widget'>
            {calculateTotalGains()}
          </Widget>
        </Col>
        <Col lg={4}>
          <Widget title='Total Expenses' bodyClass='profile-widget'>
            {calculateTotalExpenses()}
          </Widget>
        </Col>
        <Col lg={4}>
          <Widget title='Total P&L' bodyClass='profile-widget'>
            {calculateDifference()}
          </Widget>
        </Col>
      </Row>
      <Tabs>
        <TabList>
          <Tab>Receipts</Tab>
          <Tab>Expenses</Tab>
        </TabList>

        <TabPanel>
          <R />
        </TabPanel>
        <TabPanel>
          <E />
        </TabPanel>
      </Tabs>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    reciepts: state.reciepts.map((el, index) => {
      el.index = index;
      return el;
    }),

    expenses: state.expenses.map((el, index) => {
      el.index = index;
      return el;
    }),
  };
};

const decoratedComponent = connect(mapStateToProps, {
  getAllReciepts: getAllReciepts,
  getAllExpenses: getAllExpenses,
})(PL);

export default decoratedComponent;
