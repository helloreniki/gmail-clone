<template>
    <div>
        <h2>Subject: <strong>{{ email.subject }}</strong></h2>
        <div>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</div>
        <div>{{ email.body }}</div>
    </div>
</template>

<script setup>
import { format } from 'date-fns'

const props = defineProps({
    email: Object
})
</script>
