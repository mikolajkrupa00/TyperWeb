const initState ={
    seasons:[],
    gameweeks:null,
    matches:null,
    editedGameweeks:null,
    editedSeason:"",
    editedGameweek:null
}


const editPanelState = (state=initState, action) =>
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
                editedSeason:"",
                seasons:action.payload
            }
        case "SET_GAMEWEEKS":
            return{
                ...state,
                gameweeks:action.payload.gameweeks,
                editedGameweeks:action.payload.seasonId
            }
        case "BACK_GAMEWEEKS":
            return{
                ...state,
                gameweeks:null,
                editedGameweeks:null
            }
            case "EDIT_GAMEWEEK":
                return{
                    ...state,
                    editedGameweek:action.payload
                }
            case "RESET_GAMEWEEKS":
                return{
                    ...state,
                    gameweeks:action.payload,
                    editedGameweek:null
                }
        default:
            return state;
    }
}

export default editPanelState;