<script setup>
import { actionDetailData } from '@/common/utils/constant'

const props = defineProps({
  currentIndex: Number,
})
</script>
<template>
  <div class="action-detail" v-if="actionDetailData[currentIndex]">
    <img
      alt=""
      class="close_icon"
      src="@/assets/images/close_icon.png"
      @click="$emit('closePop')"
    />
    <div class="title">{{ actionDetailData[currentIndex]?.title }}</div>
    <div class="section">
      <div
        class="section-item"
        :key="index"
        v-for="(item, index) in actionDetailData[currentIndex].actions"
      >
        <div class="name">{{ index + 1 + `. ` + item.name }}</div>
        <div class="html" v-html="item.html"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.action-detail {
  position: absolute;
  right: vw(24);
  top: 18vh;
  color: #fff;
  width: vw(372);
  max-height: 72vh;
  min-height: 38vh;
  overflow: hidden;
  padding: vw(24) vh(12);
  background: url('@/assets/images/pop_bg.png') no-repeat;
  background-size: 100% 100%;

  .close_icon {
    position: absolute;
    top: vh(8);
    right: vw(12);
    width: vw(28);
    height: vh(28);
    cursor: pointer;
  }

  .title {
    width: 100%;
    font-size: vw(24);
    font-weight: bold;
    text-align: center;
  }

  .section {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 68vh;

    &::-webkit-scrollbar {
      width: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #00b2df;
    }

    .name {
      width: 100%;
      font-size: vw(22);
      margin: vw(24) 0 vh(12);
      padding: 0 vw(12) vh(8) vw(16);
      background: url('@/assets/images/item_bg.png') no-repeat;
      background-size: 100% 100%;
    }

    .html {
      font-size: vw(20);
      line-height: vh(32);
      padding-left: vw(16);
      letter-spacing: vw(1);
    }
  }
}
</style>
