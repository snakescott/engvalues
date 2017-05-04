const CARD_TEXTS = require('./values.json')
// Update once DefinitelyTyped includes uuid 3.0.1
const uuid = require('uuid');
import { combineReducers, createStore } from 'redux';


/*
Actions:

MARK_CARD
ADVANCE_STAGE

*/

const card = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      if (action.key === state.key) {
        let mark = state.mark ? false : 'selected';
        return { ...state, mark };
      } else {
        return state;
      }
    case 'MARK_CARD':
      if (action.key === state.key) {
        return { ...state, mark: action.mark };
      } else {
        return state;
      }
    case 'ADVANCE_STAGE':
      if (state.mark !== 'accepted') {
        return { ...state, discard: action.stage };
      } else {
        return state;
      }
    default:
      return state;
  }
};

const initialCards = CARD_TEXTS.map((text: any) => ({
  key: uuid.v4(),
  text,
  mark: false,
  discard: false
}));

const cards = (state: any = initialCards, action: any) => {
  switch (action.type) {
    case 'MARK_CARD':
    case 'TOGGLE_CARD':
      return state.map((c: any) => card(c, action));
    default:
      return state;
  }
};

const stage = (state: any = 1, action: any) => {
  switch (action.type) {
    case 'ADVANCE_STAGE':
      return state + 1;
    default:
      return state;
  }
};

const app = combineReducers({
  cards,
  stage
});

export const store = createStore(app);
