import {Dispatch} from "redux";
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
//     cardPacks: [],
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
    cardPacks: [],
    cardPacksTotalCount: null, // количество колод
    maxCardsCount: null,
    minCardsCount: null,
    page: null, // выбранная страница
    pageCount: null, // количество элементов на странице
    error: "Packs not found!!!"
}

export const packReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {
                ...state,
                cardPacks: action.cardPacks
            }
        case "PACKS/SET-PACKSINFO":
            return {
                ...state, ...action.packsInfo

            }
        case "PACKS/SET-PACKS-ERROR":
            return {
                ...state,
                error: state.error
            }

        default:
            return state
    }
}

// actions
export const setPacks = (cardPacks: Array<any>) => ({type: "PACKS/SET-PACKS", cardPacks} as const);
export const setPacksInfo = (packsInfo: any) => ({type: "PACKS/SET-PACKSINFO", packsInfo} as const);
export const setPacksError = (error: string) => ({type: "PACKS/SET-PACKS-ERROR", error} as const);

//actions Paginator


// thunks
export const getPacksTC = (pageN: number=1, userID: string) => async (dispatch: Dispatch) => {
    try {
        const res = await PacksAPI.getPacks(pageN, userID)
        if (res.statusText === "OK")
            dispatch(setPacks(res.data.cardPacks))
        const {
            cardPacksTotalCount,
            maxCardsCount,
            minCardsCount,
            page,
            pageCount
        } = res.data
        const action = {
            cardPacksTotalCount,
            maxCardsCount,
            minCardsCount,
            page,
            pageCount
        }

        dispatch(setPacksInfo(action))

    } catch (error) {

        console.log('erroorr fetching packs!!!', error)

        dispatch(setPacksError(error))
    }


}
export const deletePackTC = (id: string) => async (dispatch: any, getState: any) => {
    const _id = getState().profile._id
    const page = getState().packs.page
    try {
        const res = await PacksAPI.deletePack(id)
        if (res.statusText === "OK") {
            dispatch(getPacksTC(page, _id))
        }

    } catch (error) {

        console.log('erroorr fetching packs!!!', error)

    }


}

export const addPackTC = (newcard: cardsPackTypeobj<cardPackPostType>) => async (dispatch: any, getState: any) => {
    const _id = getState().profile._id
    const page = getState().packs.page
    try {
        const res = await PacksAPI.postPack(newcard)
        if (res.statusText === "Created") {
            dispatch(getPacksTC(page, _id))

        }
    } catch (e) {
        console.log('erroorr adding packs!!!', e)

    }
}

export const unpdatePackTC = (objUpdatePack:cardsPackTypeobj<updatePackType>) => async (dispatch: any, getState: any) => {
    const _id = getState().profile._id
    const page = getState().packs.page
    try {
        const res = await PacksAPI.updatePack(objUpdatePack)
        if (res.statusText === "OK") {
            dispatch(getPacksTC(page, _id))

        }
    } catch (e) {
        console.log('erroorr adding packs!!!', e)

    }
}

// types

type ActionsType =
    ReturnType<typeof setPacks> |
    ReturnType<typeof setPacksError> |
    ReturnType<typeof setPacksInfo>


