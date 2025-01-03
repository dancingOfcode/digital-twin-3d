/**
 * @description 布尔值
 * @author xu.zhengyou
 * @param {boolean} defaultValue 默认 false
 * @returns {Object}
 */
import { ref } from 'vue'

function useBoolean(defaultValue = false) {
  const boolean = ref(defaultValue)

  const setTrue = () => {
    boolean.value = true
  }

  const setFalse = () => {
    boolean.value = false
  }

  const toggle = () => {
    boolean.value = !boolean.value
  }

  return {
    boolean,
    setTrue,
    setFalse,
    toggle,
  }
}

export default useBoolean
