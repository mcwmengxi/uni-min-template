import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from '@/store'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfoData = ref({
      name: 'nangong',
    })

    function setUserInfoData(data: { name: string }) {
      userInfoData.value = data
    }
    return {
      userInfoData,
      setUserInfoData,
    }
  },
  {
    persist: {
      paths: ['userInfo'],
    },
  },
)

export function useUserStoreHook() {
  return useUserStore(store)
}
