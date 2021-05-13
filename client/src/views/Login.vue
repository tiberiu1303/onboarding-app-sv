<template>
    <div>
        <b-row>
            <b-col>
                <b-form @submit.prevent="login">
                    <b-row>
                        <b-col class="text-left">
                            <b-form-group
                            label="Email address or ID"
                            label-for="email"
                            >
                                <b-form-input
                                id="email"
                                v-model="form.email"
                                type="email"
                                placeholder="Enter email/ ID"
                                required
                                ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Password"
                        label-for="password"
                    >
                        <b-input-group>
                            <b-form-input
                            id="password"
                            v-model="form.password"
                            :type="inputPasswordType"
                            placeholder="Enter password"
                            required
                            ></b-form-input>
                            <template>
                                <b-input-group-append>
                                    <b-button variant="outline-secondary" @click="toggleViewPassword">                    
                                        <span v-show="inputPasswordType == 'password'"> <i class="fas fa-eye" ></i></span>          
                                        <span v-show="inputPasswordType == 'text'"> <i class="fas fa-eye-slash" ></i></span>          
                                    </b-button>
                                </b-input-group-append>
                            </template>
                        </b-input-group>
                    </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="text-right mt-3">
                            <b-button type="login" block variant="success">Login</b-button>
                        </b-col>
                    </b-row>
                    <hr class="mt-5" />
                    <b-row class="">
                        <b-col class="text-center mt-3 text-secondary">
                            <p>
                                Don't have an account? 
                                <router-link :to="{ name: 'SignUp'}">
                                    <b>Sign up</b>
                                </router-link>
                            </p>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
        </b-row>
        <BaseFormAlert alertType="danger" :alertMessage="errorMessage"/>
    </div>
</template>
<script>
import BaseFormAlert from "../components/BaseFormAlert"

export default {
    name: 'Login',
    components: {
        BaseFormAlert
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            inputPasswordType: 'password',
            errorMessage: '',
            alertDismissCount: 0,
        }
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch('LogIn', this.form)

                this.$router.push('/dashboard')
            } catch (e) {
                this.errorMessage = e
            }
        },
        toggleViewPassword() {
            this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password'
        }
    }
}
</script>
