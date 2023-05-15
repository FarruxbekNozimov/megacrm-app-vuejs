import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useProductType } from '../../service/product/type.js'
import { toast } from 'vue3-toastify'

export const productTypeStore = defineStore('productType', () => {
  const state = reactive({
    list: [],
    loading: true,
    errorMessage: ''
  })

  const GETLIST = async () => {
    try {
      state.list = (await useProductType.GET()).data
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
