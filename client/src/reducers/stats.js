import { GET_STATS } from '../actions/dashboard'

export default (
  state = {
    active: 0,
    rejected: 0,
    unattended: 0,
    admins: 0,
  },
  action
) => {
  switch (action.type) {
    case GET_STATS:
      return action.payload
    default:
      return state
  }
}
