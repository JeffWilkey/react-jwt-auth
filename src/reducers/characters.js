import {
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR,
  ADD_CHARACTER_SUCCESS,
  ADD_CHARACTER_ERROR,
  DELETE_CHARACTER_SUCCESS,
  DELETE_CHARACTER_ERROR,
} from '../actions/characters';
import _ from 'lodash';

const initialState = {
  addedCharacter: {},
  addCharacterError: null,
  data: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_CHARACTERS_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === FETCH_CHARACTERS_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  } else if (action.type === ADD_CHARACTER_SUCCESS) {
    return Object.assign({}, state, {
      addedCharacter: action.data,
      addCharacterError: null
    });
  } else if (action.type === ADD_CHARACTER_ERROR) {
    return Object.assign({}, state, {
      addCharacterError: action.error
    });
  } else if (action.type === DELETE_CHARACTER_SUCCESS) {

    return Object.assign({}, state, {
      data: _.filter(state.data, function(character) {
        return character.id !== action.data;
      }),
      error: null
    });
  } else if (action.type === DELETE_CHARACTER_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
