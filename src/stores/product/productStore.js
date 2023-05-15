import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useProduct } from '../../service/product/index.js'
import { toast } from 'vue3-toastify'

export const productStore = defineStore('product', () => {
  const state = reactive({
    list: [],
    loading: true,
    errorMessage: ''
  })

  const GETLIST = async () => {
    console.log(await useProduct.GET())
    try {
      state.list = (await useProduct.GET()).data
    } catch (err) {
      toast.error(`Error ${err}`, {
        autoClose: 1000,
        theme: 'light'
      })
    }
  }
  GETLIST()

  const LIST = computed(() => state.list)

  return { LIST, GETLIST }
})
