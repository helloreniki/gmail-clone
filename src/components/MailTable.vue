<template>
    <div class="flex gap-2 justify-center items-center pb-12">
        <PrimaryButton @click="selectScreen('inbox')" :disabled="selectedScreen == 'inbox'">Inbox View</PrimaryButton>
        <PrimaryButton @click="selectScreen('archive')" :disabled="selectedScreen == 'archive'" >Archived View</PrimaryButton>
    </div>
    <BulkActionBar :emails="filteredEmails"/>
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
                <td class="pr-2"><PrimaryButton @click="archiveEmail(email)" class="text-sm">Archive</PrimaryButton></td>
            </tr>
        </tbody>
    </table>
    {{ emailSelection.selected.size }}
    <!-- show opened email -->
    <!-- <div v-if="openedEmail">{{ openedEmail.subject }}</div> -->
    <ModalView v-if="openedEmail" @changeEmail="changeEmail">
        <MailView :email="openedEmail" @changeEmail="changeEmail"/>
    </ModalView>
</template>

<script setup>
import PrimaryButton from '../components/UI/PrimaryButton.vue'
import MailView from '../components/MailView.vue'
import ModalView from './UI/ModalView.vue'
import { format } from 'date-fns'
import { computed, onMounted, ref, reactive } from 'vue'
import axios from 'axios'
import useEmailSelection from '../composables/useEmailSelection'
import BulkActionBar from './BulkActionBar.vue'

let emailSelection = useEmailSelection()

const emails = ref([])
const error = ref(null)
const openedEmail = ref(null)
const selectedScreen = ref('inbox')

console.log(selectedScreen.value)


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
    // console.log('openEmail')
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

// const unarchivedEmails = computed(() => {
//     return sortedEmails.value.filter((email) => !email.archived)
// })

const sortedEmails = computed(() => {
    return emails.value.sort((e1, e2) => {e1.sentAt - e2.sentAt})
})

function changeEmail({toggleRead, toggleArchive, save, closeModal, changeIndex}){
    let email = openedEmail.value
    if(toggleRead) { email.read = !email.read }
    if(toggleArchive) { email.archived = !email.archived }
    if(save) { updateEmail(email) }
    if(closeModal) { openedEmail.value = null }

    if(changeIndex){
        let emails = unarchivedEmails
        // console.log(changeIndex)
        let currentIndex = emails.value.indexOf(openedEmail.value)
        // console.log('curr', currentIndex)
        // console.log(emails.value[currentIndex + changeIndex])

        let newEmail = emails.value[currentIndex + changeIndex]
        openEmail(newEmail)
    }


}

</script>
