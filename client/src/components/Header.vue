<template>
    <b-container fluid class="mb-5" id="header-container">
        <b-navbar toggleable="lg" type="dark">
            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-navbar-nav class="mt-1">
                        <b-nav-item href="#" class="h3 mr-3" title="Notifications">
                            <i class="fas fa-bell"></i>
                        </b-nav-item>
                        <b-nav-item href="#" title="Avatar">
                            <b-avatar class="mr-3"></b-avatar>
                            <span class="mr-auto">S. Tiberiu</span>
                        </b-nav-item>
                        <b-nav-item href="#" class="h3" @click="logOut" title="logout">
                            <i class="fas fa-power-off"></i>
                        </b-nav-item>
                    </b-navbar-nav>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </b-container>
</template>
<script>
export default {
    name: 'Header',
    methods: {
        async logOut() {
            try {
                await this.$store.dispatch('LogOut')

                this.$router.push('/login')
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
<style scoped>
    .navbar-brand img {
        width: 140px;
    }
</style>