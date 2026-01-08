import server from '../api/server'
import { toast } from 'react-toastify'

export const GET_STATS = 'GET_STATS'

export function getStats() {
  return async (dispatch) => {
    const branch = localStorage.getItem('branch');
    const user = JSON.parse(localStorage.getItem("user"));
    const type = user.type;
    try {
      const res = await server.get('/api/getStats', {
        params: {
          branch,type
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
