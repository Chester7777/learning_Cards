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


    try {
        await PasswordAPI.forgotPassword(email)
        dispatch(setForgotPassword(email, message, from))
    } catch (error) {
       return setForgotPasswordError(error.data.error)
    }

}

// export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
//     thunkAPI.dispatch(setAppStatus({status: 'loading'}))
//     try {
//         const res = await authAPI.logout()
//         if (res.data.resultCode === 0) {
//             thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
//             return
//         } else {
//             return handleAsyncServerAppError(res.data, thunkAPI)
//         }
//     } catch (error) {
//         return handleAsyncServerNetworkError(error, thunkAPI)
//     }
// })

export const resetNewPassword = (password: string, resetPasswordToken: string) => async (dispatch: any) => {
    try {
        const res = await PasswordAPI.resetPassword(password, resetPasswordToken)
        dispatch(resetPassword(password, resetPasswordToken))
    } catch (error) {
      return   setForgotPasswordError(error.data.error)
    }
}


// types
type ActionsType = any


