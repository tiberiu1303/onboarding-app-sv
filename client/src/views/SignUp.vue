<template>
    <div>
        <b-row>
            <b-col>
                <b-form @submit.prevent="signUp">
                    <b-row>
                        <b-col class="text-left">
                            <b-form-group
                            label="Email address"
                            label-for="email"
                            >
                                <b-form-input
                                id="email"
                                v-model="$v.form.email.$model"
                                type="email"
                                placeholder="Enter email"
                                required
                                :state="errors.email ? false : null"
                                ></b-form-input>
                                <b-form-invalid-feedback v-show="errors.email" :state="!errors.email">
                                    {{ errors.email }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                            label="Password"
                            label-for="password"
                            description="Password must contain at least 8 characters and have 
                                small letters(a-z), big letters(A-Z), numbers(0-9) and at least one of the following symbols (@$!%*#?&-)"
                            >
                                <b-form-input
                                id="password"
                                v-model="$v.form.password.$model"
                                type="password"
                                placeholder="Enter password"
                                required
                                :state="errors.password ? false : null"
                                ></b-form-input>
                                <b-form-invalid-feedback v-show="errors.password" :state="!errors.password" >
                                    {{ errors.password }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                            label="Confirm Password"
                            label-for="confirm-password"
                            >
                                <b-form-input
                                id="confirm-password"
                                v-model="$v.form.confirmPassword.$model"
                                type="password"
                                placeholder="Confirm password"
                                required
                                :state="errors.confirmPassword ? false : null"
                                ></b-form-input>
                                <b-form-invalid-feedback v-show="errors.confirmPassword" :state="!errors.confirmPassword">
                                    {{ errors.confirmPassword }}
                                </b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group
                            label="Enter External ID"
                            label-for="sv-id"
                            description="External ID provided by your company"
                            >
                                <b-form-input
                                id="sv-id"
                                v-model="form.externalId"
                                type="text"
                                placeholder="Enter ID"
                                ></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="text-right mt-3">
                            <b-button type="login" block variant="success">Sign Up</b-button>
                        </b-col>
                    </b-row>
                    <hr class="mt-5" />
                    <b-row class="">
                        <b-col class="text-center mt-3 text-secondary">
                            <p>
                                You remembered that you have an account? 
                                <br/>
                                Go to
                                <router-link :to="{ name: 'Login'}">
                                    <b>Login page</b>
                                </router-link>
                            </p>
                        </b-col>
                    </b-row>
                </b-form>
                <BaseFormAlert alertType="danger" :alertMessage="alertMessage" />
            </b-col>
        </b-row>
    </div>
</template>
<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { password } from "../utils/customValidators"
import BaseFormAlert from "../components/BaseFormAlert"

export default {
    name: 'Register',
    data() {
        return {
            form: {
                email: '',
                password: '',
                confirmPassword: '',
                externalId: ''
            },
            errors: {},
            alertMessage: '',
        }
    },
    components: {
        BaseFormAlert
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required,
                password
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs('password')
            }
        }
    },
    methods: {
        async signUp() {
            this.formValidation()
            console.log(this.$v.form.password)
            if (!this.$v.$error) {
                try {
                    await this.$store.dispatch('SignUp', this.form)

                    this.$router.push('/dashboard')
                } catch (e) {
                    this.alertMessage = e
                }
            }
        },
        formValidation() {
            this.errors = {}

            this.$v.$touch()
            
            if (this.$v.form.email.$error) {
                this.errors.email = `Incorrect email format`
            }

            if (this.$v.form.password.$error) {
                this.errors.password = `Incorrect password format. Please check mandatory characters for password`
            }

            if (this.$v.form.confirmPassword.$error) {
                this.errors.confirmPassword = `Confirmation password doesn't match!`
            }

        }
    }
}
</script>