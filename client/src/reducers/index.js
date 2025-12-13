import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import alerts from "./alerts";
import register from "./register";
import { reducer } from "redux-form";
import assessment from "./assessment";
import singleAssessment from "./singleAssessment";
import admins from "./admins";
import stats from "./stats";
import university from "./university";
import courses from "./courses";
import branches from "./branches";
import search from "./search";
import user from "./user";
import reciepts from "./reciepts";
import allAssessments from "./allAssessments";
import expenses from "./expenses";

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  form: reducer,
  assessment: assessment,
  singleAssessment: singleAssessment,
  admins: admins,
  stats: stats,
  university: university,
  courses: courses,
  branches: branches,
  searchResults: search,
  user: user,
  reciepts: reciepts,
  expenses: expenses,
  allAssessments: allAssessments,
});
