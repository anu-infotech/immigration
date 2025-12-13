import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Row, Col, Table, Button } from 'reactstrap'
import Widget from '../../components/Widget'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { Field, reduxForm } from 'redux-form'
import { renderInput } from '../../renderInputs'
import { getAdmin } from '../../actions/users'

const Account = ({ getAdmin, admin }) => {
  const [statusUpdate, setStatusUpdate] = useState(false)

  useEffect(() => {
    getAdmin(JSON.parse(localStorage.getItem('email')))
  }, [])

  if (admin) {
    return (
      <Tabs>
        <TabList>
          <Tab>General Information</Tab>
          <Tab>Password Reset</Tab>
        </TabList>

        <TabPanel>
          <Row>
            <Col lg={12}>
              <Widget
                title={
                  <p style={{ fontWeight: 600 }}>Change Account Information</p>
                }
                customDropDown
              >
                <Col sm={12} md={12} lg={12} style={{ marginTop: '20px' }}>
                  <Field
                    name="name"
                    component={renderInput}
                    label="Name"
                    type="text"
                    defaultValue={admin.name}
                  />
                </Col>
                <Col sm={12} md={12} lg={12} style={{ marginTop: '20px' }}>
                  <Field
                    name="mobile"
                    component={renderInput}
                    label="Mobile No."
                    type="number"
                  />
                </Col>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    marginTop: '30px',
                  }}
                >
                  <Button type="submit" color="success" size={'lg'}>
                    {statusUpdate === false ? 'Save' : 'Saving'}
                  </Button>
                </Col>
              </Widget>
            </Col>
          </Row>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return { admin: state.admins }
}

const decoratedComponent = withRouter(
  connect(mapStateToProps, {
    getAdmin,
  })(Account)
)

export default reduxForm({
  form: 'userUpdate',
})(decoratedComponent)
