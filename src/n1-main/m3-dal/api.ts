import axios from "axios";


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})
export const  Api = {
    postDataRegister(email: string, password: string)  {
        return instance.post('auth/register', {email, password})
            .then(response =>   response.data)
    },
    getPacks(page: number) {
        return instance.get<GetCardPackResponseType>(`cards/pack?pageCount=10&page=${page}`)
            .then(response =>   response.data)
    },
    postNewPack(title: string) {
        return instance.post<PostOrDeleteResponseType>(`cards/pack`, {cardsPack: {name: title}})
            .then(response => response.data)
    },
    deletePack(id: string) {
        let promise = instance.delete<PostOrDeleteResponseType>(`cards/pack?id=${id}`)
        return promise
            .then(response => response.data)
    },
    updatePack(newPackName: string, id: string) {
        let promise = instance.put<any>(`cards/pack?id=${id}`, {cardsPack: {name: newPackName, _id: id }})
        return promise
            .then(response => response.data)
    },
    getCards(packId: string) {
        let promise = instance.get<CardsDataType>(`cards/card?&cardsPack_id=${packId}&pageCount=10`);
        return promise
            .then(response => response.data)
    },
    postNewCard(question: string, answer: string, packId: string) {
        return instance.post(`cards/card`, {card: {question: question, answer: answer, cardsPack_id: packId}})
            .then(response => response.data)
    },
    me() {
        const promise = instance.post<MeType>('auth/me');
        return promise
            .then(response => response.data)
    },
    deleteCard(id: string) {
        let promise = instance.delete(`cards/card?id=${id}`)
        return promise
            .then(response => response.data)
    },
    updateCard(question: string, answer: string, id: string) {
        let promise = instance.put<any>(`cards/card`, {card: {_id: id , question: question, answer: answer}})
        return promise
            .then(response => response.data)
    }
}

type GetCardPackResponseType = {
    // pageCount: number
    // page: number
    [key: string] : Array<CardPackType>
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

type PostOrDeleteResponseType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
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
}

export type CardsDataType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

// type DeleteCardResponceType = {
//     deletedCard:
//         answer: "OOjjOO"
//     cardsPack_id: "60a508fe94de4b00046c1e2c"
//     comments: ""
//     created: "2021-05-19T13:27:08.251Z"
//     grade: 0
//     more_id: "60a3812fd0411e000441aa0e"
//     question: "DDgggDD"
//     rating: 0
//     shots: 0
//     type: "card"
//     updated: "2021-05-19T13:27:08.251Z"
//     user_id: "60a3812fd0411e000441aa0e"
//     __v: 0
//     _id: "60a5122c94de4b00046c1e30"
//     __proto__: Object
//     token: "d0a04b60-b8a6-11eb-9f11-8fc7ff1ef88a"
//     tokenDeathTime: 1621442016918
// }


type MeType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    error?: string;
}



