import server from "../api/server";
import { toast } from "react-toastify";

export const SEARCH = "SEARCH";

export const getResultsByMobile = (mobile) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/search/mobile", {
        params: {
          mobile,
        },
      });
      dispatch({
        type: SEARCH,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const getResultsByOfficialMobile = (mobile) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/search/mobile/official", {
        params: {
          mobile,
        },
      });
      dispatch({
        type: SEARCH,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const getResultsByOfficialEmail = (email) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/search/email/official", {
        params: {
          email,
        },
      });
      dispatch({
        type: SEARCH,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const getResultsByName = (name) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/search/name", {
        params: {
          name,
        },
      });
      dispatch({
        type: SEARCH,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const getResultsByDOB = (dob) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/search/dob", {
        params: {
          dob,
        },
      });
      dispatch({
        type: SEARCH,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};
