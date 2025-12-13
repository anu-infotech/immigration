import server from '../api/server'
import { toast } from 'react-toastify'

export const GET_STATS = 'GET_STATS'

export function getStats() {
  return async (dispatch) => {
    const branch = localStorage.getItem('branch')
    try {
      const res = await server.get('/api/getStats', {
        params: {
          branch,
        },
      })
      dispatch({
        type: GET_STATS,
        payload: res.data,
      })
      toast.success('Stats fetched successfully')
    } catch (error) {
      toast.error('Something went wrong. Please reload the page')
    }
  }
}
