import React, { useState } from 'react'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import { Row, Col, Table } from 'reactstrap'
import Widget from '../../components/Widget/Widget'

const CreateAssessment = (props) => {
  const [page, setPage] = useState(1)
  const [heading, setHeading] = useState(
    'Please provide the following information to proceed.'
  )

  function nextPage() {
    return setPage(page + 1)
  }

  function previousPage() {
    return setPage(page - 1)
  }
  const renderPages = () => {
    switch (page) {
      case 1:
        return <Page1 nextPage={nextPage} />
      case 2:
        return <Page2 nextPage={nextPage} previousPage={previousPage} />
      case 3:
        return <Page3 previousPage={previousPage} resetForm={() => setPage(1)} />
      default:
        return <Page1 nextPage={nextPage} />
    }
  }

  return (
    <Row>
      <Col xl={12}>
        <Widget
          title={<p style={{ fontWeight: 600 }}>{heading}</p>}
          customDropDown
        >
          <div style={{ marginTop: '40px' }}>{renderPages()}</div>
        </Widget>
      </Col>
    </Row>
  )
}

export default CreateAssessment
