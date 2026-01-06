import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { PacmanLoader } from "react-spinners";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button, Label, Row } from "reactstrap";
import { deleteCourse, getCourses } from "../../actions/courses";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import CreateCourse from "./CreateCourse";
import EditCourse from "./EditCourse";
import "./style.css";
import ViewCourse from "./View";
const Course = ({ courses, getCourses, deleteCourse }) => {
  const updateCourses = async () => {
    await getCourses();
  };

  useEffect(() => {
    updateCourses();
  }, []);


  // console.log(courses);

  // return (
  //   <div></div>
  // );

  const [selected, setSelected] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [edit, setEdit] = useState(false);
  const closeModal = () => {
    setSelected(null);
    setSelectedData(null);
    setEdit(false);
  };

  if (!courses) {
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
      name: "university",
      label: "University Name",
      options: {
        customBodyRender: (value) => {
          return value?.label;
        },
      },
    },
    {
      name: "university",
      label: "University Location",
      options: {
        customBodyRender: (value) => {
          return value?.value?.location.label;
        },
      },
    },
    {
      name: "program",
      label: "Program Name",
    },
    {
      name: "duration",
      label: "Course Duration",
      options: {
        customBodyRender: (value) => {
          return `${value} Year(s)`;
        },
      },
    },
    {
      name: "campus",
      label: "Campus Location",
    },
    {
      name: "intake",
      label: "Intakes",
      options: {
        filter: false,
        customBodyRender: (value) => {
          const values = value?.map((value) => {
            return value?.label;
          });
          return values.join(", ");
        },
      },
    },
    {
      name: "applicationFee",
      label: "Application Fee",
      options: {
        display: false,
      },
    },
    {
      name: "courseContentLink",
      label: "Course Content Link",
      options: {
        display: false,
      },
    },
    {
      name: "tuitionFee",
      label: "Tuition Fee",
      options: {
        display: false,
      },
    },
    {
      name: "entryRequirement",
      label: "Entry Requirement",
      options: {
        display: false,
      },
    },
    {
      name: "_id",
      label: "Edit",
      options: {
        display: role == 'admin',
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
      label: "View",
      options: {
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
    }
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
          <EditCourse
            initialValues={courses.find((course) => {
              if (course._id == selected) {
                return course;
              }
            })}
            closeModal={closeModal}
          />
        );
      } else {
        return (
          <ViewCourse
            selected={selected}
            closeModal={closeModal}
            course={courses.find((course) => {
              if (course._id == selected) {
                return course;
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
          <Tab>Courses</Tab>
          <Tab>Add Course</Tab>
        </TabList>

        <TabPanel>
          <MUIDataTable
            title={"Courses List"}
            data={courses}
            columns={columns}
            options={options}
          />
        </TabPanel>
        <TabPanel>
          <CreateCourse />
        </TabPanel>
      </Tabs>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { courses: state.courses };
};

export default connect(mapStateToProps, {
  getCourses: getCourses,
  deleteCourse: deleteCourse,
})(Course);
