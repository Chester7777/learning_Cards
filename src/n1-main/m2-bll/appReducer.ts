import {Dispatch} from "redux";

const initialState:InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: true
}
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized:boolean
}
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state,isInitialized:action.status
            }
        default:
            return {...state}
    }
}
export const    setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setIsInitializedAC = (status:boolean) => ({ type: 'APP/SET-INITIALIZED', status } as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {

}



export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    |setIsInitializedACType
