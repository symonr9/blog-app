import {
    LOGIN_USER,
    LOGOUT_USER
} from './actions';

function usernameReducer(state = null, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.username;
        case LOGOUT_USER:
            return null;
        default:
            return state;
    }
};

function userTokenReducer(state = null, action) {
  switch (action.type) {
      case LOGIN_USER:
          return action.userToken;
      case LOGOUT_USER:
          return null;
      default:
          return state;
  }
};

export default function rootReducer(state = {}, action) {
    return {
      username: usernameReducer(state.username, action),
      userToken: userTokenReducer(state.userToken, action)
    };
  }