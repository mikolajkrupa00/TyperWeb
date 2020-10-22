const initialState = {
  gameweeks: [],
  matches: [],
};

const typerState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GAMEWEEKS':
      return {
        ...state,
        gameweeks: action.payload,
      };
    case 'SET_MATCHES':
      return {
        ...state,
        matches: action.payload,
      };
    case 'BACK_MATCHES':
      return {
        ...state,
        matches: [],
      };
    default:
      return state;
  }
};

export default typerState;
