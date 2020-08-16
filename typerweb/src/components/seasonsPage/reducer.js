//SET_SEASONS
//ADD_SEASON
const initialState =
{
    seasons: []
}

const seasonState =(state=initialState, action) =>
{
    switch (action.type) {
        case "SET_SEASONS":
            return {
                ...state,
                seasons: action.payload
            };
        case "ADD_SEASON":
            return {
                ...state,
                seasons: state.seasons.push(action.payload.data)
            };
            
        default:
                return state;
    }
}

export default seasonState;