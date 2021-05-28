import axios from 'axios'

const settings = {
    withCredentials: true,
}


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const cardAPI = {
    forgotPassword(email: string,) {
        const message = `<div style="background-color: lime; padding: 15px"> password recovery link: <a href='https://highhack.github.io/Page4/$token$'> link</a></div>`
        const from = "test-front-admin <ai73a@yandex.by>"
        return instance.post('auth/forgot', {email,from,message});
    },
    authMe(){
        let promise = instance.post('auth/me', {});
        return promise;
    }
}