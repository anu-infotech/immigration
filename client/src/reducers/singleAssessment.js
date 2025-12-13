import { SINGLE_ASSESSMENT } from '../actions/assessment'

export default (state = null, action) => {
  switch (action.type) {
    case SINGLE_ASSESSMENT:
      return action.payload
    default:
      return state
  }
}
