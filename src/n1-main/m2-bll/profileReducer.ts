import {Dispatch} from "redux";
import {ResponceLoginType} from "../m3-dal/auth-api";
import {setIsLoggedInAC} from "./loginReducer";


const initialState: ResponceLoginType = {
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
type ActionsType = ReturnType<typeof setProfileDataAC>
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

        default:
            return {...state}
    }
}

export const setProfileDataAC = (data: ResponceLoginType) => ({type: 'login/SET-PROFILE-DATA', data} as const)



