import { COURSES } from "../actions/courses";
export default (state = null, action) => {
  switch (action.type) {
    case COURSES:
      return action.payload;
    default:
      return state;
  }
};
