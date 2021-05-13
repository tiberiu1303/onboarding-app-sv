<template>
    <section id="login-page" class="d-flex p-3">
        <b-container class="rounded-lg shadow w-25 p-3">
                <b-row class="justify-content-md-center">
                    <b-col class="text-center mb-5" cols="5">
                        <b-img src="../../img/logoCognizantSoftvision.png" fluid  alt="Logo Cognizant Softvision"></b-img>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </b-col>
                </b-row>
            </b-container>
    </section>
</template>
<script>

export default {
    name: 'Client',
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
