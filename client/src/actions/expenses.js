import server from "../api/server";
import { toast } from "react-toastify";

export const EXPENSE = "EXPENSE";
export const ADD_EXPENSE = "ADD_EXPENSE";

export const getExpenses = (assessmentId) => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/expenses/student", {
        params: { assessmentId },
      });
      dispatch({
        type: EXPENSE,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

// Get all the reciepts from the database

export const getAllExpenses = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/expenses");
      dispatch({
        type: EXPENSE,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const createExpense = (formValues) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/expense/add", formValues);

      dispatch({
        type: ADD_EXPENSE,
        payload: res.data,
      });
      toast.success("Expense added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};
