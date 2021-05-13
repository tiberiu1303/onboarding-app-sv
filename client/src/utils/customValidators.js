// import { helpers } from 'vuelidate/lib/validators'

export const password = (value) =>  {
    const matchPassword = value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)

    return matchPassword ? !!matchPassword[0] : false
}