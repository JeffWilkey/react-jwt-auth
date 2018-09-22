import {
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR
} from '../actions/characters';

const initialState = {
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
  }
  return state;
}
