import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import charactersReducer from './reducers/characters';
import realmsReducer from './reducers/realms';
import characterClassesReducer from './reducers/character-classes';
import characterRacesReducer from './reducers/character-races';
import characterDetailReducer from './reducers/character-detail';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        characters: charactersReducer,
        character: characterDetailReducer,
        realms: realmsReducer,
        classes: characterClassesReducer,
        races: characterRacesReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
