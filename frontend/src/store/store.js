import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {userCardsReducer} from "./reducers/userCards";

const rootReducer = combineReducers({
    userCards: userCardsReducer,
});

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;