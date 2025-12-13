import { UNIVERSITY } from '../actions/university'

export default (state = null, action) => {
  switch (action.type) {
    case UNIVERSITY:
      return action.payload
    default:
      return state
  }
}
