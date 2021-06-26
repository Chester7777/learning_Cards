import axios from 'axios'


const settings = {
    withCredentials: true
}

const instance = axios.create({
    // baseURL: "http://localhost:7542/2.0/",
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const PacksAPI = {
    getPacks (page: number,userID:string) {
       return instance.get<GetCardPackResponseType>(`cards/pack?pageCount=10&page=${page}&user_id=${userID}` )
    },
    getSeurchPacks ( packName: string, min: number, max: number) {
        debugger
       return instance.get<any>(`cards/pack?pageCount=10&packName=${packName}&min=${min}&max=${max}` )
       // return instance.get<GetSeurchPacksType>(`cards/pack?pageCount=10`, {params: {packName, min, max}} )
    },
    deletePack(id:string){
        return instance.delete(`/cards/pack?id=${id}`)
    },
    postPack(objcardsPack:cardsPackTypeobj<cardPackPostType>){
        return instance.post('/cards/pack',objcardsPack)
    },
    updatePack(objUpdatePack:cardsPackTypeobj<updatePackType>){
        return instance.put('/cards/pack',objUpdatePack)
    }

    // resetPassword (password: string, resetPasswordToken: string) {
    //   return instance.post<ResetPasswordType>(`auth/set-new-password`, {password, resetPasswordToken})
    // }
}

export type GetSeurchPacksType = {
    params: {
        packName: string
        min: number
        max: number 
    }
}
export type updatePackType={
    _id: string
    name?: string // не обязательно
}
export type GetCardPackResponseType = {
    // pageCount: number
    cardPacks : Array<CardPackType>
    page: number
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    pageCount: number
    name?: string
}
export type cardsPackTypeobj<D> ={
    cardsPack:D
};

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

export type cardPackPostType ={

        name?: string // если не отправить будет таким
        path?: string     //"/def" // если не отправить будет такой
        grade?: number // не обязателен
        shots?: number // не обязателен
        rating?: number // не обязателен
        deckCover?: string     // "url or base64" // не обязателен
        private?: boolean // fals если не отправить будет такой
        type?: string      ////"pack" // если не отправить будет таким
}