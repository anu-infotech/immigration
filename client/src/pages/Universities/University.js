import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button } from "reactstrap";
import { deleteUniversity, getUniversities } from "../../actions/university";
import CreateUniversity from "./CreateUniversity";
import EditUniversity from "./EditUniversity";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
const University = ({ universities, getUniversities, deleteUniversity }) => {
  useEffect(() => {
    getUniversities();
  }, []);

  const [selected, setSelected] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const closeModal = () => {
    setSelected(null);
    setSelectedData(null);
  };

  if (!universities) {
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
  let user = JSON.parse(localStorage.getItem("user"));
  let role = user?.type;
  const columns = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "country",
      label: "Location",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "tieUp",
      label: "Tie Up",
      options: {
        customBodyRender: (value) => {
          return value.label;
        },
      },
    },
    {
      name: "_id",
      label: "Edit",
      options: {
        display: role == 'admin',
        customBodyRender: (value) => {
          const university = universities.find((uni) => {
            if (uni._id == value) {
              return uni;
            }
          });
          return (
            <Button
              color="warning"
              onClick={() => {
                setSelected(value);
                setSelectedData(university);
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
      label: "Delete",
      options: {
        display: role == 'admin',
        customBodyRender: (value) => {
          return (
            <Button
              color="danger"
              onClick={() => {
                deleteUniversity(value);
              }}
            >
              Remove
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          backgroundColor: "rgba(41, 22, 111, 0.4)",
          zIndex: 10000000000000,
          display: selected ? "block" : "none",
          padding: "120px",
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

        {selected ? (
          <EditUniversity
            selected={selected}
            initialValues={selectedData}
            closeModal={closeModal}
          />
        ) : null}
      </div>
      <Tabs style={{ zIndex: -1 }}>
        <TabList>
          <Tab>Universities</Tab>
          { role == 'admin' && (
            <Tab>Add University</Tab>
          )}
          
        </TabList>

        <TabPanel>
          <MUIDataTable
            title={"Universities List"}
            data={universities.sort((a, b) => (a.name > b.name ? 1 : -1))}
            columns={columns}
            options={options}
          />
        </TabPanel>
        <TabPanel>
          <CreateUniversity />
        </TabPanel>
      </Tabs>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { universities: state.university };
};

export default connect(mapStateToProps, {
  getUniversities: getUniversities,
  deleteUniversity: deleteUniversity,
})(University);
