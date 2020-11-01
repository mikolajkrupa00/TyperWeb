const { act } = require("@testing-library/react")

const initState =
{
    stats: []
}


const statsState = (state = initState, action) => {
    switch (action.type) {
        case "SET_STATS":
            return {
                ...state,
                stats: action.payload
            }
        default:
            return state;
    }
}

export default statsState;
