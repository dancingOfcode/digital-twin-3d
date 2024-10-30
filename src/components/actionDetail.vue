<script setup>
import { ref } from 'vue'
const actionDetail = {
  1: {
    title: 'MES排程',
    actions: [
      {
        name: '排程同步',
        html: `<div>
                <div>信息流向：MES排程->LES排程</div>
                <div>同步数据：MES排程信息</div>
              </div>`,
      },
      {
        name: '系统计算物料需求',
        html: `LES根据MES排程、SAP工单、SAP工单BOM、LES工艺主数据以及WMS库存信息计算物料需求`,
      },
      {
        name: '数据看板',
        html: `数据大屏实时展示产线的物料需求`,
      },
    ],
  },
  2: {
    title: '安灯触发需求',
    actions: [
      {
        name: 'LES手动安灯触发叫料需求',
        html: `<div>
                <div>1. 产线工人PDA扫描物料编码输入所需数量，选择产线工位，发送物料需求，或使用呼叫器（提前维护好物料、工位和呼叫器按钮映射关系）按下呼叫按钮，LES接收到产线物料需求</div>
                <div>2. 工人使用PDA扫描物料输入数量，选择工位，发送物料需求</div>
                <div>3. 工人按下呼叫器按钮（提前维护物料、工位和呼叫器映射关系）</div>
                <div>4. LES接收到物料需求</div>
              </div>`,
      },
      {
        name: 'LES处理叫料需求',
        html: `LES将产线多个叫料需求数据合并后将总需求发送给WMS（LES->WMS）`,
      },
    ],
  },
  3: {
    title: '人工下架',
    actions: [
      {
        name: '需求生成',
        html: `LES获取产线需求后生成备料需求`,
      },
      {
        name: '需求同步',
        html: `LES将备料需求生成单据发给WMS（LES->WMS）`,
      },
      {
        name: 'WMS系统处理',
        html: `WMS接收到LES物料需求后生成需求单`,
      },
      {
        name: 'WMS系统执行下架',
        html: `人工依据出库单进行拣选下架只发料区`,
      },
    ],
  },
  4: {
    title: '自动化立库下架',
    actions: [
      {
        name: '需求生成',
        html: `LES获取产线需求后生成备料需求`,
      },
      {
        name: '需求同步',
        html: `LES将备料需求生成单据发给WMS（LES->WMS）`,
      },
      {
        name: 'WMS系统处理',
        html: `WMS接收到LES物料需求后生成需求单`,
      },
      {
        name: 'WMS系统执行下架',
        html: `WMA按需求单将出库任务下发给堆垛机，堆垛机将物料搬运至下架区`,
      },
    ],
  },
  5: {
    title: '自动化库配送-LES备料超市',
    actions: [
      {
        name: '呼叫AGV',
        html: `立库将物料下架至下架区,开始呼叫AGV`,
      },
      {
        name: 'AGV取料',
        html: `AGV移动至自动化库下架区取物料`,
      },
      {
        name: 'AGV开始配送',
        html: `获取物料后，AGV开始移动至LES备料超市区`,
      },
      {
        name: 'AGV放料',
        html: `AGV到达LES备料超市区后，放下物料，完成配送返回休息区`,
      },
      {
        name: '同步配送结果',
        html: `WMS返回配送结果给LES`,
      },
    ],
  },
  6: {
    title: '备料超市接收物料',
    actions: [
      {
        name: '物料接收需求',
        html: `LES接收WMS配送结果后生成物料接收需求`,
      },
      {
        name: '确认接收',
        html: `人工根据物料接收需求，PDA操作扫描物料编码获取物料信息，确认接收物料`,
      },
      {
        name: 'LES维护库存',
        html: `LES根据人工PDA物料接收信息更新系统物料库存数据`,
      },
      {
        name: '同步物料接收结果',
        html: `LES返回物料接收数据给WMS`,
      },
    ],
  },
}
const props = defineProps({
  currentIndex: Number,
})
</script>
<template>
  <div class="action-detail" v-if="actionDetail[currentIndex]">
    <img
      alt=""
      class="close_icon"
      src="@/assets/images/close_icon.png"
      @click="$emit('closePop')"
    />
    <div class="title">{{ actionDetail[currentIndex]?.title }}</div>
    <div class="section">
      <div
        class="section-item"
        :key="index"
        v-for="(item, index) in actionDetail[currentIndex].actions"
      >
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
  top: 200px;
  color: #fff;
  width: 372px;
  padding: 24px 12px;
  max-height: 580px;
  min-height: 425px;
  overflow: hidden;
  background: url('@/assets/images/pop_bg.png') no-repeat;
  background-size: 100% 100%;
  /* backdrop-filter: blur(10px); */
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
  font-size: 22px;
  margin: 24px 0 12px;
  width: 100%;
  padding: 0 12px 8px 16px;
  box-sizing: border-box;
  background: url('@/assets/images/item_bg.png') no-repeat;
  background-size: 100% 100%;
}

.html {
  /* text-indent: 2em; */
  line-height: 28px;
  padding-left: 16px;
}
.html div {
  margin-bottom: 12px;
}

.section {
  margin-top: 12px;
  font-size: 20px;
  overflow-y: auto;
  max-height: 542px;
}

.section::-webkit-scrollbar {
  width: 3px;
}

.section::-webkit-scrollbar-thumb {
  background: #00b2df;
}
</style>
