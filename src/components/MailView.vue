<template>
    <div>
        <div class="flex gap-2 mb-10">
            <PrimaryButton @click="toggleArchive">{{ props.email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</PrimaryButton>
            <PrimaryButton @click="toggleRead">{{ props.email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</PrimaryButton>
            <PrimaryButton @click="goOlder">Older (j)</PrimaryButton>
            <PrimaryButton @click="goNewer">Newer (k)</PrimaryButton>
        </div>
        <h2 class="my-4 text-xl">Subject: <strong>{{ email.subject }}</strong></h2>
        <div class="mb-8">From: {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</div>
        <div v-html="marked(email.body)" class="leading-relaxed "></div>
    </div>
</template>

<script setup>
import PrimaryButton from './UI/PrimaryButton.vue'
import { format } from 'date-fns'
import { marked } from 'marked'
import axios from 'axios';
import useKeyDown from '../compositions/useKeyDown'

const props = defineProps({
    email: Object
})

let emit = defineEmits(['changeEmail'])


function toggleRead(){
   emit('changeEmail', {toggleRead: true, save: true})
}

function toggleArchive(){
    emit('changeEmail', {toggleArchive: true, save: true})
}

function goNewer(){
    // console.log('gonew')
    emit('changeEmail', {changeIndex: -1})
}

function goOlder(){
    emit('changeEmail', {changeIndex: 1})
}

function goNewerAndArchive(){
    emit('changeEmail', {changeIndex: -1, toggleArchive: true, save: true})
}

function goOlderAndArchive(){
    emit('changeEmail', {changeIndex: 1, toggleArchive: true, save: true})
}

useKeyDown([
    { key: 'r', fn: toggleRead },
    { key: 'e', fn: toggleArchive },
    { key: 'k', fn: goNewer },
    { key: 'j', fn: goOlder },
    { key: '[', fn: goNewerAndArchive },
    { key: ']', fn: goOlderAndArchive }
])
</script>
