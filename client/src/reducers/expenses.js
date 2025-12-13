import { EXPENSE, ADD_EXPENSE } from "../actions/expenses";

export default (state = [], action) => {
  switch (action.type) {
    case EXPENSE:
      return action.payload;

    case ADD_EXPENSE:
      return [...state, action.payload];
    default:
      return state;
  }
};
