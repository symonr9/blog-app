import { combineReducers } from "redux";

import {
    TEST
} from './actions';

function testReducer(state = [], action) {
    switch (action.type) {
      default:
        return state;
    }
  }


export default function rootReducer(state = {}, action) {
    return {
      test: testReducer(state.test, action)
    };
  }