import React, { useState } from "react";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import { Row, Col, Table } from "reactstrap";
import Widget from "../../components/Widget";

const CreateAssessmentNoLogin = (props) => {
  const [page, setPage] = useState(1);
  const [heading, setHeading] = useState(
    "Please fill the assessment in order to proceed."
  );

  function nextPage() {
    return setPage(page + 1);
  }

  function previousPage() {
    return setPage(page - 1);
  }
  const renderPages = () => {
    switch (page) {
      case 1:
        return <Page1 nextPage={nextPage} />;
      case 2:
        return <Page2 nextPage={nextPage} previousPage={previousPage} />;
      case 3:
        return (
          <Page3
            previousPage={previousPage}
            loggedIn={false}
            resetForm={() => setPage(1)}
          />
        );
      default:
        return <Page1 nextPage={nextPage} />;
    }
  };

  return (
    <React.Fragment>
      <Row style={{ padding: "20px" }}>
        <Col xl={12}>
          <img
            src="https://aussiehub.in/wp-content/uploads/2020/03/Aussie-Hub-Logo-1.jpg"
            alt=""
            style={{
              width: "90%",
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "30px",
            }}
          />
          <Widget
            title={<p style={{ fontWeight: 600 }}>{heading}</p>}
            customDropDown
            style={{ padding: "20px" }}
          >
            <div style={{ marginTop: "40px" }}>{renderPages()}</div>
          </Widget>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CreateAssessmentNoLogin;
