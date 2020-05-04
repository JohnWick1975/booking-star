<template>
    <div class="notification" :class="type" v-if="display">
        <button @click="display = false" class="delete"></button>
        {{message}}
    </div>
</template>

<script>
    export default {
        name: "Notification",
        props: {
            display: Boolean,
            type: String,
            message: String,
        }
    }
</script>

<style scoped>

</style>