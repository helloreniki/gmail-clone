<template>
    <button class="px-2 py-1 border cursor-pointer bg-white"
            :class="{'text-gray-400': disabled}"
    >
        <slot />
    </button>
</template>

<script setup>
defineProps({
    disabled: Boolean
})

</script>
