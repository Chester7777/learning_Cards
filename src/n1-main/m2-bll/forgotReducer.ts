import {Dispatch} from "redux";
import {PasswordAPI} from "../m3-dal/forgot-api";


type InitialStateType = {
    info: string
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
    info: '',
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
export const forgotReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-FORGOT-PASSWORD":
            return {
                ...state,
                email: action.email,
                message: action.message,
                from: action.from
            }
        case "RESET-PASSWORD":
            return {
                ...state,
                password: action.password,
                resetPasswordToken: action.resetPasswordToken
            }
        case "RESET-PASSWORD-INFO":
            return {
                ...state,
                info: action.info
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
} as const);
export const resetPassword = (password: string, resetPasswordToken: string) => ({
    type: "RESET-PASSWORD", password, resetPasswordToken
} as const);
export const resetPasswordInfo = (info: any) => ({
    type: "RESET-PASSWORD-INFO", info
} as const);
export const setForgotPasswordError = (error: string | null) => ({
    type: "SET-FORGOT-PASSWORD-ERROR", error
} as const);


// thunks
export const forgotPasswordTC = (email: string, message: string, from: string) => async (dispatch: Dispatch) => {

    try {
        await PasswordAPI.forgotPassword(email)
        dispatch(setForgotPassword(email, message, from))
    } catch (error) {
        dispatch(setForgotPasswordError(error.response.data.error))
    }
}


export const resetNewPassword = (password: string, resetPasswordToken: string) => async (dispatch: Dispatch) => {
    try {
        const res = await PasswordAPI.resetPassword(password, resetPasswordToken)
        if (res.data.info == "setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—") {
            dispatch(resetPasswordInfo(res.data.info))
        }

    } catch (error) {
        console.log(error)
        dispatch(setForgotPasswordError(error.response.data.error))
    }
}


// types
export type ActionsType =
    ReturnType<typeof setForgotPassword> |
    ReturnType<typeof resetPassword> |
    ReturnType<typeof resetPasswordInfo> |
    ReturnType<typeof setForgotPasswordError>




