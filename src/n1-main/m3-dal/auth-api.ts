import axios from "axios"

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,

})
// api
export const authAPI = {

    login(data: LoginParamsType) {
        return instance.post<ResponceLoginType>('/auth/login', data)
           },
    logOut() {
        return instance.delete<ResponceLogOutType>('/auth/me')
         },
    me(){
        return instance.post('auth/me')
    },


    signUp(email: string, password: string) {
        return instance.post<{ addedUser: ResponceLoginType, error?: string }>('auth/register', {email, password})
    },

}


export const searchAPI = {}


// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean

}

export type ResponceLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: string; // need Data
    updated: string; // need Data
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

export type ResponceLogOutType = {
    info: string;
    error: string;
}
export type SignUpParamsType = {
    email: string
    password: string
}

