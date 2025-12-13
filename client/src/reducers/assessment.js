import { NEW_ASSESSMENTS } from '../actions/assessment'

export default (state = null, action) => {
  switch (action.type) {
    case NEW_ASSESSMENTS:
      return action.payload
    default:
      return state
  }
}
