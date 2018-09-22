import {
  FETCH_REALMS_SUCCESS,
  FETCH_REALMS_ERROR
} from '../actions/realms';

const initialState = {
  data: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_REALMS_SUCCESS) {
    return Object.assign({}, state, {
      data: action.data,
      error: null
    });
  } else if (action.type === FETCH_REALMS_ERROR) {
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
