import rightUrl from '@/assets/images/rightArrow.png'
import leftUrl from '@/assets/images/leftArrow.png'

// 天空盒时间类型
export const skyboxType = {
  day: 'day',
  dusk: 'dusk',
  night: 'night',
}

// 日期
export const weekDay = [
  '周日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]

// agv 小车模型颜色
export const agvColorMap = {
  Text060: '#dc143c',
  Box244614: '#fbfff2',
  Box244615: '#708090',
  Shape1134: '#00ced1',
  Line74576: '#708090', // 起落架
  ChamferCyl5233: '#4169e1',
  ChamferCyl5234: '#dc143c',
  ChamferCyl5235: '#4169e1',
  Rectangle193589: '#00ced1',
  Rectangle193592: '#778899',
  Rectangle193596: '#dc143c',
  Rectangle193599: '#778899',
  Rectangle193600: '#708090', // 起落架
  Rectangle193601: '#708090', // 起落架
}

// 3DLabel数据
export const labelData = [
  {
    position: { x: 200, y: 0, z: 200 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="border:1px solid #fff; padding:8px;letter-spacing: 2px;">发料区</div>`,
  },
  {
    position: { x: 55, y: 0, z: 125 },
    rotation: { x: -Math.PI / 2, y: 0, z: -Math.PI / 4 },
    html: `<div style="letter-spacing: 5px;">WMS发料区</div>`,
  },
  {
    position: { x: 300, y: 0, z: -35 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="letter-spacing: 5px;">LES备料超市</div>`,
  },
  {
    position: { x: -135, y: 0, z: 548 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="border:1px solid #fff; padding:8px;letter-spacing: 2px;text-align:center">
            <div style="margin-bottom:5px">仓储存储区</div>
            <div>WMS</div>
          </div>`,
  },
  {
    position: { x: -98, y: 0, z: -145 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="border:1px solid #fff; padding:8px;letter-spacing: 5px;text-align:center">
            <div style="margin-bottom:5px">AGV空载具区</div>
            <div>LES</div>
          </div>`,
  },
  {
    position: { x: 118, y: 0, z: -355 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="border:1px solid #fff; padding:8px;letter-spacing: 2px;">AGV库区</div>`,
  },
  {
    fontSize: '24px',
    position: { x: -105, y: 0, z: -320 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="letter-spacing: 5px;">下架区</div>`,
  },
  {
    fontSize: '24px',
    position: { x: 95, y: 0, z: -520 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="letter-spacing: 5px;">上架区</div>`,
  },
  {
    fontSize: '26px',
    position: { x: -450, y: 0, z: -186 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    html: `<div style="border:1px solid #fff; padding:8px;letter-spacing: 5px;text-align:center">自动化立库</div>`,
  },
]

// 方形区域数据
export const squareData = [
  {
    color: '#0b79ac',
    points: [
      [-23.570229, 0, 23.570229],
      [141.421135, 0, 188.561842],
      [23.569455, 0, 306.413702],
      [-141.421437, 0, 141.421438],
    ],
  },
  {
    color: '#0b79ac',
    points: [
      [235.702085, 0, -235.702085],
      [400.693795, 0, -70.710638],
      [164.991509, 0, 164.991509],
      [-0.006058, 0, -0.00929],
    ],
  },
  {
    color: '#0b79ac',
    points: [
      [-188.562756, 0, 141.422305],
      [-0.000365, 0, 329.983522],
      [-353.553362, 0, 683.58332],
      [-542.115175, 0, 494.974425],
    ],
  },
  {
    color: '#0b79ac',
    points: [
      [94.280792, 0, -235.702149],
      [141.420313, 0, -188.560763],
      [-141.421421, 0, 94.280426],
      [-188.561838, 0, 47.140482],
    ],
  },
  {
    color: '#0b79ac',
    points: [
      [212.131899, 0, -353.552535],
      [259.267222, 0, -306.418201],
      [164.991489, 0, -212.131989],
      [117.852037, 0, -259.273393],
    ],
  },
  {
    color: '#ffffff',
    points: [
      [-23.571092, 0, -494.975628],
      [47.143278, 0, -424.259428],
      [-235.69033, 0, -141.413438],
      [-306.415125, 0, -212.129832],
    ],
  },
  {
    color: '#ffffff',
    position: { x: -12, y: 1, z: 12 },
    points: [
      [94.280821, 0, -612.825959],
      [164.991521, 0, -542.115259],
      [70.711035, 0, -447.834636],
      [-0.000286, 0, -518.545245],
    ],
  },
]

// agv路线数据
export const textureData = [
  {
    textureKey: 'rightLoad-1',
    imgUrl: rightUrl,
    geomery: [210, 15],
    uvOffset: -0.05,
    repeat: { x: 10, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: (Math.PI * 3) / 4 },
    position: { x: -203, y: 1, z: 56 },
  },
  {
    textureKey: 'rightLoad-2',
    imgUrl: rightUrl,
    geomery: [600, 15],
    uvOffset: -0.05,
    repeat: { x: 25, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    position: { x: -75, y: 1, z: -230 },
  },
  {
    textureKey: 'rightLoad-3',
    imgUrl: rightUrl,
    geomery: [80, 15],
    uvOffset: -0.05,
    repeat: { x: 5, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: (Math.PI * 3) / 4 },
    position: { x: 120, y: 1, z: -470 },
  },
  {
    textureKey: 'leftLoad-1',
    imgUrl: leftUrl,
    geomery: [175, 15],
    uvOffset: 0.05,
    repeat: { x: 12, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    position: { x: -286, y: 1, z: -102 },
  },
  {
    textureKey: 'leftLoad-2',
    imgUrl: leftUrl,
    geomery: [500, 15],
    uvOffset: 0.05,
    repeat: { x: 25, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: (Math.PI * 3) / 4 },
    position: { x: -182, y: 1, z: 136 },
  },
  {
    textureKey: 'leftLoad-3',
    imgUrl: leftUrl,
    geomery: [120, 15],
    uvOffset: 0.05,
    repeat: { x: 10, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: -(Math.PI * 3) / 4 },
    position: { x: 36, y: 1, z: 280 },
  },
]

// 细节动作模拟文本数据
export const actionTextData = {
  detailActions: [
    '物料需求-MES排程计算',
    '物料需求-ANOON拉动',
    '下架-人工下架',
    '下架-自动化立库下架',
    '自动化库配送-LES配料超市',
    '备料超市接收物料',
    'AGV配送-物料直送',
    'AGV配送-多点配送',
    'AGV配送-跨楼层配送',
    'AGV配送-自动化线',
    'LES备料超市配送-自动化线',
    'AGV配送-产线入库',
    'LES备料超市配送-手动线',
    '自动线返空',
  ],
  standardActions: [
    '订单需求配送',
    '产线间拉动配送',
    '成平入库配送',
    '备料区拉动配送',
  ],
}

// 动作详情数据
export const actionDetailData = {
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
  7: {
    title: '物料直送',
    actions: [
      {
        name: '呼叫AGV',
        html: `立库将物料下架至下架区，开始呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至AGV取料点，WMS更新库存`
      },
      {
        name: 'AGV开始配送',
        html: `获取物料后，AGV开始移动至产线放料点`
      },
      {
        name: 'AGV与自动门交互',
        html: `AGV发送开门请求--自动门接收到请求后执行开门--AGV通过自动门--AGV发送关门请求--自动门收到关门请求后执行关门`
      },
      {
        name: 'AGV放料',
        html: `AGV移动至产线放料点后，放下物料，完成配送返回休息区`
      },
    ]
  },
  8: {
    title: '多点配送',
    actions: [
      {
        name: '呼叫AGV',
        html: `人工将物料拣配至料架，扫描货位码开始呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `LES给RCS下发连续配送任务，AGV移动至取料点获取物料，WMS更新库存`
      },
      {
        name: 'AGV执行任务1',
        html: `前往配送点1，配送点1获取该配送点所需物料后该点工人手持PDA扫描物料确认已收到物料，AGV离开前往配送点2`
      },
      {
        name: 'AGV执行任务2',
        html: `AGV前往配送点2，配送点2获取该配送点所需物料后该点工人手持PDA扫描物料确认已收到物料`
      },
      {
        name: 'AGV返回空料架',
        html: `人工PDA扫描返空箱，AGV将空料架搬运至空载具区后返回休息区`
      },
    ]
  },
  9: {
    title: '跨楼层配送',
    actions: [
      {
        name: '呼叫AGV',
        html: `立库将物料下架至下架区，开始呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至下架区获取物料，WMS更新库存`
      },
      {
        name: 'AGV移动至电梯口，与电梯交互',
        html: `请求电梯移动至AGV所在楼层-电梯移动至该楼层后开门-AGV进入电梯后-电梯关门-AGV请求前往所到楼层-电梯移动至AGV所到楼层-AGV离开电梯`
      },
      {
        name: 'AGV放料',
        html: `AGV前往该楼层配送点，放下物料，任务完成返回休息区`
      },
    ]
  },
  10: {
    title: '自动化线配送',
    actions: [
      {
        name: '呼叫AGV',
        html: `立库将物料下架至下架区，开始呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至取料点获取物料后前往配送点，WMS更新库存`
      },
      {
        name: '请求光栅关闭',
        html: `AGV到达光栅对接点，发送关闭光栅请求->光栅关闭后告知AGV可以进入`
      },
      {
        name: 'AGV放料',
        html: `AGV前往作业区域，放下物料，任务完成`
      },
      {
        name: '请求光栅开启',
        html: `AGV离开作业区域，AGV退出后，通知光栅已退出->光栅开启，接收AGV离开信号，光栅恢复开启状态，AGV返回休息区`
      },
    ]
  },
  11: {
    title: '人工配送',
    actions: [
      {
        name: '呼叫AGV',
        html: `人工将自动线物料拣配后放置在货位上，扫描货位码呼叫AGV`
      },
      {
        name: 'AGV取空载具',
        html: `AGV移动至空载具区获取对应类型载具`
      },
      {
        name: 'AGV取料',
        html: `AGV负载空载具移动至取料点获取物料`
      },
      {
        name: 'AGV开始配送',
        html: `获取物料后，AGV开始移动至自动化产线上料`
      },
      {
        name: 'AGV放料',
        html: `AGV到达自动线，对接自动线PLC后放置物料，完成配送返回休息区`
      },
    ]
  },
  12: {
    title: '产线入库',
    actions: [
      {
        name: '产线机械手发料',
        html: `机械手将物料放置在AGV取料点，开始呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至产线AGV取料点取物料`
      },
      {
        name: 'AGV开始配送',
        html: `获取物料后，AGV开始移动至立库上架区`
      },
      {
        name: 'AGV放料',
        html: `AGV移动至立库上架区后，放下物料，完成配送返回休息区`
      },
      {
        name: '同步配送结果',
        html: `LES返回配送结果给WMS`
      },
    ]
  },
  13: {
    title: 'LES备料超市配送-手动线',
    actions: [
      {
        name: '人工拣配',
        html: `人工将物料拣配后放置在料架上，扫描AGV取料点地呼叫码呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至取料点获取料架`
      },
      {
        name: 'AGV开始配送',
        html: `获取料架后，AGV开始移动手动线`
      },
      {
        name: 'AGV放料',
        html: `AGV到达手动线，放下料架，完成配送返回休息区`
      },
    ]
  },
  14: {
    title: '自动线返空',
    actions: [
      {
        name: '需求接收',
        html: `LES接收自动线PLC返空需求`
      },
      {
        name: '生成AGV任务',
        html: `LES根据需求生成AGV任务并下发给RCS`
      },
      {
        name: 'AGV取空载具',
        html: `AGV移动至空载具区获取对应类型载具`
      },
      {
        name: 'AGV取空托盘',
        html: `获取空载具后移动至自动线对接PLC获取空托盘`
      },
      {
        name: 'AGV开始配送',
        html: `获取空托盘后，AGV开始移动至空托盘放置区`
      },
      {
        name: 'AGV放空托盘',
        html: `AGV到达至空托盘放置区后，放置空托盘，完成配送返回休息区`
      },
    ]
  },
  15: {
    title: '订单需求配送',
    actions: [
      {
        name: 'LES计算产线物料需求',
        html: `LES根据订单和排程计算产线物料需求`
      },
      {
        name: '需求同步',
        html: `LES将备料需求发送给WMS（LES->WMS）`
      },
      {
        name: 'WMS执行出库',
        html: `堆垛机将物料下架至下架区，呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至WMS下架区取物料，WMS更新库存`
      },
      {
        name: 'AGV开始配送',
        html: `获取物料后，AGV开始移动至产线`
      },
      {
        name: 'AGV放料',
        html: `AGV移动至需求产线放料点后，放下物料，完成配送返回休息区`
      },
    ]
  },
  16: {
    title: '产线间拉动配送',
    actions: [
      {
        name: 'LES计算产线物料需求',
        html: `LES通过水位、节拍等策略计算产线物料需求或产线工人安灯叫料，生成拣配单`
      },
      {
        name: '拣配任务执行',
        html: `产线工人将拣配单上物料拣配至料架车，绑定货位站点后呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至产线AGV取料点取物料料架`
      },
      {
        name: 'AGV开始配送',
        html: `获取料架后，AGV开始移动至需求产线放料点`
      },
      {
        name: 'AGV放料',
        html: `<div>
                <div>1. AGV移动至需求产线放料点后，放下料架，完成配送</div>
                <div>2. AGV离开放料点返回休息区</div>
              </div>`
      },
    ]
  },
  17: {
    title: '成品入库配送',
    actions: [
      {
        name: '生成入库需求',
        html: `产线工人在MES中执行包装，关箱后将包装信息发送WMS生成入库单，机械手将物料放置在AGV取料点，开始呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至产线AGV取料点获取物料`
      },
      {
        name: 'AGV开始配送',
        html: `获取物料后，AGV开始移动至WMS上架区`
      },
      {
        name: 'AGV放料',
        html: `<div>
                <div>1. AGV移动至WMS上架区，放下料架，完成配送返回休息区</div>
                <div>2. 反馈配送结果至WMS（LES->WMS）</div>
              </div>`
      },
      {
        name: 'WMS执行入库',
        html: `堆垛机将物料搬运至库内，WMS库存更新`
      },
    ]
  },
  18: {
    title: '备料区拉动配送',
    actions: [
      {
        name: 'WMS执行出库需求',
        html: `WMS将物料出库至LES备料超市`
      },
      {
        name: '备料超市接收物料',
        html: `人工使用PDA接收物料并维护物料库存`
      },
      {
        name: '人工拣配',
        html: `人工将自动线物料拣配后放置在货位上，扫描货位码呼叫AGV`
      },
      {
        name: 'AGV取料',
        html: `AGV移动至WMS下架区取物料，WMS更新库存`
      },
      {
        name: 'AGV取空载具-取物料',
        html: `AGV移动至空载具区获取对应类型载具，移动至取料点获取物料`
      },
      {
        name: 'AGV开始配送',
        html: `获取物料后，AGV开始移动至自动化产线上料`
      },
      {
        name: 'AGV放料',
        html: `AGV到达自动线，对接自动线PLC后放置物料，完成配送返回休息区`
      },
    ]
  },
}