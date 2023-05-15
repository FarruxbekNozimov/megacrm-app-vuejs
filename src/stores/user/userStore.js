import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUser } from '../../service/user'
import { useRouter } from 'vue-router'
const router = useRouter()

export const userStore = defineStore('user', () => {
  const state = reactive({
    user: {}
  })

  const SET_USER = async () => {
    try {
      state.user = (await useUser.GET()).data
    } catch (error) {
      localStorage.clear()
      router.push('/login')
    }
  }

  const USER = computed(() => state.user)

  return { SET_USER, USER }
})
