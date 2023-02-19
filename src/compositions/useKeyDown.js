import { onMounted, onBeforeUnmount } from 'vue'

export const useKeyDown = function(fn) {
    let onKeyDown = function(event) {
        if(event.key == 'Escape') {
            fn()
        }
    }

    onMounted(() => window.addEventListener("keydown", onKeyDown))
    onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown))

}

export default useKeyDown

// this file exports useKeyDown function which takes one argument (fn) and calls that function when Escape key is hit
