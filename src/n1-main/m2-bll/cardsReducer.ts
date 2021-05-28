const initialState = {
    cards: [],
    newCardsTitle: null,
    id: ''
}

export const cardsReducer = (state: any = initialState, action: any) => {
    switch (action.type) {

        default:
            return state
    }
}

// actions
export const setCardsAC = (cards: Array<any>) => ({type: 'SET-CARDS', cards} as const)
export const addCardAC = (newCardTitle: string) => ({type: 'ADD-CARD', newCardTitle} as const)
export const deleteCardAC = (id: string) => ({type: 'DELETE-CARD', id} as const)


// thunks
export const getCardsTC = (packId: string) => {

}
export const addCardTC = (question: string, answer: string) => {

}


// types
