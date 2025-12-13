import server from "../api/server";
import { toast } from "react-toastify";

export const BRANCHES = "BRANCHES";

export const getBranches = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/branches");
      dispatch({
        type: BRANCHES,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const getBranchesList = async () => {
  try {
    const res = await server.get("/api/branches");
    return res.data;   // return the data directly
  } catch (error) {
    console.error("Error fetching branches:", error);
    return null; // or return [] based on your use-case
  }
};

export const getBranchesListForSelect = async () => {
  try {
    const res = await server.get("/api/branches");
    return res.data.map((b) => ({
      value: b.slug || b.value,
      label: b.name,
    }));
  } catch (error) {
    console.error("Error fetching branches:", error);
    return [];
  }
};


export const createBranch = (formValues) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/branches/create", formValues);
      const branches = getState().branches;
      const latest = [...branches, res.data];
      dispatch({
        type: BRANCHES,
        payload: latest,
      });
      toast.success("Branch added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const editBranch = (formValues, id) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/branches/edit", formValues, {
        params: {
          id,
        },
      });
      const branches = getState().branches;
      const index = branches.findIndex((uni) => uni._id == id);
      branches[index] = res.data;
      const latest = branches;
      dispatch({
        type: BRANCHES,
        payload: latest,
      });
      toast.success("Branch edit successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const deleteBranch = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.get("/api/branches/delete", {
        params: {
          id,
        },
      });
      const branches = getState().branches;
      const latest = branches.filter((branch) => id !== branch._id);
      dispatch({
        type: BRANCHES,
        payload: latest,
      });
      return toast.success("Branch deleted successfully");
    } catch (error) {
      if(error) {
        toast.error("Something went wrong");

      }
    }
  };
};
