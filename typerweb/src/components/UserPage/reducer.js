const initState =
{
    username: null,
    email: null
};

const userPageState = (state = initState, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email
            };
        default:
            return state;
    };
}


export default userPageState;