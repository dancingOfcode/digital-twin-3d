<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useFullScreen } from '@/hooks'
import { weekDay } from '@/common/utils/constant'

const props = defineProps(['title'])
const { isFullScreen, toggleFullScreen } = useFullScreen()

const timeRef = ref(dayjs().format('YYYY-MM-DD'))
const dayWeek = ref(weekDay[dayjs().day()])
const timeRefhms = ref(dayjs().format('HH:mm:ss'))

setInterval(() => {
  timeRefhms.value = dayjs().format('HH:mm:ss')
}, 1000)
</script>
<template>
  <div class="screen-header">
    <div class="title">{{ title }}</div>
    <div class="date">
      <span>{{ timeRef }}</span>
      <span class="time-hms">{{ timeRefhms }}</span>
      <span>{{ dayWeek }}</span>
    </div>
    <div class="screen-wrap">
      <div class="screen-btn" :class="isFullScreen ? 'exit-icon' : 'full-icon'" @click="toggleFullScreen"></div>
      <span>{{ isFullScreen ? '退出全屏' : '全屏' }}</span>
    </div>
  </div>
</template>
<style scoped>
.screen-header {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 100px;
  height: 100px;
  color: #fff;
  line-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets//images/header_bg.png') no-repeat;
  background-size: 100% 100%;
}

.title {
  font-size: 30px;
  position: relative;
  top: -10px;
}

.screen-wrap {
  display: flex;
  justify-self: center;
  align-items: center;
  position: absolute;
  top: 16px;
  left: 12px;
  z-index: 999;
  cursor: pointer;
  height: 32px;
}

.screen-btn {
  width: 30px;
  height: 24px;
}

.full-icon {
  background: url('@/assets/images/fullScreen.png') no-repeat;
  background-size: 100% 100%;
}

.exit-icon {
  background: url('@/assets/images/exitFullScreen.png') no-repeat;
  background-size: 100% 100%;
}

.date {
  position: absolute;
  right: 24px;
  top: -6px;
}

.time-hms {
  margin: 0 16px;
  font-size: 24px;
}
</style>
