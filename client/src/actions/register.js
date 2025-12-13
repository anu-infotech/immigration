import { toast } from 'react-toastify'
import server from '../api/server'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
  }
}

export function registerError(payload) {
  return {
    type: REGISTER_FAILURE,
    payload,
  }
}

export function registerUser(payload) {
  return async (dispatch) => {
    if (payload.creds.email.length > 0 && payload.creds.password.length > 0) {
      try {
        const res = await server.post('/api/admin/register', {
          email: payload.creds.email,
          password: payload.creds.password,
          name: payload.creds.name,
          mobile: payload.creds.mobile,
        })
        toast.success("You've been registered successfully")
        payload.history.push('/login')
      } catch (error) {
        console.log(error.response)
        dispatch(
          registerError(
            error.response ? error.response.data : 'Something went wrong'
          )
        )
      }
    } else {
      dispatch(registerError('Something was wrong. Try again'))
    }
  }
}
