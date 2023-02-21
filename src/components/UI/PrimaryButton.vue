<template>
    <button class="px-2 py-1 border-2 border-black cursor-pointer bg-white shadow-md min-w-max"
            :class="{'text-gray-400 border-gray-400': disabled}"
    >
        <slot />
    </button>
</template>

<script setup>
defineProps({
    disabled: Boolean
})

</script>
