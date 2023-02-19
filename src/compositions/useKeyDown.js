import { onMounted, onBeforeUnmount } from 'vue'

export const useKeyDown = function(keyCombo) {
    let onKeyDown = function(event) {
        console.log(keyCombo.key)
        if(event.key == keyCombo.key) {
            keyCombo.fn()
        }
    }

    onMounted(() => window.addEventListener("keydown", onKeyDown))
    onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown))

}

export default useKeyDown

// this file exports useKeyDown function which takes one argument (keyCombo)
// keyCombo is object { key: ..., fn: ...}
