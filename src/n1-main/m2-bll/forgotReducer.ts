import {Dispatch} from "redux";
import {PasswordAPI} from "../m3-dal/forgot-api";


type InitialStateType = {
    status: string
    error: string | null
    isInitialized: boolean
    forgotPassword: false
    from: string
    email: string
    message: string
    password: string
    resetPasswordToken: string
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: true,
    forgotPassword: false,
    from: "",
    email: "",
    message: "",
    password: "",
    resetPasswordToken: ""
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
        case "RESET-PASSWORD":
            return {
                ...state,
                password: action.password,
                resetPasswordToken: action.resetPasswordToken
            }
        default:
            return state
    }
}

// actions
export const setForgotPassword = (email: string, message: string, from: string) => ({
    type: "SET-FORGOT-PASSWORD", email, message, from
} as const);
export const resetPassword = (password: string, resetPasswordToken: string) => ({
    type: "RESET-PASSWORD", password, resetPasswordToken
} as const);
export const setForgotPasswordError = (error: string | null) => ({
    type: "SET-FORGOT-PASSWORD-ERROR", error
} as const);


// thunks
export const forgotPasswordTC = (email: string, message: string, from: string) => async (dispatch: Dispatch) => {

    await PasswordAPI.forgotPassword(email)
    try {
        dispatch(setForgotPassword(email, message, from))
    } catch (error) {
        setForgotPasswordError(error.error)
    }

}


export const resetNewPassword = (password: string, resetPasswordToken: string) => async (dispatch: any) => {
    try {
        let respons = await PasswordAPI.resetPassword(password, resetPasswordToken)
        debugger
        dispatch(resetPassword(password, resetPasswordToken))
    } catch (error) {
        debugger
        setForgotPasswordError(error.data.error)
    }
}


// types
type ActionsType = any


