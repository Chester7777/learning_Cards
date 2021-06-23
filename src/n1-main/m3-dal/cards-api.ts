import axios from 'axios'


const settings = {
    withCredentials: true
}

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})
export const CardsAPI = {
    getCards (page: number,cardsPackID:string) {
       return instance.get<GetCardResponseType>(`cards/card?pageCount=10&page=${page}&cardsPack_id=${cardsPackID}` )
    },
    deleteCards(id:string){
        return instance.delete(`/cards/card?id=${id}`)
    },
    postCards(objcards:cardsTypeobj<cardsPostType>){
        return instance.post('/cards/card',objcards)
    },
    updateCards(objUpdatePack:cardsTypeobj<updateCardType>){
        debugger
        return instance.put('/cards/card',objUpdatePack)
    },
    putGrade(grade:putGradeType){
        return instance.put<gradeRespType>('cards/grade',grade)
    }

    // resetPassword (password: string, resetPasswordToken: string) {
    //   return instance.post<ResetPasswordType>(`auth/set-new-password`, {password, resetPasswordToken})
    // }
}
export type putGradeType={
    grade: number
    card_id: string
}
export type gradeRespType={
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}


export type updateCardType={
    _id: string
    question?: string // не обязательно
    comments?: string // не обязателен
}
export type GetCardResponseType = {
    cards : Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}


export  type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string

    answerImg: string
    answerVideo: string
    comments: string
    more_id: string
    questionImg: string
    questionVideo: string
 
}



export type cardsTypeobj<D> ={
    card:D
};


export type cardsPostType ={

    cardsPack_id: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    rating?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
    type?: string // если не отправить будет таким
}