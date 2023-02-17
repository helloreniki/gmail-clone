<template>
    <div class="relative">
        <!-- overlay -->
        <div class="bg-gray-700/80 fixed inset-0" @click="$emit('close')"></div>

        <!-- modal card -->
        <div class="relative z-10 flex justify-center items-center">
            <div class="mx-auto max-w-5xl p-12 bg-white shadow-md rounded-lg">
                <slot />

            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['close'])

</script>
