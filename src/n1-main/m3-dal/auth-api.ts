import axios from "axios"

const instance = axios.create({
    // baseURL: "http://localhost:7542/2.0/",
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true
})

// api
export const authAPI = {
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<LoginParamsType>(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/me`, {});
    }
}


export const searchAPI = {
    search(packName: string, min: number, max: number) {
        return instance.get(`cards/pack?packName=${packName}&min=${min}&max=${max}&pageCount=10`);
    },
    //этот запрос нужен, если фильтр делать со второй кнопкой
    // searchMinMax (min: number, max: number) {
    //     return instance.get(`cards/pack?min=${min}&max=${max}`)
    // }
}



// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}


