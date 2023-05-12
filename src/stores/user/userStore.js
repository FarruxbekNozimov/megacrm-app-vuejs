import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUser } from '../../service/user'

export const userStore = defineStore('user', () => {
  const state = reactive({
    user: {}
  })

  const SET_USER = async () => {
    state.user = (await useUser.GET()).data
    console.log(state.user)
  }

  const USER = computed(() => state.user)

  return { SET_USER, USER }
})
