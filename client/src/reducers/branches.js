import { BRANCHES } from "../actions/branches";

export default (state = null, action) => {
  switch (action.type) {
    case BRANCHES:
      return action.payload;
    default:
      return state;
  }
};
