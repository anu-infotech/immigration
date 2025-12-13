import MUIDataTable from "mui-datatables";
import React from "react";
import { connect } from "react-redux";
import { Col, Label, Row } from "reactstrap";
import Widget from "../../../components/Widget/Widget";
import Select from "react-select";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import { deleteVisa, editVisa } from "../../../actions/assessment";

const Visa = ({ assessment, deleteVisa, editVisa }) => {

  const columns = [
    {
      name: "_id",
      label: "Details",
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <span>{assessment.first_name + " " + assessment.surname}</span>
              <br></br>
              <br></br>
              <span>{assessment.mobile}</span>
              <br></br>
              <br></br>
              {assessment.email}
              <br></br>
              <br></br>
              {assessment.case_handled_by.email}
            </div>
          );
        },
      },
    },

    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <div>
              <Select
                onChange={async (value) => {
                  const formValues = {
                    status: value
                  }
                  await editVisa(
                    assessment.ref_no,
                    formValues,
                    tableMeta.rowData[4]
                  );
                }}
                onBlur={(event) => event.preventDefault()}
                options={[
                  {
                    value: "Visa not applied",
                    label: "Visa not applied",
                  },
                  {
                    value: "Visa Rejected",
                    label: "Visa Rejected",
                  },
                  {
                    value: "Visa Applied",
                    label: "Visa Applied",
                  },
                  {
                    value: "Visa Recevied",
                    label: "Visa Recevied",
                  },
                ]}
                className="select"
              />
              <div style={{marginTop: "20px"}}>
                <span>Current Status: {value.label}</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    {
      name: "remarks",
      label: "Remarks",
      options: {
        customBodyRender: (value) => {
          return (
            <textarea className="form-control" rows={5} cols={7} readOnly>
              {value}
            </textarea>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Delete",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              style={{ cursor: "pointer" }}
              onClick={async () => {
                await deleteVisa(assessment.ref_no, value);
              }}
            >
              <FontAwesome name="trash-o" color="red" size={18} />
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
    filter: false,
  };

  return (
    <Row style={{ marginTop: "30px" }}>
      <Col sm={12}>
        <Widget customDropDown title={<p className={"fw-bold"}>My Visa(s)</p>}>
          <MUIDataTable
            style={{ textTransform: "capitalize" }}
            title={"Visa(s)"}
            data={assessment.visas}
            columns={columns}
            options={options}
          />
        </Widget>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return { assessment: state.singleAssessment };
};

export default connect(mapStateToProps, {
  deleteVisa: deleteVisa,
  editVisa: editVisa,
})(Visa);
