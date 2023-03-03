<template>
    <div class="fixed inset-0 overflow-y-auto px-4 py-12 sm:px-0 z-50">
        <div class="fixed inset-0" @click="emit('changeEmail', {closeModal: true})">
            <div class="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <div
            class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform sm:w-full sm:max-w-5xl mx-auto p-8"
        >
            <slot  />
        </div>
    </div>
</template>

<script setup>
import { useKeyDown } from '../../composables/useKeyDown'
const emit = defineEmits(['changeEmail'])

useKeyDown([
    { key: 'Escape', fn: () => { emit('changeEmail', {closeModal: true}) } },
    { key: 'Enter', fn: () => { console.log('pressed Enter') } }
])

</script>
