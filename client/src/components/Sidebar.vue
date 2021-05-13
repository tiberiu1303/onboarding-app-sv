<template>
    <div>
        <b-sidebar 
            id="sidebar" 
            aria-labelledby="sidebar-no-header-title" 
            no-header 
            :visible="true" 
            shadow 
            text-variant="light"
            width="auto"
            :no-close-on-route-change="true"
            >
            <template>
                <div class="mt-3">
                <nav class="mb-3 text-center">
                    <b-nav vertical>
                        <b-nav-item active>
                            <router-link :to="{name: 'Dashboard'}">
                                <i class="fas fa-home"></i>
                            </router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link :to="{name: 'NewTask'}">
                                <i class="fas fa-calendar-plus"></i>
                            </router-link>
                        </b-nav-item>
                        <b-nav-item active>
                            <i class="fas fa-tasks"></i>
                        </b-nav-item>
                        <b-nav-item>
                            <i class="fas fa-book"></i>
                        </b-nav-item>
                        <b-nav-item>
                            <i class="fas fa-video"></i>
                        </b-nav-item>
                        <b-nav-item>
                            <i class="fas fa-info-circle"></i>
                        </b-nav-item>
                        <b-nav-item>
                            <i class="fas fa-project-diagram"></i>
                        </b-nav-item>
                        <b-nav-item>
                            <i class="fas fa-gifts"></i>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link :to="{name: 'UserRoles'}">
                                <i class="fas fa-user-tag"></i>
                            </router-link>
                        </b-nav-item>
                    </b-nav>
                </nav>
                </div>
            </template>
        </b-sidebar>
    </div>
</template>
<script>

export default {
    name: 'Sidebar'
}
</script>

<style>
#sidebar .b-sidebar-body .nav-item a {
    color: white;
    font-size: 24px;
}
</style>
