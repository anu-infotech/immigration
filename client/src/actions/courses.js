import server from "../api/server";
import { toast } from "react-toastify";

export const COURSES = "COURSES";

export const getCourses = () => {
  return async (dispatch) => {
    try {
      const res = await server.get("/api/courses");
      dispatch({
        type: COURSES,
        payload: res.data,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};


export const createCourse = (formValues) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/course/create", formValues);
      const courses = getState().courses;
      const latest = [...courses, res.data];
      dispatch({
        type: COURSES,
        payload: latest,
      });
      toast.success("Course added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const editCourse = (formValues, id) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.post("/api/course/edit", formValues, {
        params: {
          id,
        },
      });
      const courses = getState().courses;
      const index = courses.findIndex((uni) => uni._id == id);
      courses[index] = res.data;
      const latest = courses;
      dispatch({
        type: COURSES,
        payload: latest,
      });
      toast.success("Course edit successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
};

export const deleteCourse = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await server.get("/api/course/delete", {
        params: {
          id,
        },
      });
      const courses = getState().courses;
      const latest = courses.filter((course) => id !== course._id);
      dispatch({
        type: COURSES,
        payload: latest,
      });
      return toast.success("Course deleted successfully");
    } catch (error) {
      if(error) {
        toast.error("Something went wrong");

      }
    }
  };
};
