import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const fetchCharactersSuccess = data => ({
  type: FETCH_CHARACTERS_SUCCESS,
  data
});

export const FETCH_CHARACTERS_ERROR = 'FETCH_CHARACTERS_ERROR';
export const fetchCharactersError = error => ({
    type: FETCH_CHARACTERS_ERROR,
    error
});

export const fetchCharacters = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/characters`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({data}) => dispatch(fetchCharactersSuccess(data)))
    .catch(err => {
      dispatch(fetchCharactersError(err));
    });
}
