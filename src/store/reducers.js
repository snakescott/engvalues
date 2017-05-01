import CARD_TEXTS from './values.json';
import uuid from 'uuid';
import { combineReducers } from 'redux';

/*
Actions:

MARK_CARD
ADVANCE_STAGE

*/

const card = (state = {}, action) => {
  switch (action.type) {
    case 'MARK_CARD':
      if (action.key === state.key) {
        return { ...state, mark: state.mark };
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

const initialCards = CARD_TEXTS.map(text => ({
  key: uuid.v4(),
  text,
  mark: false,
  discard: false
}));

const cards = (state = initialCards, action) => {

};

const stage = (state = 1, action) => {
  switch (action.type) {
    case 'ADVANCE_STAGE':
      return state + 1;
    default:
      return state;
  }
};

export const app = combineReducers({
  cards,
  stage
});
