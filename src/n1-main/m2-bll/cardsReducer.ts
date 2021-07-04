import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {
    CardsAPI,
    cardsPostType,
    cardsTypeobj,
    putGradeType,
    // CardType,
    // GetCardResponseType,
    updateCardType
} from "../m3-dal/cards-api";
import {cardPackPostType, CardPackType, cardsPackTypeobj, PacksAPI, updatePackType} from "../m3-dal/packs-api";
import {AppRootStateType} from "./store";

type InitialStateType = typeof initialState;


const initialState: GetCardResponseType = {
    cards: [],
    cardsTotalCount: null,
    maxGrade: null,
    minGrade: null,
    page: null,
    pageCount: null,
    packUserId: '',
    cardToLearn: null,
    currentIDpack: null,
    currentIDcard: null,
    cardAnswer: "",
    cardQuestion: ""
}
export type GetCardResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    page: null | number
    pageCount: number | null
    packUserId: string
    cardToLearn: any
    currentIDpack: string | null
    currentIDcard: string | null
    cardAnswer: string
    cardQuestion: string

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

export const cardsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            debugger
            return {
                ...state,
                cards: action.cards
            }
        case "CARDS/SET-CARDSINFO":
            return {
                ...state, ...action.cardsInfo
            }
        case "CARDS/SET-currentIDpack":
            return {
                ...state, currentIDpack: action.currentIDpack
            }
        case "CARDS/SET-currentIDcard":
            return {
                ...state, currentIDcard: action.currentIDcard
            }
        case "CARDS/FIND-CARD-TO-LEARN":
            let copystate = {...state}
            const cardToLearn = copystate.cards.filter(c => {
                if (c._id === action.id) return {...c}
            })
            return {
                ...state, cardToLearn: {...cardToLearn}
            }
        default:
            return state
    }
}

// actions
export const findCardToLearn = (id: string | null) => ({type: "CARDS/FIND-CARD-TO-LEARN", id} as const);
export const setCards = (cards: Array<CardType>) => ({type: "CARDS/SET-CARDS", cards} as const);
export const setCardsInfo = (cardsInfo: any) => ({type: "CARDS/SET-CARDSINFO", cardsInfo} as const);
export const setcurrentIDpack = (currentIDpack: string) => ({type: "CARDS/SET-currentIDpack", currentIDpack} as const);
export const setcurrentIDcard = (currentIDcard: string) => ({type: "CARDS/SET-currentIDcard", currentIDcard} as const);

//actions Paginator

//actions Search


// thunks
export const getCardTC = (pageN: number, packID: string) => async (dispatch: Dispatch) => {
    try {
        const res = await CardsAPI.getCards(pageN, packID)
        dispatch(setCards(res.data.cards))
        const {
            page, pageCount, cardsTotalCount, maxGrade, minGrade, packUserId
        } = res.data
        const action = {
            page, pageCount, cardsTotalCount, maxGrade, minGrade, packUserId
        }
        dispatch(setCardsInfo(action))
    } catch (error) {
        console.log('error fetching packs!!!', error)
    }
}

export const getCardsSearch = (
    cardAnswer: string,
    cardQuestion: string,
    min: number,
    max: number,
    page?: number
) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {

    try {
        // let res
        // const cardAnswer = getState().cards.cardAnswer, cardQuestion = getState().cards.cardQuestion, min = getState().cards.minGrade, max = getState().cards.maxGrade
        // if (cardAnswer) {
        //     res = await PacksAPI.getSearchPacks(cardAnswer, cardQuestion, min, max, page)
        // } else {
        //     res = await PacksAPI.getPacks(pageN, userID)
        // }
        debugger
       let  res = await CardsAPI.getSearchCards(cardAnswer, cardQuestion, min, max, page)
        dispatch(setCards(res.data.cards))

    } catch (error) {
        debugger
        console.log('error search cards!!!', error.info)

    }

}

export const deleteCardTC = (idCard: string, idPack: string, page: number = 1) => async (dispatch: any) => {
    try {
        const res = await CardsAPI.deleteCards(idCard)

        dispatch(getCardTC(page, idPack))

    } catch (error) {

        console.log('error fetching packs!!!', error)

    }


}

export const addCardsTC = (objcards: cardsTypeobj<cardsPostType>) => async (dispatch: any, getState: any) => {
    const page = 1

    try {
        const res = await CardsAPI.postCards(objcards)
        if (res.statusText === "Created") {
            dispatch(getCardTC(page, objcards.card.cardsPack_id))
        }
    } catch (e) {
        console.log('error adding packs!!!', e)
    }
}

export const setGradeTC = (grade: putGradeType) => async (dispatch: any, getState: any) => {
    const page = 1
    try {
        const res = await CardsAPI.putGrade(grade)
        // dispatch(getCardTC(page, objcards.card.cardsPack_id))
    } catch (e) {
        console.log('error adding packs!!!', e)
    }
}
// export const unpdateCardTC = (objUpdatePack:cardsPackTypeobj<updatePackType>) => async (dispatch: any, getState: any) => {
export const unpdateCardTC = ({
                                  id,
                                  _id,
                                  comments,
                                  question
                              }: updateCardType & { id: string }) => async (dispatch: any) => {
    const page = 1
    const objUpdatePack: cardsTypeobj<updateCardType> = {card: {_id, comments, question}}

    try {
        const res = await CardsAPI.updateCards(objUpdatePack)
        dispatch(getCardTC(page, id))
    } catch (e) {
        console.log('error adding packs!!!', e)

    }
}

// types

type ActionsType =
    ReturnType<typeof setCards> |
    ReturnType<typeof setCardsInfo> |
    ReturnType<typeof findCardToLearn> |
    ReturnType<typeof setcurrentIDpack> |
    ReturnType<typeof setcurrentIDcard>


type CardsInfoType = {
    cardsTotalCount: number | null
    maxGrade: number | null
    minGrade: number | null
    page: number | null
    pageCount: number | null
    packUserId: string
}