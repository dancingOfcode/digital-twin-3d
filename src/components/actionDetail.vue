<script setup>
import { actionDetailData } from '@/common/utils/constant'

const props = defineProps({
  currentIndex: Number,
})
</script>
<template>
  <div class="action-detail" v-if="actionDetailData[currentIndex]">
    <img alt="" class="close_icon" src="@/assets/images/close_icon.png" @click="$emit('closePop')" />
    <div class="title">{{ actionDetailData[currentIndex]?.title }}</div>
    <div class="section">
      <div class="section-item" :key="index" v-for="(item, index) in actionDetailData[currentIndex].actions">
        <div class="name">{{ index + 1 + `. ` + item.name }}</div>
        <div class="html" v-html="item.html"></div>
      </div>
    </div>
  </div>
</template>
<style>
.action-detail {
  position: absolute;
  right: 24px;
  top: 18vh;
  color: #fff;
  width: 372px;
  padding: 24px 12px;
  max-height: 72vh;
  min-height: 38vh;
  overflow: hidden;
  background: url('@/assets/images/pop_bg.png') no-repeat;
  background-size: 100% 100%;
}

.close_icon {
  position: absolute;
  top: 8px;
  right: 12px;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.title {
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.name {
  width: 100%;
  font-size: 22px;
  margin: 24px 0 12px;
  padding: 0 12px 8px 16px;
  box-sizing: border-box;
  background: url('@/assets/images/item_bg.png') no-repeat;
  background-size: 100% 100%;
}

.html {
  line-height: 28px;
  padding-left: 16px;
}

.html div {
  margin-bottom: 12px;
}

.section {
  font-size: 20px;
  overflow-y: auto;
  max-height: 68vh;
}

.section::-webkit-scrollbar {
  width: 3px;
}

.section::-webkit-scrollbar-thumb {
  background: #00b2df;
}
</style>
