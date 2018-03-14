import todoReducer from './reducers/reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = createStore(
    todoReducer,
    {},
    applyMiddleware(thunk)
);
