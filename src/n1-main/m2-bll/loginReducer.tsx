import {Dispatch} from "redux"
import {authAPI} from "../m3-dal/auth-api";

// types
type InitialStateType = {

}

type ActionsType = any

export type RequestStatusType = any


const initialState = {

} as InitialStateType


export const loginReducer = (state = initialState, action: any): any => {
    switch (action.type) {

        default:
            return state
    }
}


// actions



// thunks
export const loginTC = () => async (dispatch: Dispatch<any>) => {


};

export const logoutTC = () => async (dispatch: Dispatch<any>) => {

}




