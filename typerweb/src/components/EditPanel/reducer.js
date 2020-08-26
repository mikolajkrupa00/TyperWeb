const initState = {
  seasons: null,
  gameweeks: null,
  matches: null,
  editedSeason: '',
  editedGameweek: null,
  addSeason: false,
  addGameweek: false, //isExpanded isEdited for seasons
};

const editPanelState = (state = initState, action) => {
  switch (action.type) {
    case 'SAVE_SEASON':
      return {
        ...state,
        editedSeason: {},
      };
    case 'SET_SEASONS':
      return {
        ...state,
        seasons: action.payload,
      };
    case 'EDIT_SEASON':
      return {
        ...state,
        editedSeason: action.payload,
        addSeason: false,
        editedGameweek: null,
        addGameweek: false,
      };
    case 'RESET_SEASONS':
      return {
        ...state,
        editedSeason: '',
        addSeason: false,
        seasons: action.payload,
        editedGameweek: null,
        addGameweek: false,
      };
    case 'SET_GAMEWEEKS':
      return {
        ...state,
        gameweeks: action.payload.gameweeks,
        seasons: state.seasons.map((x) => ({ ...x, isExpanded: x.seasonId === action.payload.seasonId })),
        addGameweek: false,
        addSeason: false,
        editedSeason: '',
        editedGameweek: null,
      };
    case 'BACK_GAMEWEEKS':
      return {
        ...state,
        seasons: state.seasons.map((x) => ({ ...x, isExpanded: false })),
        gameweeks: null,
        addGameweek: false,
        editedSeason: '',
        editedGameweek: null,
        addSeason: false,
      };
    case 'EDIT_GAMEWEEK':
      return {
        ...state,
        editedGameweek: action.payload,
        editedSeason: '',
        addSeason: false,
        addGameweek: false,
      };
    case 'RESET_GAMEWEEKS':
      return {
        ...state,
        gameweeks: action.payload,
        editedGameweek: null,
        editedSeason: '',
        addSeason: false,
        addGameweek: false,
      };
    case 'ADD_SEASON':
      return {
        ...state,
        addSeason: true,
        editedSeason: '',
        addGameweek: false,
        editedGameweek: null,
      };
    case 'CANCEL_ADD_SEASON':
      return {
        ...state,
        addSeason: false,
      };
    case 'ADD_GAMEWEEK':
      return {
        ...state,
        editedSeason: '',
        editedGameweek: null,
        addSeason: false,
        addGameweek: true,
      };
    default:
      return state;
  }
};

export default editPanelState;
