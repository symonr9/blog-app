import { createStore } from 'redux';
import rootReducer from './reducer';

import { loadState, saveState } from "../localStorage";

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    saveState({
        userToken: store.getState().userToken,
        username: store.getState().username
    });
})


export default store;
