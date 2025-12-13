import server from "../api/server";
import { toast } from "react-toastify";

export const UNIVERSITY = "UNIVERSITY";

export const getUniversities = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/universities");
      dispatch({
        type: UNIVERSITY,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const createUniversity = (formValues) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/university/create", formValues);
      const universities = getState().university;
      const latest = [...universities, res.data];

      dispatch({
        type: UNIVERSITY,
        payload: latest,
      });
      toast.success("University added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const editUniversity = (formValues, id) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/university/edit", formValues, {
        params: {
          id,
        },
      });
      const universities = getState().university;
      const index = universities.findIndex((uni) => uni._id == id);
      universities[index] = res.data;
      const latest = universities;
      dispatch({
        type: UNIVERSITY,
        payload: latest,
      });
      toast.success("University edit successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const deleteUniversity = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.get("/api/university/delete", {
        params: {
          id,
        },
      });
      const universities = getState().university;
      const latest = universities.filter((uni) => id !== uni._id);
      dispatch({
        type: UNIVERSITY,
        payload: latest,
      });
      toast.success("University deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};
