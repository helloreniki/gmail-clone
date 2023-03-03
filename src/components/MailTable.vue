<template>
    <div class="flex gap-2 justify-center items-center pb-12">
        <PrimaryButton @click="selectScreen('inbox')" :disabled="selectedScreen == 'inbox'">Inbox View</PrimaryButton>
        <PrimaryButton @click="selectScreen('archive')" :disabled="selectedScreen == 'archive'">Archived View</PrimaryButton>
    </div>
    <BulkActionBar :emails="filteredEmails" :selectedScreen="selectedScreen"/>
    <table class="text-sm cursor-pointer border-collapse w-full">
        <!-- {{  emailSelection.selected }} -->
        <tbody>
            <tr v-for="email in filteredEmails"
                :key="email.id"
                class="border-b border-t border-gray-700"
                :class="{'bg-gray-200': email.read}"
            >
                <td class="px-2 py-2">
                    <input  type="checkbox"
                            class="w-6 h-6 accent-pink-500"
                            :checked="emailSelection.selected.has(email)"
                            @click="emailSelection.toggle(email)"
                    >
                </td>
                <td @click="openEmail(email)" class="text-gray-500 px-2">{{ email.from }}</td>
                <td @click="openEmail(email)" class="font-semibold px-2 text-sm">{{ email.subject }}</td>
                <td class="text-gray-500 px-2 text-sm w-32">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
                <td class="pr-2"><PrimaryButton v-if="selectedScreen == 'inbox'" @click="archiveEmail(email)" class="text-sm">Archive</PrimaryButton></td>
                <td class="pr-2"><PrimaryButton v-if="selectedScreen == 'archive'" @click="moveEmailToInbox(email)" class="text-sm">Move to Inbox</PrimaryButton></td>
            </tr>
        </tbody>
    </table>

    <div class="my-8 text-gray-400 text-sm">
        {{ emailSelection.selected.size }} emails selected
    </div>

    <!-- show opened email -->
    <ModalView v-if="openedEmail" @changeEmail="changeEmail">
        <MailView :email="openedEmail" @changeEmail="changeEmail"/>
    </ModalView>
</template>

<script setup>
import PrimaryButton from '../components/UI/PrimaryButton.vue'
import MailView from '../components/MailView.vue'
import ModalView from './UI/ModalView.vue'
import { format } from 'date-fns'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import useEmailSelection from '../composables/useEmailSelection'
import BulkActionBar from './BulkActionBar.vue'

let emailSelection = useEmailSelection()

const emails = ref([])
const error = ref(null)
const openedEmail = ref(null)
const selectedScreen = ref('inbox')


async function getEmails(){
    try {
        let response = await axios.get('http://localhost:3000/emails')
        emails.value = response.data
    } catch(err) {
        error.value = err
    }
}

onMounted(getEmails)

function selectScreen(screenName){
    selectedScreen.value = screenName
    emailSelection.clear()
}


function openEmail(email) {
    openedEmail.value = email
    if(email){
        email.read = true
        updateEmail(email)
    }
}

function archiveEmail(email) {
    email.archived = true
    updateEmail(email)
}

function moveEmailToInbox(email) {
    email.archived = false
    updateEmail(email)
}

function updateEmail(email) {
    axios.put(`http://localhost:3000/emails/${email.id}`, email)
}

// function closeModal(){
//     // console.log('closing')
//     openedEmail.value = false
// }

// show emails based on which screen is selected
const filteredEmails = computed(() => {
    if(selectedScreen.value == 'inbox'){
        return sortedEmails.value.filter((email) => !email.archived)
    } else {
        return sortedEmails.value.filter((email) => email.archived)
    }
})

const sortedEmails = computed(() => {
    return emails.value.sort((e1, e2) => {e1.sentAt - e2.sentAt})
})

const unarchivedEmails = computed(() => {
    return sortedEmails.value.filter((email) => !email.archived)
})

function changeEmail({toggleRead, toggleArchive, save, closeModal, changeIndex}){
    let email = openedEmail.value
    if(toggleRead) { email.read = !email.read }
    if(toggleArchive) { email.archived = !email.archived }
    if(save) { updateEmail(email) }
    if(closeModal) { openedEmail.value = null }

    if(changeIndex){
        let emails = unarchivedEmails
        let currentIndex = emails.value.indexOf(openedEmail.value)
        // console.log(changeIndex) // 1 or -1
        let newEmail = emails.value[currentIndex + changeIndex]
        openEmail(newEmail)
    }
}

</script>
