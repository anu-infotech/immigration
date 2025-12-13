import { ALL_ASSESSMENTS } from '../actions/assessment'

export default (state = null, action) => {
  switch (action.type) {
    case ALL_ASSESSMENTS:
      return action.payload
    default:
      return state
  }
}
