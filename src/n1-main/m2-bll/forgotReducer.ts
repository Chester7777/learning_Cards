const initialState: any = {
    status: 'idle',
    error: null,
    isInitialized: true,
    forgotPassword: false,
}

//Reducer
export const forgotReducer = (state = initialState, action: any): any => {
    switch (action.type) {

        default:
            return state
    }
}

// actions




// thunks
export const forgotPasswordTC = (email: string) => {

}


export const authMeTC =()=>(dispatch: any)=>{

}



// types
type ActionsType = any


