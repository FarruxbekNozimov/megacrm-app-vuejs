import axios from '../axios'

export const useEmployee = {
  CREATE: (data) => axios.post('/staff', data),
  GET: (num = 1) => axios.get(`/staff?page=${num}`)
}
