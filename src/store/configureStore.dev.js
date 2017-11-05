import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/root';

let store;
export default initialState => {
    if (store) {
        return store;
    }
    const createdStore = createStore(
        rootReducer,
        typeof window !== 'undefined' ? window.__INITIAL_STATE__ : initialState,
        compose(
            applyMiddleware(thunk, logger),
            typeof window !== 'undefined' && window.devToolsExtension
                ? window.devToolsExtension()
                : f => f
        )
    );
    store = createdStore;
    return store;
};
