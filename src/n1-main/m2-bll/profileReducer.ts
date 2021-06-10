import {Dispatch} from "redux";
import {authAPI, LoginParamsType, ResponceLoginType} from "../m3-dal/auth-api";
import {setIsLoggedInAC} from "./loginReducer";
import {setIsInitializedAC} from "./appReducer";

type profileStateType={
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,// количество колод
    created: string,
    updated: string,
    isAdmin: boolean,
    verified: boolean, // подтвердил ли почту
    rememberMe: boolean,
    error: string
}
const initialState:profileStateType = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,// количество колод
    created: '',
    updated: '',
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: ''
}
// type stateType=ReturnType<typeof initialState>

type ActionsType = ReturnType<typeof setProfileDataAC>
    |ReturnType<typeof logOutAC>
|ReturnType<typeof setLoginErrorAC>

export const profileReducer = (state: any = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'login/SET-PROFILE-DATA': {
            return {
                ...state,_id: action.data._id,
                email: action.data.email,
                name: action.data.name,
                avatar: action.data.avatar,
                publicCardPacksCount: action.data.publicCardPacksCount,
                created: action.data.created,
                updated: action.data.updated,
                isAdmin: action.data.isAdmin,
                verified: action.data.verified, // подтвердил ли почту
                rememberMe: action.data.rememberMe,
                error: action.data.error
                            }


        }
        case "logOut":
            let newState={}
            return newState
        case "login/SET-ERROR":
            return {...state,error:action.error}
        default:
            return {...state}
    }
}

export const setProfileDataAC = (data: ResponceLoginType) => ({type: 'login/SET-PROFILE-DATA', data} as const)
export const setLoginErrorAC = (error:string) => ({type: 'login/SET-ERROR', error} as const)
export const logOutAC=()=>({type:'logOut'}as const)


