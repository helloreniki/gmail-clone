<template>
    <div>
        <div class="flex gap-2 mb-10">
            <PrimaryButton @click="toggleArchive">{{ props.email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</PrimaryButton>
            <PrimaryButton @click="toggleRead">{{ props.email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</PrimaryButton>
            <PrimaryButton>Newer</PrimaryButton>
            <PrimaryButton>Older</PrimaryButton>
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

function toggleRead(){
    props.email.read = !props.email.read
    axios.put(`http://localhost:3000/emails/${props.email.id}`, props.email)
}

function toggleArchive(){
    props.email.archived = ! props.email.archived
    axios.put(`http://localhost:3000/emails/${props.email.id}`, props.email)
}

useKeyDown([
    { key: 'r', fn: toggleRead },
    { key: 'e', fn: toggleArchive }
])
</script>
