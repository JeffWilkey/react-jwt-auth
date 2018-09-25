import {
  FETCH_CHARACTER_DETAIL_SUCCESS,
  FETCH_CHARACTER_DETAIL_ERROR,
} from '../actions/character-detail';

const initialState = {
  data: [],
  error: null
};


export default function reducer(state = initialState, action) {
  if (action.type === FETCH_CHARACTER_DETAIL_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === FETCH_CHARACTER_DETAIL_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
