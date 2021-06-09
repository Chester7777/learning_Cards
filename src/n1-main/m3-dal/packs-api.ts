import axios from 'axios'


const settings = {
    withCredentials: true
}

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const PacksAPI = {
    getPacks (page: number) {
       return instance.get<GetCardPackResponseType>(`cards/pack?pageCount=10&page=${page}&user_id=` )
    },
    // resetPassword (password: string, resetPasswordToken: string) {
    //   return instance.post<ResetPasswordType>(`auth/set-new-password`, {password, resetPasswordToken})
    // }
}

export type GetCardPackResponseType = {
    // pageCount: number
    cardPacks : Array<CardPackType>
    page: number
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    pageCount: number
}

export  type CardPackType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": boolean
    "name": string
    "path": string
    "grade": number
    "shots": number
    "cardsCount": number
    "type": string
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
}
