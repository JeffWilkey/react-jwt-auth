import {BLIZZARD_API_BASE_URL, BLIZZARD_API_KEY} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_CLASSES_SUCCESS = 'FETCH_CLASSES_SUCCESS';
export const fetchClassesSuccess = data => ({
  type: FETCH_CLASSES_SUCCESS,
  data
});

export const FETCH_CLASSES_ERROR = 'FETCH_CLASSES_ERROR';
export const fetchClassesError = data => ({
  type: FETCH_CLASSES_ERROR,
  data
});

export const fetchClasses = () => (dispatch) => {
  return fetch(`${BLIZZARD_API_BASE_URL}/wow/data/character/classes?locale=en_US&apikey=${BLIZZARD_API_KEY}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({classes}) => dispatch(fetchClassesSuccess(classes)))
    .catch(err => {
      dispatch(fetchClassesError(err));
    });
}
