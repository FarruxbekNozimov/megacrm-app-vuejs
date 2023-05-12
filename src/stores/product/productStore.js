import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const productStore = defineStore('product', () => {
  const state = reactive({
    list: [],
    loading: true,
    errorMessage: ''
  })

  const GETLIST = async (list) => {
    state.list = list
  }
  GETLIST()

  const LIST = computed(() => state.list)

  return { LIST, GETLIST }
})
