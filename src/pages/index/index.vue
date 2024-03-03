<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>
      <uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const title = ref('Hello')
  const value = ref(1)
  const range = ref([
    { value: 0, text: '篮球' },
    { value: 1, text: '足球' },
    { value: 2, text: '游泳' },
  ])
  const change = (e: any) => {
    console.log(e)
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
