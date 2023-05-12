import axios from '../axios.js'

export const useUser = {
  GET: async () => await axios.post('auth/getuser', { token: localStorage.getItem('token') })
}
