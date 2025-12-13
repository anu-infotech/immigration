import React from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Button, Label, Input, FormGroup } from "reactstrap";
import Widget from "../../components/Widget";
import { loginUser } from "../../actions/user";
import signinImg from "../../images/signinImg.svg";
import Select from "react-select";
import "./style.css";
import { FontAwesome } from "react-web-vector-icons";
import { getBranchesListForSelect } from "../../actions/branches";
class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    if (token) return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      email: "admin@flatlogic.com",
      password: "password",
      branch: { value: "gurdaspur", label: "Gurdaspur" },
      animation: true,
      showPassword: false,
    };

    this.doLogin = this.doLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  async doLogin(e) {
    e.preventDefault();
    localStorage.setItem("branch", this.state.branch.value);
    await this.props.dispatch(
      loginUser({ email: this.state.email, password: this.state.password })
    );
    localStorage.setItem("branch", this.state.branch.value);
  }

  googleLogin() {
    this.props.dispatch(loginUser({ social: "google" }));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({ social: "microsoft" }));
  }

  signUp() {
    this.props.history.push("/register");
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({ animation: false });
    }, 2000);

    const list = await getBranchesListForSelect();
    this.setState({
      branchOptions: list,
      branch: list?.[0] || null,    // default first branch
    });

  }


  render() {
    if (this.state.animation) {
      return (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#f6f6f6",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className='logo-animation'
            src={require("../../images/new.png")}
            style={{ height: "200px", width: "200px" }}
          />
        </div>
      );
    }

    const { from } = this.props.location.state || {
      from: { pathname: "/app" },
    }; // eslint-disable-line

    // cant access login page while logged in
    if (
      Login.isAuthenticated(JSON.parse(localStorage.getItem("authenticated")))
    ) {
      return <Redirect to={from} />;
    }

    return (
      <React.Fragment>
        <div className='auth-page'>
          <Widget
            className='widget-auth my-auto'
            title={
              <React.Fragment>
                <img
                  src='https://aussiehub.co.in/wp-content/uploads/2020/10/Aussie-Hub-Logo-1.jpg'
                  alt=''
                  style={{
                    width: "90%",
                    position: "relative",
                    left: "43%",
                    transform: "translateX(-50%)",
                    padding: "30px",
                  }}
                />
                <h3 className='mt-0 mb-2' style={{ fontSize: 40 }}>
                  Login
                </h3>
              </React.Fragment>
            }
          >
            <p className='widget-auth-info'>
              Welcome Back! Please login to your account
            </p>
            <form className='mt' onSubmit={this.doLogin}>
              {this.props.errorMessage && (
                <Alert className='alert-sm' color='danger'>
                  {this.props.errorMessage}
                </Alert>
              )}
              <div className='form-group'>
                <Label for='search-input1'>Email</Label>
                <input
                  className='form-control'
                  defaultValue={""}
                  onChange={this.changeEmail}
                  required
                  name='email'
                  placeholder='Enter your username'
                />
              </div>
              <div className='form-group mb-2'>
                <Label for='search-input1'>Password</Label>
                <input
                  className='form-control'
                  defaultValue={""}
                  onChange={this.changePassword}
                  type={this.state.showPassword ? "text" : "password"}
                  required
                  style={{ position: "relative" }}
                  name='password'
                  placeholder='Enter your password'
                />
                <div
                  onClick={() =>
                    this.setState({
                      showPassword:
                        this.state.showPassword === true ? false : true,
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesome
                    name='eye'
                    size={15}
                    color='#000'
                    style={{
                      position: "absolute",
                      right: "50px",
                      transform: "translateY(-30px)",
                    }}
                  />
                </div>
              </div>

              <div className='form-group mb-2'>
                <Label for='search-input1'>Branch</Label>
                <Select
                  name='location'
                  onChange={(value) => this.setState({ branch: value })}
                  defaultValue={{ value: "gurdaspur", label: "Gurdaspur" }}
                  required={true}
                  options={this.state.branchOptions}
                />
              </div>
              <FormGroup className='checkbox abc-checkbox mb-4 d-flex' check>
                <>
                  <Input
                    id='checkbox1'
                    type='checkbox'
                    style={{ marginLeft: 3 }}
                  />
                  <Label for='checkbox1' check>
                    Remember me
                  </Label>
                </>
              </FormGroup>
              <Button
                type='submit'
                color='warning'
                className='auth-btn mb-3'
                size='sm'
              >
                {this.props.isFetching ? "Loading..." : "Login"}
              </Button>
              <p className='widget-auth-info text-center'>Or</p>
              <div className={"d-flex align-items-center"}>
                Don’t have an account?{" "}
                <Link to='register' className={"ml-1"}>
                  Sign Up here
                </Link>
              </div>
            </form>
          </Widget>
          <img src={signinImg} alt='signin' className={"backImg"} />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
