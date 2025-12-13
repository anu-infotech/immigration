import { ADMINS, UPDATE_USER_STATUS, ADMIN } from '../actions/users'

export default (state = null, action) => {
  switch (action.type) {
    case ADMINS:
      return action.payload
    case UPDATE_USER_STATUS:
      return action.payload
    case ADMIN:
      return action.payload
    default:
      return state
  }
}
