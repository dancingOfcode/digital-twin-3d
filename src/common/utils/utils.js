import LabelRender from '@/common/three/labelRender'

/**
 * 渲染标签
 * @param {String} type 标签类型
 * @param {Object} viewer 视图
 * @param {Object} labelData 标签信息列表
 * @param {String} html HTML内容
 * @param {Object} position 位置信息
 * @param {Object} rotation 旋转参数
 */
export const renderLabel = (
  type,
  viewer,
  labelData = [
    {
      html: '',
      fontSize: '14px',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  ],
) => {
  let labelRender = new LabelRender(viewer)
  if (!labelData.length) return
  if (type === '3DLabel') {
    labelData.map(item => {
      const { html, fontSize = '14px', position, rotation } = item
      let label = labelRender.addCss3DSprite(html, position, fontSize)
      label.rotation.set(rotation.x, rotation.y, rotation.z)
    })
  }
  if (type === '3DSprite') {
    labelData.map(item => {
      const { html, fontSize = '14px', position, rotation } = item
      labelRender.addCss3DSprite(html, position, fontSize)
    })
  }
}
