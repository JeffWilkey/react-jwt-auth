import {
  FETCH_RACES_SUCCESS,
  FETCH_RACES_ERROR
} from '../actions/character-races';

const initialState = {
  data: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_RACES_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === FETCH_RACES_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
