import axios from 'axios'


const settings = {
    withCredentials: true
}

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const PasswordAPI = {
    forgotPassword(email: string) {
        const message = `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='https://chester7777.github.io/learning_Cards/#/new-password/$token$'> link</a></div>`
        // const message = `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='http://localhost:3001/forgot-password#/new-password/$token$'> link</a></div>`
        const from = "test-front-admin <Es18.03.88@gmail.com>"
       return instance.post<any>("auth/forgot", {email, message, from})
    },
    resetPassword (password: string, resetPasswordToken: string) {
      return instance.post<any>(`auth/set-new-password`, {password, resetPasswordToken})
    }
}

// type ForgotPasswordType = {
//     data: {
//         email: string
//         from: string
//         message: string
//     }
// }
type ResetPasswordType = {
   data: {
       info: string
       error: string
   }
}