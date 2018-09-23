import {BLIZZARD_API_BASE_URL, BLIZZARD_API_KEY} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_RACES_SUCCESS = 'FETCH_RACES_SUCCESS';
export const fetchRacesSuccess = data => ({
  type: FETCH_RACES_SUCCESS,
  data
});

export const FETCH_RACES_ERROR = 'FETCH_RACES_ERROR';
export const fetchRacesError = data => ({
  type: FETCH_RACES_ERROR,
  data
});

export const fetchRaces = () => (dispatch) => {
  return fetch(`${BLIZZARD_API_BASE_URL}/wow/data/character/races?locale=en_US&apikey=${BLIZZARD_API_KEY}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({races}) => dispatch(fetchRacesSuccess(races)))
    .catch(err => {
      dispatch(fetchRacesError(err));
    });
}
