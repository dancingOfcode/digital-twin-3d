<script setup>
import { ref, watch } from 'vue'
import { actionTextData } from '@/common/utils/constant'
const emit = defineEmits(['change'])
const props = defineProps({
  tabName: String,
})
const currentIndex = ref(0)
const currentTab = ref(props.tabName)

// 监听tab切换
watch(
  () => props.tabName,
  newValue => {
    currentIndex.value = 0
    currentTab.value = newValue
    emit('change', 0)
  },
)

// 动作切换
const itemClick = index => {
  let initValue = currentTab.value === 'detailActions' ? 0 : 14
  currentIndex.value = index
  emit('change', initValue + index)
}
</script>
<template>
  <div class="detail-actions-wrap">
    <img alt="" class="close_icon" src="@/assets/images/close_icon.png" @click="$emit('closePop')" />
    <div class="detail-actions">
      <div v-for="(item, index) in actionTextData[currentTab]" :key="index"
        :class="['item', { 'active-item': currentIndex === index + 1 }]" @click="itemClick(index + 1)">
        <i> {{ (currentTab === 'detailActions' ? '1.' : '2.') + (index + 1) }}</i>
        <span class="text">{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.detail-actions-wrap {
  position: absolute;
  top: 18vh;
  left: 78px;
  width: 372px;
  overflow: hidden;
  max-height: 72vh;
  min-height: 38vh;
  padding: 42px 12px 12px;
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

.detail-actions {
  color: #fff;
  overflow-y: auto;
  max-height: 68vh;
}

.detail-actions::-webkit-scrollbar {
  width: 0;
}

.item {
  cursor: pointer;
  font-size: 24px;
  padding: 8px 12px;
  margin-bottom: 5px;
  box-sizing: border-box;
}

.text {
  margin-left: 12px;
}

.item:hover {
  border-radius: 5px;
  background: #327672;
  border: 1px solid #00fcee;
}

.active-item {
  border-radius: 5px;
  background: #327672;
  border: 1px solid #00fcee;
}
</style>
