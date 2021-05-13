<template>
    <b-row v-show="alertMessage.length">
        <b-col class="mt-3">
            <b-alert show :variant="alertType" class="text-center">
                {{ alertMessage }}
            </b-alert>
        </b-col>
    </b-row>
</template>
<script>

export default {
    name: 'BaseFormAlert',
    props: {
        alertType: {
            type: String,
            required: true
        },
        alertMessage: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
