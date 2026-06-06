import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useFullscreenElement() {
  const targetRef = ref<HTMLElement | null>(null)
  const fullscreenElement = ref<Element | null>(null)
  const fallbackFullscreen = ref(false)

  const syncFullscreenElement = () => {
    if (typeof document === 'undefined') {
      fullscreenElement.value = null
      return
    }

    fullscreenElement.value = document.fullscreenElement
    if (document.fullscreenElement) {
      fallbackFullscreen.value = false
    }
  }

  onMounted(() => {
    syncFullscreenElement()
    document.addEventListener('fullscreenchange', syncFullscreenElement)
  })

  onBeforeUnmount(() => {
    if (typeof document === 'undefined') return
    document.removeEventListener('fullscreenchange', syncFullscreenElement)
  })

  const isFullscreen = computed(() => {
    return Boolean(
      targetRef.value &&
        (fullscreenElement.value === targetRef.value || fallbackFullscreen.value)
    )
  })

  async function toggleFullscreen() {
    const target = targetRef.value
    if (!target || typeof document === 'undefined') return

    if (fallbackFullscreen.value && !document.fullscreenElement) {
      fallbackFullscreen.value = false
      return
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    if (typeof target.requestFullscreen === 'function') {
      try {
        await target.requestFullscreen()
        syncFullscreenElement()
        if (document.fullscreenElement !== target) {
          fallbackFullscreen.value = true
        }
      } catch {
        fallbackFullscreen.value = true
      }
      return
    }

    fallbackFullscreen.value = true
  }

  return {
    targetRef,
    isFullscreen,
    toggleFullscreen
  }
}
