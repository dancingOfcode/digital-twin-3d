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
  <div class="detail-actions">
    <div
      v-for="(item, index) in actionTextData[currentTab]"
      :key="index"
      :class="['item', { 'active-item': currentIndex === index + 1 }]"
      @click="itemClick(index + 1)"
    >
      <i> {{ (currentTab === 'detailActions' ? '1.' : '2.') + (index + 1) }}</i>
      <span class="text">{{ item }}</span>
    </div>
  </div>
</template>
<style>
.detail-actions {
  position: absolute;
  top: 200px;
  left: 78px;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: rgba(5, 24, 38, 0.6);
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
  background: #051826;
  border: 1px solid #00b2df;
}

.active-item {
  border-radius: 5px;
  background: #051826;
  border: 1px solid #00b2df;
}
</style>
