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
      <div
        class="screen-btn"
        :class="isFullScreen ? 'exit-icon' : 'full-icon'"
        @click="toggleFullScreen"
      ></div>
      <span>{{ isFullScreen ? '退出全屏' : '全屏' }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.screen-header {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  z-index: 99;
  width: 100%;
  height: vh(100);
  color: #fff;
  line-height: vh(100);
  align-items: center;
  justify-content: center;
  background: url('@/assets//images/header_bg.png') no-repeat;
  background-size: 100% 100%;

  .title {
    font-size: vw(30);
    position: relative;
    top: vh(-10);
  }

  .date {
    position: absolute;
    right: vw(24);
    top: vh(-6);

    .time-hms {
      margin: 0 vw(16);
      font-size: vw(24);
    }
  }

  .screen-wrap {
    display: flex;
    justify-self: center;
    align-items: center;
    position: absolute;
    top: vh(16);
    left: vw(12);
    z-index: 999;
    cursor: pointer;
    height: vh(32);

    .screen-btn {
      width: vw(30);
      height: vh(24);
    }

    .full-icon {
      background: url('@/assets/images/fullScreen.png') no-repeat;
      background-size: 100% 100%;
    }

    .exit-icon {
      background: url('@/assets/images/exitFullScreen.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
