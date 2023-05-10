import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const contactStore = defineStore('contact', () => {
  const state = reactive({
    realList: [],
    list: [],
    loading: true,
    errorMessage: ''
  })

  const SEARCH = (search) => {
    if (search.trim().length) {
      state.list = state.list.filter((i) =>
        Object.values(i).join('').toLowerCase().includes(search)
      )
    } else {
      GETLIST()
    }
  }

  const GETLIST = () => {
    state.list = state.realList
  }
  GETLIST()

  const ADD = (data) => {
    state.realList.push(data)
    state.list = state.realList
  }

  const LIST = computed(() => state.list)

  return { ADD, LIST, SEARCH, GETLIST }
})
