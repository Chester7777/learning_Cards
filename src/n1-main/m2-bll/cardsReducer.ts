import {Dispatch} from "redux";
import {CardsAPI, cardsPostType, cardsTypeobj, CardType, GetCardResponseType, updateCardType} from "../m3-dal/cards-api";
import {cardPackPostType, CardPackType, cardsPackTypeobj, PacksAPI, updatePackType} from "../m3-dal/packs-api";

type InitialStateType = typeof initialState;

// type InitialStateType = {
//     cardPacks: any
//     newPackTitle: null | string
//     id: string
//     cardPacksTotalCount: number
//     pageCount?: number
//     page?: number
//     portionSize: number
//     searchStatus: 'allPacks' | 'myPacks'
// }

// const initialState = {
//     cards: [],
//     newPackTitle: null,
//     id: '',
//     cardPacksTotalCount: 140,
//     pageCount: 10,
//     page: 1,
//     portionSize: 5,
//     searchStatus: 'allPacks',
//     error: "Packs not found!!!"
// }
const initialState = {
    cards: [],
    cardsTotalCount: null,
    maxGrade: null,
    minGrade: null,
    page: null,
    pageCount: null,
    packUserId: ''
}

export const cardsReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {

                ...state,
                cards: action.cards
            }
        case "CARDS/SET-CARDSINFO":
            return {
                ...state, ...action.cardsInfo
            }


        default:
            return state
    }
}

// actions
export const setCards = (cards: any) => ({type: "CARDS/SET-CARDS", cards} as const);
export const setCardsInfo = (cardsInfo: any) => ({type: "CARDS/SET-CARDSINFO", cardsInfo} as const);

//actions Paginator


// thunks
export const getCardTC = (pageN: number, packID: string) => async (dispatch: Dispatch) => {
    debugger
    try {
        const res = await CardsAPI.getCards(pageN, packID)
        dispatch(setCards(res.data.cards))
        const {
            page, pageCount, cardsTotalCount, maxGrade, minGrade

        } = res.data

        const action = {
            page, pageCount, cardsTotalCount, maxGrade, minGrade

        }

        dispatch(setCardsInfo(action))

    } catch (error) {

        console.log('erroorr fetching packs!!!', error)

    }


}
export const deleteCardTC = (idCard: string, idPack: string, page: number=1) => async (dispatch: any) => {

    try {
        const res = await CardsAPI.deleteCards(idCard)
        debugger
        dispatch(getCardTC(page, idPack))

    } catch (error) {

        console.log('erroorr fetching packs!!!', error)

    }


}

export const addCardsTC = (objcards:cardsTypeobj<cardsPostType>) => async (dispatch: any, getState: any) => {
    const page = 1


    try {
        const res = await CardsAPI.postCards(objcards)
        if (res.statusText === "Created") {
            dispatch(getCardTC(page, objcards.card.cardsPack_id))

        }
    } catch (e) {
        console.log('erroorr adding packs!!!', e)

    }
}

// export const unpdateCardTC = (objUpdatePack:cardsPackTypeobj<updatePackType>) => async (dispatch: any, getState: any) => {
export const unpdateCardTC = ({id,_id,comments,question}:updateCardType& { id: string }) => async (dispatch: any) => {
    const page = 1
    const objUpdatePack:cardsTypeobj<updateCardType>={card:{_id,comments,question}}

    try {
        debugger
        const res = await CardsAPI.updateCards(objUpdatePack)
            dispatch(getCardTC(page, id))
    } catch (e) {
        console.log('erroorr adding packs!!!', e)

    }
}

// types

type ActionsType =
    ReturnType<typeof setCards> |
    ReturnType<typeof setCardsInfo>


type CardsInfoType = {
cardsTotalCount: number
maxGrade: number
minGrade: number
page: number
pageCount: number
packUserId: string}