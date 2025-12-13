import { RECIEPT, ADD_RECEIPT } from "../actions/reciepts";

export default (state = [], action) => {
  switch (action.type) {
    case RECIEPT:
      return action.payload;

    case ADD_RECEIPT:
      return [...state, action.payload];
    default:
      return state;
  }
};
