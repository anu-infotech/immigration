import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button, Label, Row } from "reactstrap";
import { deleteBranch, getBranches } from "../../actions/branches";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import CreateBranch from "./CreateBranch";
import EditBranch from "./EditBranch";
import "./style.css";
import ViewBranch from "./View";
const Branches = ({ branches, getBranches, deleteBranch }) => {
  const updateBranches = async () => {
    await getBranches();
  };

  useEffect(() => {
    updateBranches();
  }, []);



  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.type;
  const email = user.email;
  const [selected, setSelected] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [edit, setEdit] = useState(false);
  const closeModal = () => {
    setSelected(null);
    setSelectedData(null);
    setEdit(false);
  };

  if (!branches) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PacmanLoader size={30} color={"#29166F"} loading={true} />
      </div>
    );
  }

  const columns = [
    {
      name: "name",
      label: "Branch Name",
      options: {
        customBodyRender: (value) => {
          return value;
        },
      },
    },

    {
      name: "_id",
      label: "View",
      options: {
        display: false,
        download: false,
        customBodyRender: (value) => {
          return (
            <Button
              color="success"
              onClick={() => {
                setSelected(value);
              }}
            >
              View
            </Button>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Edit",
      options: {
        display: false,
        download: false,
        customBodyRender: (value) => {
          return (
            <Button
              color="warning"
              onClick={() => {
                setSelected(value);
                setEdit(true);
              }}
            >
              Edit
            </Button>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        display: (email == 'superadmin@aussiehub.co.in'),
        download: false,
        customBodyRender: (value) => {
          return (
            <Button
              color="danger"
              style={{ marginLeft: "10px" }}
              size={"sm"}
              onClick={async () => {
                const confirm = window.confirm(
                  "Are you sure you want to proceed. Once deleted the data can not be reterieved back."
                );
                if (confirm) {
                  const confirm2 = window.confirm(
                    "You are about to delete this file. All data will be lost."
                  );

                  if (confirm2) {
                    await deleteBranch(value);
                  } else {
                    return false;
                  }
                } else {
                  return false;
                }
              }}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    downloadOptions: {
      filterOptions: {
        useDisplayedColumnsOnly: false,
        useDisplayedRowsOnly: true,
      },
    },
  };

  const openModal = () => {
    if (selected) {
      if (edit) {
        return (
          <EditBranch
            initialValues={branches.find((branch) => {
              if (branch._id == selected) {
                return branch;
              }
            })}
            closeModal={closeModal}
          />
        );
      } else {
        return (
          <ViewBranch
            selected={selected}
            closeModal={closeModal}
            branch={branches.find((branch) => {
              if (branch._id == selected) {
                return branch;
              }
            })}
          />
        );
      }
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "max-content",
          width: "100%",
          backgroundColor: "rgba(41, 22, 111, 0.4)",
          zIndex: 10000000000000,
          display: selected ? "block" : "none",
          padding: "40px",
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
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <FontAwesome name="remove" color="white" size={22} />
        </div>
        {openModal()}
      </div>
      <Tabs style={{ zIndex: -1 }}>
        <TabList>
          <Tab>Branches</Tab>
          <Tab>Add Branch</Tab>
        </TabList>

        <TabPanel>
          <MUIDataTable
            title={"Branches List"}
            data={branches}
            columns={columns}
            options={options}
          />
        </TabPanel>
        <TabPanel>
          <CreateBranch />
        </TabPanel>
      </Tabs>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { branches: state.branches };
};

export default connect(mapStateToProps, {
  getBranches: getBranches,
  deleteBranch: deleteBranch,
})(Branches);
