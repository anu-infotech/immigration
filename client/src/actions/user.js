import server from "../api/server";
import { USER } from "./assessment";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("authenticated");
    dispatch(receiveLogout());
  };
}



export function loginUser(creds) {
  return async (dispatch) => {
    if (creds.email.length > 0 && creds.password.length > 0) {
      try {
        const res = await server.post("/api/admin/login", {
          email: creds.email,
          password: creds.password,
        });
        console.log(res.data);
        localStorage.setItem("authenticated", true);
        localStorage.setItem("email", JSON.stringify(creds.email));
        localStorage.setItem("user", JSON.stringify(res.data.admin));
        dispatch(receiveLogin());
        window.location.reload();
      } catch (error) {
        dispatch(
          loginError(
            error.response
              ? error.response.data
              : "Something was wrong. Try again"
          )
        );
      }
    } else {
      dispatch(loginError("Something was wrong. Try again"));
    }
  };
}
