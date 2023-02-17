
import PrimaryButton from './components/UI/PrimaryButton.vue';

<template>
    <div class="max-w-7xl mx-auto px-16">
        <div class="flex gap-2 justify-center items-center pt-12">
            <PrimaryButton class="border-2 border-black">Inbox View</PrimaryButton>
            <PrimaryButton>Archived View</PrimaryButton>
        </div>
        <h1 class="text-4xl font-semibold my-12 text-center">VMail Inbox</h1>
        <div class="flex gap-2 items-center mb-2 py-2 text-sm px-2 mx-auto">
            <input type="checkbox" class="w-6 h-6 accent-pink-500">
            <PrimaryButton class="">Mark Read</PrimaryButton>
            <PrimaryButton class="text-gray-400">Mark Unread</PrimaryButton>
            <PrimaryButton>Archive</PrimaryButton>
        </div>
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

</script>
