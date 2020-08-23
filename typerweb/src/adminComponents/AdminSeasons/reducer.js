const initState ={
    
}


const adminSeasonState = (state=initState, action) =>
{
    switch (action.type) {
        case "SAVE_SEASON":
            return {
                ...state,
                editedSeason:{}
            };
        case "SET_SEASONS":
            return {
                ...state,
                seasons:action.payload
            };
        case "EDIT_SEASON":
            return{
                ...state,
                editedSeason:action.payload
            };
        case "RESET_SEASONS":
            return{
                ...state,
                editedSeason:{},
                seasons:action.payload
            }
        default:
            return state;
    }
}

export default adminSeasonState;