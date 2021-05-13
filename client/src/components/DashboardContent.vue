<template>
    <b-container id="page-container">
        <b-row class="mb-5">
            <b-col>
                <h1>Dash<b>board</b></h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>
                    Welcome to <b>Cognizant Softvision</b> team!
                </p>
                <p>
                    Starting today you are part of a big, diverse and complex world, and this will help you
                    understand this context - better and faster.
                    Your accommodation is set it in a schedule and every task below will help you go smoothly.
                </p>
            </b-col>
        </b-row>
        <ScheduledTasks v-on:uncompletedTasks="$emit('notification', $event)"/>
    </b-container>
</template>
<script>
import ScheduledTasks from './ScheduledTasks'
export default {
    name: 'DashboardContent',
    components: {
        ScheduledTasks
    },
    data() {
        return {
            data: ''
        }
    }
}
</script>
<style>

</style>