import server from "../api/server";
import { toast } from "react-toastify";

export const RECIEPT = "RECIEPT";
export const ADD_RECEIPT = "ADD_RECEIPT";

export const getReciepts = (assessmentId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/receipts/student", {
        params: { assessmentId },
      });
      dispatch({
        type: RECIEPT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

// Get all the reciepts from the database

export const getAllReciepts = () => {
  return async (dispatch) => {
    const branch = localStorage.getItem('branch');
    const user = JSON.parse(localStorage.getItem("user"));
    const type = user.type;
    try {
      const res = await server.get("/api/receipts", {
        params: {
          branch,type
        },
      });
      dispatch({
        type: RECIEPT,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const createReciepts = (formValues) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/reciept/add", formValues);

      dispatch({
        type: ADD_RECEIPT,
        payload: res.data,
      });
      toast.success("University added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};
