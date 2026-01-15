<script setup lang="ts">
import { onMounted } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import AppLogos from '@/components/AppLogos.vue'
import InputEntry from '@/components/InputEntry.vue'
import { userApi } from '@/api'

onMounted(async () => {
  try {
    const userInfo = await userApi.getUserInfo()
    console.log('用户信息:', userInfo)
  }
  catch (error) {
    console.error('获取用户信息失败:', error)
  }
})
</script>

<template>
  <view class="root-container">
    <AppLogos />
    <InputEntry />
    <AppFooter />
  </view>
</template>

<style scoped>
.root-container {
  padding: 5rem 2.5rem;
  text-align: center;
}
</style>
