import axios from '../axios'

export const useProduct = {
  CREATE: (data) => axios.post('/product', data),
  GET: (num = 1) => axios.get(`/product?page=${num}`)
}
