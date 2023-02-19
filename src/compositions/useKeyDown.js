import { onMounted, onBeforeUnmount } from 'vue'

export const useKeyDown = function(keyCombos) {
    let onKeyDown = function(event) {
        // console.log(keyCombos) // array, find value == event.key
        let kc = keyCombos.find((kc) => kc.key == event.key)
        // console.log(kc)
        if(kc) {
            kc.fn()
        }
    }

    onMounted(() => window.addEventListener("keydown", onKeyDown))
    onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown))

}

export default useKeyDown

// this file exports useKeyDown function which takes one argument (keyCombo)
// keyCombo is object { key: ..., fn: ...}
