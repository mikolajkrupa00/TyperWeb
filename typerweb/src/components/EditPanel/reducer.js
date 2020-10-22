const initState = {
  seasons: null,
  gameweeks: null,
  matches: null,
  teams: null,
};

const editPanelState = (state = initState, action) => {
  switch (action.type) {
    case 'SET_ADMIN_SEASONS':
      return {
        ...state,
        seasons: action.payload,
      };
    case 'EDIT_SEASON':
      return {
        ...state,
        seasons: state.seasons.map((x) =>
          x.seasonId === action.payload.seasonId
            ? { ...action.payload, isEdited: false, isExpanded: false }
            : { ...x, isEdited: false, isExpanded: false }
        ),
      };
    case 'ADD_SEASON':
      return {
        ...state,
        seasons: state.seasons.map((x) => ({ ...x, isEdited: false })).concat({ ...action.payload, isEdited: false }),
      };
    case 'DELETE_SEASON':
      return {
        ...state,
        seasons: state.seasons.filter((x) => x.seasonId !== action.payload),
      };
    case 'SET_SEASON_EDIT_INPUT':
      return {
        ...state,
        seasons: state.seasons.map((x) => ({ ...x, isEdited: x.seasonId === action.payload, isExpanded: false })),
      };
    case 'SET_GAMEWEEK_EDIT_INPUT':
      return {
        ...state,
        seasons: state.seasons,
        gameweeks: state.gameweeks.map((x) => ({ ...x, isEdited: x.gameweekId === action.payload })),
      };
    case 'EDIT_GAMEWEEK':
      return {
        ...state,
        gameweeks: state.gameweeks.map((x) => (x.gameweekId === action.payload.gameweekId ? action.payload : { ...x })),
      };
    case 'DELETE_GAMEWEEK':
      return {
        ...state,
        gameweeks: state.gameweeks.filter((x) => x.gameweekId !== action.payload),
      };
    case 'ADD_GAMEWEEK':
      return {
        ...state,
        gameweeks: state.gameweeks.map((x) => ({ ...x, isEdited: false })).concat({ ...action.payload, isEdited: false }),
      };
    case 'SET_ADMIN_GAMEWEEKS':
      return {
        ...state,
        gameweeks: action.payload.gameweeks.map((x) => ({ ...x, isEdited: false })),
        seasons: state.seasons.map((x) =>
          x.seasonId === action.payload.seasonId
            ? { ...x, isExpanded: true, isEdited: false }
            : { ...x, isExpanded: false, isEdited: false }
        ),
      };
    case 'BACK_GAMEWEEKS':
      return {
        ...state,
        seasons: state.seasons.map((x) => ({ ...x, isExpanded: false, isEdited: false })),
        gameweeks: [],
      };
    case 'SET_ADMIN_TEAMS':
      return {
        ...state,
        teams: action.payload,
      };
    case 'ADD_TEAM':
      return {
        ...state,
        teams: state.teams.concat(action.payload),
      };
    case 'DELETE_TEAM':
      return {
        ...state,
        teams: state.teams.filter((x) => x.teamId !== action.payload),
      };
    case 'SET_ADMIN_MATCHES':
      return {
        ...state,
        matches: action.payload,
      };
    case 'ADD_MATCH':
      return {
        ...state,
        matches: state.matches.map((x) => ({ ...x, isEdited: false })).concat(action.payload),
      };
    case 'EDIT_MATCH':
      return {
        ...state,
        matches: state.matches.map((x) =>
          x.matchId === action.payload.matchId
            ? { ...x, homeTeamGoals: action.payload.homeTeamGoals, awayTeamGoals: action.payload.awayTeamGoals, isEdited: false }
            : { ...x, isEdited: false }
        ),
      };
    case 'DELETE_MATCH':
      return {
        ...state,
        matches: state.matches.filter((x) => x.matchId !== action.payload),
      };
    case 'SET_EDIT_MATCH_INPUT':
      return {
        ...state,
        matches: state.matches.map((x) => (x.matchId === action.payload ? { ...x, isEdited: true } : { ...x, isEdited: false })),
      };
    default:
      return state;
  }
};

export default editPanelState;
