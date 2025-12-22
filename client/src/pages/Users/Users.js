import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PacmanLoader from "react-spinners/PacmanLoader";
import MUIDataTable from "mui-datatables";
import { updateAdminStatus, getAdmins, updateRole, softDeleteAdmin } from "../../actions/users";
import Switch from "react-input-switch";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Button } from "reactstrap";
class Users extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.role = user.type;
    this.email = user.email;
    this.is_super_admin = user.is_super_admin;
    this.adminid = user.id;
    console.log(this.is_super_admin)
  }

  componentDidMount() {
    this.props.getAdmins();
  }

  render() {
    if (!this.props.admins) {
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
    } else {
      const columns = [
        {
          name: "email",
          label: "Email",
          options: {
            filter: true,
            sort: true,
            customBodyRender: (value) => {
              return <Link to={`/app/cases/${value}`}>{value}</Link>;
            },
          },
        },
        {
          name: "name",
          label: "Name",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "mobile",
          label: "Mobile",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "status",
          label: "Status",
          options: {
            customBodyRender: (value, tableMeta, updateValue) => {
              if (this.role === "admin") {
                return (
                  <div>
                    <Switch
                      value={value === true ? 1 : 0}
                      onChange={(value) =>
                        this.props.updateAdminStatus(
                          tableMeta.rowData[0],
                          value === 0 ? false : true
                        )
                      }
                    />
                  </div>
                );
              }
            },
          },
        },
        {
          name: "email",
          label: "Role",
          options: {
            customBodyRender: (value, tableMeta) => {
              // console.log(tableMeta);
              return (
                <div>
                  <Select
                    onChange={async (type) => {
                      await this.props.updateRole(value, type.value);
                    }}
                    onBlur={(event) => event.preventDefault()}
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "manager", label: "Manager" },
                      { value: "user", label: "User" },
                      { value: "reception", label: "Reception" },
                      { value: "Admission", label: "Admission" },
                    ]}
                    className="select"
                  />
                  <br></br>
                  Role:{" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {tableMeta.rowData[5]}
                  </span>
                </div>
              );
            },
          },
        },
        {
          name: "type",
          label: "Role",
          options: {
            display: false,
          },
        },
        {
          name: "email",
          label: "Report",
          options: {
            customBodyRender: (value,tableMeta) => {
              return (
                <>
                  <div class="d-block">
                    <Link to={`/app/report/view/${value}`}>
                      <Button color="primary" size="sm" style={{ marginBottom: "5px" }}>
                        Report
                      </Button>
                    </Link><br />
                    <Link to={`/app/user/reset-password/${value}`}>
                      <Button color="success" size="sm">
                        Reset Password
                      </Button>
                    </Link>

                    <Button
                      className={ (this.email === 'superadmin@aussiehub.co.in') ? '':'d-none' }
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
                            this.setState({ running: true });
                            await this.props.softDeleteAdmin(value);
                            this.setState({ running: false });
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


                  </div>
                </>
              );
            }
          },
        },
      ];

      const columns1 = [
        {
          name: "email",
          label: "Email",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "name",
          label: "Name",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "mobile",
          label: "Mobile",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "type",
          label: "Role",
        },
        {
          name: "email",
          label: "Report",
          options: {
            customBodyRender: (value) => {
              return <Link to={`/app/report/view/${value}`}>Report</Link>;
            },
          },
        },
      ];

      const options = {
        selectableRows: false,
      };

      return (
        <div>
          <MUIDataTable
            title={"Admins"}
            data={
              this.role === "admin"
                ? this.props.admins
                : this.props.admins.filter((admin) => admin.email == this.email)
            }
            columns={this.role !== "admin" ? columns1 : columns}
            options={options}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { admins: state.admins };
};
const decoratedComponent = withRouter(
  connect(mapStateToProps, {
    getAdmins,
    updateRole,
    updateAdminStatus: updateAdminStatus,
    softDeleteAdmin,
  })(Users)
);

export default decoratedComponent;
