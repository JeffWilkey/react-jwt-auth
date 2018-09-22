import {BLIZZARD_API_BASE_URL, BLIZZARD_API_KEY} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_REALMS_SUCCESS = 'FETCH_REALMS_SUCCESS';
export const fetchRealmsSuccess = data => ({
  type: FETCH_REALMS_SUCCESS,
  data
});

export const FETCH_REALMS_ERROR = 'FETCH_REALMS_ERROR';
export const fetchRealmsError = data => ({
  type: FETCH_REALMS_ERROR,
  data
});

export const fetchRealms = () => (dispatch) => {
  return fetch(`${BLIZZARD_API_BASE_URL}/wow/realm/status?locale=en_US&apikey=${BLIZZARD_API_KEY}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({realms}) => dispatch(fetchRealmsSuccess(realms)))
    .catch(err => {
      dispatch(fetchRealmsError(err));
    });
}
