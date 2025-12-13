import { SEARCH } from "../actions/search";

export default (state = null, action) => {
  switch (action.type) {
    case SEARCH:
      return action.payload;
    default:
      return state;
  }
};
