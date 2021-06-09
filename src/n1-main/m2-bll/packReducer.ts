import {Dispatch} from "redux";
import {CardPackType, PacksAPI} from "../m3-dal/packs-api";

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
    cardPacks: [
        {
            _id: "",
            user_id: "",
            name: "no Name",
            path: "/def", // папка
            cardsCount: 2,
            grade: 0, // средняя оценка карточек
            shots: 0, // количество попыток
            rating: 0, // лайки
            type: "pack", // ещё будет "folder" (папка)
            created: "",
            updated: "",
            __v: 0
        },
    ],
    cardPacksTotalCount: 14, // количество колод
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 2, // количество элементов на странице
    error: "Packs not found!!!"
}

export const packReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {
                ...state,
                cardPacks: action.cardPacks
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
export const setPacksError = (error: string) => ({type: "PACKS/SET-PACKS-ERROR", error} as const);

//actions Paginator


// thunks
export const getPacksTC = (page: number, cardPacks: Array<CardPackType>) => async (dispatch: Dispatch) => {
    try {
        await PacksAPI.getPacks(page)
        if (cardPacks) {
            dispatch(setPacks(cardPacks))
        }
    } catch (error) {
        dispatch(setPacksError(error))
    }


}
export const addPackTC = () => {

}
export const deletePackTC = () => {

}

// types

type ActionsType =
    ReturnType<typeof setPacks> |
    ReturnType<typeof setPacksError>


