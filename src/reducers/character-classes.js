import {
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_ERROR
} from '../actions/character-classes';

const initialState = {
  data: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_CLASSES_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === FETCH_CLASSES_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
