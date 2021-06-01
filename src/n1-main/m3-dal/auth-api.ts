import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,

})
// api
export const authAPI = {

    login(data: LoginParamsType) {
        return instance.post<ResponceLoginType>('/auth/login', data)
        // email: string
        // password: string
        // rememberMe: boolean

    }
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
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
