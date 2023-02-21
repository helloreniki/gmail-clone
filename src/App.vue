
import PrimaryButton from './components/UI/PrimaryButton.vue';

<template>
    <div class="max-w-7xl mx-auto px-16">

        <h1 class="text-4xl font-semibold my-12 text-center">VMail Inbox</h1>
        <div>{{ emailSelection.selected.size }}</div>

        <Suspense>
            <template #default>
                <MailTable />
            </template>
            <template #fallback>
                Loading ...
            </template>
        </Suspense>
    </div>

</template>

<script setup>
import PrimaryButton from './components/UI/PrimaryButton.vue';
import MailTable from './components/MailTable.vue';
import { useEmailSelection } from './composables/useEmailSelection'

const emailSelection = useEmailSelection()

</script>
