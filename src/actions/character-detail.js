import {BLIZZARD_API_BASE_URL, BLIZZARD_API_KEY} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CHARACTER_DETAIL_SUCCESS = 'FETCH_CHARACTER_DETAIL_SUCCESS';
export const fetchCharacterDetailSuccess = data => ({
  type: FETCH_CHARACTER_DETAIL_SUCCESS,
  data
});

export const FETCH_CHARACTER_DETAIL_ERROR = 'FETCH_CHARACTER_DETAIL_ERROR';
export const fetchCharacterDetailError = error => ({
  type: FETCH_CHARACTER_DETAIL_ERROR,
  error
});

export const fetchCharacterDetail = (name, realm) => (dispatch) => {
  return fetch(`${BLIZZARD_API_BASE_URL}/wow/character/${realm}/${name}?fields=guild+progression+hunterPets+talents+items&locale=en_US&apikey=${BLIZZARD_API_KEY}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(fetchCharacterDetailSuccess(res)))
    .catch(err => {
      dispatch(fetchCharacterDetailError(err));
    });
}
