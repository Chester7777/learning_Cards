import {Dispatch} from "redux";


type InitialStateType = {

}
export type LoadingStatusType = any


const initialState = {

} as InitialStateType

export const registerReducer = (state = initialState, action: any): any => {
    switch (action.type) {

        default:
            return state
    }
}

// actions



// thunks

export const SendRegisterTC = () => (dispatch: Dispatch<any>) => {

}


// types

type ActionsType = any

// type ThunkDispatch = Dispatch<any>