import axios from '../axios'

export const useProductType = {
  CREATE: (data) => axios.post('/category', data),
  GET: async (num = 1) => {
    return await axios.get(`/category?page=${num}`)
  }
}
