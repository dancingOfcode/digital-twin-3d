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
    ]
  },
  {
    color: '#0b79ac',
    points: [
      [235.702085, 0, -235.702085],
      [400.693795, 0, -70.710638],
      [164.991509, 0, 164.991509],
      [-0.006058, 0, -0.00929],
    ]
  },
  {
    color: '#0b79ac',
    points: [
      [-188.562756, 0, 141.422305],
      [-0.000365, 0, 329.983522],
      [-353.553362, 0, 683.58332],
      [-542.115175, 0, 494.974425],
    ]
  },
  {
    color: '#0b79ac',
    points: [
      [94.280792, 0, -235.702149],
      [141.420313, 0, -188.560763],
      [-141.421421, 0, 94.280426],
      [-188.561838, 0, 47.140482],
    ]
  },
  {
    color: '#0b79ac',
    points: [
      [212.131899, 0, -353.552535],
      [259.267222, 0, -306.418201],
      [164.991489, 0, -212.131989],
      [117.852037, 0, -259.273393],
    ]
  },
  {
    color: '#ffffff',
    points: [
      [-23.571092, 0, -494.975628],
      [47.143278, 0, -424.259428],
      [-235.69033, 0, -141.413438],
      [-306.415125, 0, -212.129832],
    ]
  },
  {
    color: '#ffffff',
    position: { x: -12, y: 1, z: 12 },
    points: [
      [94.280821, 0, -612.825959],
      [164.991521, 0, -542.115259],
      [70.711035, 0, -447.834636],
      [-0.000286, 0, -518.545245],
    ]
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
    position: { x: -203, y: 1, z: 56 }
  },
  {
    textureKey: 'rightLoad-2',
    imgUrl: rightUrl,
    geomery: [600, 15],
    uvOffset: -0.05,
    repeat: { x: 25, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    position: { x: -75, y: 1, z: -230 }
  },
  {
    textureKey: 'rightLoad-3',
    imgUrl: rightUrl,
    geomery: [80, 15],
    uvOffset: -0.05,
    repeat: { x: 5, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: (Math.PI * 3) / 4 },
    position: { x: 120, y: 1, z: -470 }
  },
  {
    textureKey: 'leftLoad-1',
    imgUrl: leftUrl,
    geomery: [175, 15],
    uvOffset: 0.05,
    repeat: { x: 12, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: Math.PI / 4 },
    position: { x: -286, y: 1, z: -102 }
  },
  {
    textureKey: 'leftLoad-2',
    imgUrl: leftUrl,
    geomery: [500, 15],
    uvOffset: 0.05,
    repeat: { x: 25, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: (Math.PI * 3) / 4 },
    position: { x: -182, y: 1, z: 136 }
  },
  {
    textureKey: 'leftLoad-3',
    imgUrl: leftUrl,
    geomery: [120, 15],
    uvOffset: 0.05,
    repeat: { x: 10, y: 1 },
    rotation: { x: -Math.PI / 2, y: 0, z: -(Math.PI * 3) / 4 },
    position: { x: 36, y: 1, z: 280 }
  },
]