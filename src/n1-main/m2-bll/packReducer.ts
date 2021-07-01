import {Dispatch} from "redux";
import {cardPackPostType, cardsPackTypeobj, PacksAPI, updatePackType} from "../m3-dal/packs-api";
import {AppRootStateType} from "./store";

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
    cardPacksTotalCount: 140, // количество колод
    maxCardsCount: null,
    minCardsCount: null,
    id: '',
    page: 1, // выбранная страница
    pageCount: 5, // количество элементов на странице
    portionSize: 5,
    error: "Packs not found!!!",
    packName: ""
}

export const packReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {...state, cardPacks: action.cardPacks}
        case "PACKS/SET-PACKSINFO":
            return {...state, ...action.packsInfo}
        case "PACKS/SET-PACKS-ERROR":
            return {...state, error: state.error}
        case "SET_CURRENT_PAGE":
            return {...state, page: action.page}
        case "SET_TOTAL_COUNT":
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        default:
            return state
    }
}

// actions
export const setPacks = (cardPacks: Array<any>) => ({type: "PACKS/SET-PACKS", cardPacks} as const);
// export const setPacks = (params: GetCardPackResponseType) => ({type: "PACKS/SET-PACKS", params} as const);
export const setPacksInfo = (packsInfo: any) => ({type: "PACKS/SET-PACKSINFO", packsInfo} as const);
export const setPacksError = (error: string) => ({type: "PACKS/SET-PACKS-ERROR", error} as const);

//action search
// export const setPacksSearchName = (packName: any) => ({type: "PACKS/SET-PACKSNAME-SEARCH", packName} as const);
// export const setPacksSearch = (cardPacks: Array<any>) => ({type: "PACKS/SET-PACKS-SEARCH", cardPacks} as const);

//actions Paginator
export const setCurrentPageAC = (page: number) => ({type: "SET_CURRENT_PAGE", page} as const)
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) => ({
    type: "SET_TOTAL_COUNT", cardPacksTotalCount
} as const)


// thunks
export const getPacksTC = (pageN: number = 1, userID: string) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    try {
        let res
        const packName = getState().search.packName, min = getState().search.min, max = getState().search.max
        if (packName) {
            res = await PacksAPI.getSearchPacks(packName, min, max, pageN)
        } else {
            res = await PacksAPI.getPacks(pageN, userID)
        }
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
        dispatch(setCardPacksTotalCountAC(action.cardPacksTotalCount))
        dispatch(setCurrentPageAC(action.page))
    } catch (error) {
        console.log('error fetching packs!!!', error)
        dispatch(setPacksError(error))
    }
}
export const getPacksSearchNameTC = (packName: string, min: number, max: number) => async (dispatch: Dispatch) => {
    try {
        const res = await PacksAPI.getSearchPacks(packName, min, max, 1)
        if (res.statusText === "OK") {
            dispatch(setPacks(res.data.cardPacks))
        }
    } catch (error) {
        console.log('error fetching packs!!!', error)
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
        console.log('error fetching packs!!!', error)
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
        console.log('error adding packs!!!', e)
    }
}

export const unpdatePackTC = (objUpdatePack: cardsPackTypeobj<updatePackType>) => async (dispatch: any, getState: any) => {
    const _id = getState().profile._id
    const page = getState().packs.page
    try {
        const res = await PacksAPI.updatePack(objUpdatePack)
        if (res.statusText === "OK") {
            dispatch(getPacksTC(page, _id))
        }
    } catch (e) {
        console.log('error adding packs!!!', e)

    }
}

// types

type ActionsType =
    ReturnType<typeof setPacks> |
    ReturnType<typeof setPacksError> |
    ReturnType<typeof setPacksInfo> |
    ReturnType<typeof setCurrentPageAC> |
    // ReturnType<typeof setPacksSearch> |
    // ReturnType<typeof setPacksSearchName> |
    ReturnType<typeof setCardPacksTotalCountAC>;


