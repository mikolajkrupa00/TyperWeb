import { localStorageService } from '../../services/localStorageService';

const initialState = {};

const layoutState = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      localStorageService.token = action.payload.token;
      localStorageService.username = action.payload.username;
      localStorageService.role = action.payload.role;
      localStorageService.userId = action.payload.userId;
      return { ...state };
    case 'LOG_OUT':
      localStorageService.token = '';
      localStorageService.username = '';
      localStorageService.role = '';
      localStorageService.userId = '';
      return { ...state };
    default:
      return state;
  }
};

export default layoutState;
