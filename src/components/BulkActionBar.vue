<template>
     <div class="flex gap-3 items-center mb-4 py-2 text-sm px-2 mx-auto">
        <!-- Select All -->
        <input  type="checkbox"
                @click="toggleAll"
                :checked="allEmailsSelected"
                class="w-6 h-6 accent-pink-500"
        >
        <PrimaryButton @click="emailSelection.markRead()" :disabled="[...emailSelection.selected].every(email => email.read)" >Mark Read</PrimaryButton>
        <PrimaryButton @click="emailSelection.markUnread()" :disabled="[...emailSelection.selected].every(email => !email.read)">Mark Unread</PrimaryButton>
        <PrimaryButton v-if="props.selectedScreen == 'inbox'" @click="emailSelection.archive" :disabled="numberSelected == 0">Archive</PrimaryButton>
        <PrimaryButton v-else @click="emailSelection.moveToInbox" :disabled="numberSelected == 0">Move to Inbox</PrimaryButton>
        <div>
            from bulk: {{ emailSelection.selected.size }}
        </div>
    </div>
</template>

<script setup>
import PrimaryButton from "../components/UI/PrimaryButton.vue";
import { useEmailSelection } from "../composables/useEmailSelection"
import { computed } from "vue"

const emailSelection = useEmailSelection()

let props = defineProps({
    emails: Array,
    selectedScreen: String
})

let numberSelected = computed(() => emailSelection.selected.size)
let allEmailsSelected = computed(() => numberSelected.value == props.emails.length)


function toggleAll() {
    if(allEmailsSelected.value) {
        emailSelection.clear()
    } else {
        emailSelection.selectAll(props.emails)
    }
}

</script>
