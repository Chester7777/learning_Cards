import {Dispatch} from "redux";
import {cardAPI} from "../m3-dal/forgot-api";


type InitialStateType = {
    status: string
    error: string | null
    isInitialized: boolean
    forgotPassword: false
    from: string
    email: string
    message: string
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: true,
    forgotPassword: false,
    from: "",
    email: "",
    message: "",
}

//Reducer
export const forgotReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case "SET-FORGOT-PASSWORD":
            return {
                ...state,
                email: action.email,
                message: action.message,
                from: action.from
            }
        case "SET-FORGOT-PASSWORD-ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

// actions
export const setForgotPassword = (email: string, message: string, from: string) => ({
    type: "SET-FORGOT-PASSWORD", email, message, from
} as const)
export const setForgotPasswordError = (error: string | null) => ({
    type: "SET-FORGOT-PASSWORD-ERROR",
    error
} as const)

// thunks
export const forgotPasswordTC = (email: string, message: string, from: string) => async (dispatch: Dispatch) => {

   await cardAPI.forgotPassword(email)
    try {
        dispatch(setForgotPassword(email, message, from))
    } catch (error) {
        setForgotPasswordError(error.error)
    }

}


export const authMeTC = () => (dispatch: any) => {

}


// types
type ActionsType = any


