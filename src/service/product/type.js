import axios from '../axios'

export const useProductType = {
  CREATE: (data) => axios.post('/category', data),
  GET: (num = 1) => {
    console.log(
      axios.get(`/category?page=${num}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    )
    axios.get(`/category?page=${num}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }
}
