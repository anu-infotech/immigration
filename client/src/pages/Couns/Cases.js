import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { getCases } from "../../actions/assessment";

const Cases = ({ getCases, assessments, match, history }) => {
  const [running, setRunning] = useState(true);

  const init = async () => {
    setRunning(true);
    await getCases(match.params.email);
    setRunning(false);
  };

  useEffect(() => {
    init();
  }, []);

  const columns = [
    {
      name: "ref_no",
      label: "Reference No.",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "first_name",
      label: "First name",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "country_apply_for",
      label: "Apply For",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <span>{value.label}</span>;
        },
      },
    },
    {
      name: "case_handled_by",
      label: "Counsellors",
      options: {
        display: false,
        filter: true,
        customBodyRender: (value) => {
          return value.email;
        },
      },
    },
    {
      name: "case_handled_by",
      label: "Case Handler",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <span>
              <span>{value ? value.name : "N/A"}</span>
              <br></br>
              <small>{value ? value.email : "N/A"}</small>
            </span>
          );
        },
      },
    },
    {
      name: "photo",
      label: "Photo",
      options: {
        filter: false,
        customBodyRender: (value) => {
          if (value) {
            return (
              <img
                src={value}
                style={{
                  height: "120px",
                  width: "120px",
                  objectFit: "cover",
                }}
                alt=""
              />
            );
          } else {
            return "N/A";
          }
        },
      },
    },
    {
      name: "ref_no",
      label: "View",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <Button
                color="success"
                size={"sm"}
                onClick={() => {
                  const win = window.open(
                    "/#/app/view-assessment/" + value,
                    "_blank"
                  );
                  win.focus();
                }}
              >
                View
              </Button>
            </React.Fragment>
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

  if (!assessments || running) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <MUIDataTable data={assessments} columns={columns} options={options} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { assessments: state.assessment };
};

export default connect(mapStateToProps, {
  getCases: getCases,
})(Cases);
