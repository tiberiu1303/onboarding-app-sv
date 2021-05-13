<template>
    <div>
        <DashboardContent v-on:notification="makeToast('Welcome back S.Tiberiu', `You have ${$event} uncompleted tasks!`)"/>
    </div>
</template>
<script>

import DashboardContent from '../components/DashboardContent.vue'

export default {
    name: 'Dashboard',
    components: {
        DashboardContent,
    },
    mounted() {
    },
    methods: {
        makeToast(title = '', message) {
            this.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 6000,
                appendToast: true,
                variant: 'info',
                toaster: 'b-toaster-bottom-right',
            })
        }
    }
}
</script>