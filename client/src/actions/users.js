import server from "../api/server";
import { toast } from "react-toastify";

export const UPDATE_USER_STATUS = "UPDATE_USER_STATUS";
export const ADMINS = "ADMINS";
export const ADMIN = "ADMIN";

export const getAdmins = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/admins/list");
      dispatch({
        type: ADMINS,
        payload: res.data,
      });

      return res.data;
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const updateAdminStatus = (email, status) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/assessment/updateAdminStatus", {
        params: { status, email },
      });
      dispatch({
        type: ADMINS,
        payload: res.data,
      });
      toast.success(`User Status updates successfully`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const updateRole = (email, type) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/update/role", {
        params: { type, email },
      });
      dispatch({
        type: ADMINS,
        payload: res.data,
      });
      toast.success(`User Role updates successfully`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const softDeleteAdmin = (email) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/admins/softdelete", {
        params: {email},
      });
      dispatch({
        type: ADMINS,
        payload: res.data,
      });
      toast.success(`User Deleted successfully`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};





export const updatePassword = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await server.post("api/update/password", {
        email,
        password,
      });
      console.log(res);
      toast.success("Password updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
};


export const getAdmin = (email) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/getAdmin", {
        params: { email: email },
      });
      dispatch({
        type: ADMIN,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};
