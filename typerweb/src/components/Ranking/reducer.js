const initialState = {
  usersPoints: [],
};

const rankingState = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POINTS':
      return {
        ...state,
        usersPoints: action.payload,
      };
    default:
      return state;
  }
};

export default rankingState;
