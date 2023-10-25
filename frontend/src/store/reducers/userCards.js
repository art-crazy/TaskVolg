const initialState = null;

const userCardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_CARDS':
            return action.payload
        default:
            return state;
    }
};

export {userCardsReducer};