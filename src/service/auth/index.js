import axios from '../axios.js'

export const useAuth = {
  LOGIN: async (data) => await axios.post('auth/login', { ...data })
}
