import {Dispatch} from "redux";

const initialState = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: any = initialState, action: any) => {
    switch (action.type) {

        default:
            return {...state}
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {

}



