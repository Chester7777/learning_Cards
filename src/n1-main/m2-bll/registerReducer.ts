import {Dispatch} from "redux";
import {authAPI, SignUpParamsType} from "../m3-dal/auth-api";
import {AxiosError} from "axios";
import {SetAppErrorActionType} from "./appReducer";


type InitialStateType = typeof initialState

export type LoadingStatusType = any


const initialState = {
    isRegistered: false,
    setError: ''
}

export const registerReducer = (state:InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {

        case "registration/SET-IS-REGISTRATION":
            return {...state, isRegistered: action.value}
        case "registration/SET-ERROR":
            return {...state, setError: action.text}

        default:
            return state
    }
}

// actions
export const setIsRegistrationAC = (value: boolean) => ({
    type: 'registration/SET-IS-REGISTRATION', value
} as const)

export const setErrorAC = (text: string) => ({
    type: 'registration/SET-ERROR', text
} as const)


// thunks

export const SendRegisterTC = (email:string, password: string) => (dispatch: Dispatch<RegistrationActionsType>) => {
    authAPI.signUp(email, password)
        .then( (res) => {
            if (res.statusText === 'succeeded')
            dispatch(setIsRegistrationAC(true))
        })
        .catch((err: AxiosError) => {
            dispatch(setErrorAC(err.response?.data.error))
        alert('some error')
        })
}


// types

type RegistrationActionsType =
     ReturnType<typeof setIsRegistrationAC>
    | ReturnType<typeof setErrorAC>
    | SetAppErrorActionType

// type ThunkDispatch = Dispatch<any>