<template>
    <div class="relative">
        <!-- overlay -->
        <div class="bg-gray-700/80 fixed inset-0" @click="$emit('close')"></div>

        <!-- modal card -->
        <div class="absolute inset-0 z-10 flex justify-center items-center ">
            <div class="mx-auto max-w-5xl p-12 bg-white shadow-md rounded-lg">
                <slot />

            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
const emit = defineEmits(['close'])

let onKeyDown = (event) => {
    console.log('keydown', event.key)
    if(event.key === 'Escape'){
        emit('close')
    }
}

onMounted(() => window.addEventListener("keydown", onKeyDown))
onBeforeUnmount(() => window.removeEventListener("keydown", onKeyDown))


</script>
