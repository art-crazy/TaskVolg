const actionGetUserCards = (response) => ({
    type: 'GET_USER_CARDS',
    payload: response
});

export {
    actionGetUserCards,
}