import {Dispatch} from "redux"
import {authAPI, LoginParamsType} from "../m3-dal/auth-api";
import {SetAppErrorActionType, SetAppStatusActionType, setIsInitializedAC, setIsInitializedACType} from "./appReducer";
import {setLoginErrorAC, setProfileDataAC} from "./profileReducer";

// types
type InitialStateType = {
    isLoggedIn: boolean
}

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setProfileDataAC> | SetAppErrorActionType
    | SetAppStatusActionType
    | setIsInitializedACType |
    ReturnType<typeof setLoginErrorAC>

export type RequestStatusType = any


const initialState: InitialStateType = {
    isLoggedIn: false

}


export const loginReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)


// thunks
export const loginTC = ({email, password, rememberMe}: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setIsInitializedAC(false))
    try {
        const res = await authAPI.login({email, password, rememberMe})

        if (res.statusText === 'OK')
            dispatch(setIsInitializedAC(true))
        dispatch(setIsLoggedInAC(true))
        dispatch(setProfileDataAC(res.data))

    } catch (e) {
        dispatch(setIsInitializedAC(true))

        const error = e.response
            ? dispatch(setLoginErrorAC(e.response.data.error))
            : (e.message + ', more details in the console');
        console.log('Error: ', {...e})
    }
}
export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.logOut()
        if (res.statusText === "OK") {
            dispatch(setIsLoggedInAC(false))
        }
    } catch (e) {

    }
}




