<template>
    <b-container class="mb-5">
        <b-row class="justify-content-md-center">
            <b-col cols="6" id="new-task-form" class="shadow-lg">
                <b-row>
                    <b-col>
                        <h4 class="text-center mb-3">
                            Allocate a new <b>check</b>!
                        </h4>
                    </b-col>
                </b-row>
                <hr class="mb-5"/>
                <b-form @submit.prevent="saveNewTask">
                    <b-form-group label="Title:*" label-for="title">
                        <b-form-input
                        id="title"
                        v-model.trim="$v.form.title.$model"
                        :state="errors.title.length ? false : null"
                        type="text"
                        placeholder="Enter title"
                        required
                        ></b-form-input>
                        <b-form-invalid-feedback v-show="errors.title.length" :state="!errors.title.length" :tooltip="true">
                            {{ errors.title }}
                        </b-form-invalid-feedback>

                    </b-form-group>
                    <b-form-group label="Description:*" label-for="description">
                        <b-form-textarea
                        id="description"
                        v-model="$v.form.description.$model"
                        :state="errors.description.length ? false : null"
                        placeholder="Enter description..."
                        rows="5"
                        ></b-form-textarea>
                        <b-form-invalid-feedback v-show="errors.description.length" :state="!errors.description.length" :tooltip="true">
                            {{ errors.description }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Choose period:*" label-for="period">
                        <b-form-select 
                        id="period" 
                        v-model="$v.form.period.$model" 
                        :options="periods" 
                        :state="errors.period.length ? false : null"
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>-- Please select a period --</b-form-select-option>
                            </template>
                        </b-form-select>
                        <b-form-invalid-feedback v-show="errors.period.length" :state="!errors.period.length" :tooltip="true">
                            {{ errors.period }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Allocate to:" label-for="allocated_to">
                        <b-form-select 
                            id="allocated_to" 
                            v-model="form.allocatedTo" 
                            :options="users" 
                        >
                            <template #first>
                                <b-form-select-option :value="0">-- All --</b-form-select-option>
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Drop Image:" label-for="image" description="The image is used for the checklist container in dashboard">
                        <b-form-file
                        id="image"
                        v-model="form.image"
                        placeholder="Choose image or drop it here..."
                        drop-placeholder="Drop image here..."
                        @change="setImage"
                        ></b-form-file>
                    </b-form-group>
                    <b-form-group label="Drop Attachment:" label-for="attachment">
                        <b-form-file
                        id="attachment"
                        v-model="form.attachment"
                        placeholder="Choose attachment or drop it here..."
                        drop-placeholder="Drop attachment here..."
                        @change="setAttachment"
                        ></b-form-file>
                    </b-form-group>
                    <b-button type="submit" size="lg" block class="float-right mt-5" :disabled="disabledSubmit" variant="success">
                        <span v-show="disabledSubmit">
                            <b-spinner small type="grow"></b-spinner>
                            Loading...
                        </span>
                        <span v-show="!disabledSubmit">
                            Add new
                        </span>
                    </b-button>
                </b-form>
                <BaseFormAlert :alertType="alertType" :alertMessage="alertMessage" />
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import BaseFormAlert from "../components/BaseFormAlert"
import { required, minLength } from 'vuelidate/lib/validators'

const minTitleChar = 10
const minDescriptionChar = 30

export default {
    name: 'NewTask',
    data() {
        return {
            form: {
                title: '',
                description: '',
                period: null,
                image: null,
                attachment: null,
                allocatedTo: 0,
            },
            disabledSubmit: false,
            alertType: 'success',
            alertMessage: '',
            periods: [],
            users: [],
            errors: {
                title: '',
                description: '',
                period: ''
            }
        }
    },
    validations: {
        form: {
            title: {
                required,
                minLength: minLength(minTitleChar)
            },
            description: {
                required,
                minLength: minLength(minDescriptionChar)
            },
            period: {
                required
            }
        }
    },
    components: {
        BaseFormAlert
    },
    mounted() {
        this.getTaskPeriods()
        this.getUsers()
    },
    methods: {
        async getTaskPeriods() {
            const taskPeriods = await this.$store.dispatch('getTaskPeriods')

            taskPeriods.forEach(v => {
                this.periods.push({
                    text: v.name,
                    value: v._id
                })
            })
        },
        async getUsers() {
            try {
                const users = await this.$store.dispatch('getUsers')

                users.forEach(v => {
                    this.users.push({
                        text: v.email,
                        value: v._id
                    })
                })

            } catch(e) {
                console.log(e)
            }
        },
        setImage(event) {
            this.form.image = event.target.files[0]
        },
        setAttachment(event) {
            this.form.attachment = event.target.files[0]
        },
        async saveNewTask() {
            try {
                this.validateForm()

                if (!this.$v.$error) {
                    this.disabledSubmit = true
                    let formData = new FormData();
                    
                    for (const val in this.form) {
                        formData.append(val, this.form[val])
                    }

                    await this.$store.dispatch('NewTask', formData)
                    this.disabledSubmit = false
                    this.alertMessage = "Task was added with success!"
                }
            } catch (e) {
                this.error = e
            }

            this.cleanForm()
        },
        cleanForm() {
            this.form.title = ''
            this.form.description = ''
            this.form.period = null
            this.form.image = null
            this.form.attachment = null
            this.form.allocatedTo = 0
        },
        validateForm() {
            this.errors.title = ''
            this.errors.description = ''
            this.errors.period = ''

            this.$v.$touch()
            
            if (this.$v.form.title.$error) {
                this.errors.title = `Title must have minimum of ${minTitleChar} characters`
            }

            if (this.$v.form.description.$error) {
                this.errors.description = `Description must have minimum of ${minDescriptionChar} characters`
            }

            if (this.$v.form.period.$error) {
                this.errors.period = `You must select a period`
            }
        }
    }
}
</script>
<style scoped>
#new-task-form {
    padding: 2rem;
    border-radius: 10px;
    background: white;
}

#new-task-form .form-group {
    position: relative;
}
</style>
