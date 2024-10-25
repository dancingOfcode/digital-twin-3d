import useBoolean from '@/hooks/useBoolean'

function useFullScreen() {
  const { boolean, setTrue, setFalse } = useBoolean()

  const toggleFullScreen = () => {
    if (boolean.value) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setFalse()
      }
    } else {
      const element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
        setTrue()
      }
    }
  }

  return { isFullScreen: boolean.value, toggleFullScreen }
}

export default useFullScreen
