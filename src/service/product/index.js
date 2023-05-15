import axios from '../axios'

export const useProduct = {
  CREATE: async (data) => {
    await axios.post('/products', data)
  },
  GET: async (num = 1) => await axios.get(`/products?page=${num}`)
}
