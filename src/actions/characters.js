import {API_BASE_URL, BLIZZARD_API_BASE_URL, BLIZZARD_API_KEY} from '../config';
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

export const ADD_CHARACTER_SUCCESS = 'ADD_CHARACTER_SUCCESS'
export const addCharacterSuccess = data => ({
  type: ADD_CHARACTER_SUCCESS,
  data
})

export const ADD_CHARACTER_ERROR = 'ADD_CHARACTER_ERROR'
export const addCharacterError = error => ({
  type: ADD_CHARACTER_ERROR,
  error
})

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

export const addCharacter = ({name, realm}) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${BLIZZARD_API_BASE_URL}/wow/character/${realm.value}/${name}?locale=en_US&apikey=${BLIZZARD_API_KEY}`, {
    method: 'GET'
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      return fetch(`${API_BASE_URL}/characters`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          realm: realm.label,
          realmSlug: realm.value,
          class: res.class,
          race: res.race,
          faction: res.faction
        })
      })
      .then(res => res.json())
      .then(({data}) => dispatch(addCharacterSuccess(data)))
      .catch(err => {
        dispatch(addCharacterError(err));
      });
    })
    .catch(err => {
      dispatch(addCharacterError(err));
    })

}
