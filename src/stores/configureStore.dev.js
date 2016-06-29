import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

import DevTools from 'containers/DevTools/DevTools';
import rootReducer from 'reducers';

export default function configureStore() {
    const store = compose(
        applyMiddleware(createLogger()),
        DevTools.instrument()
    )(createStore)(rootReducer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers', () => {
            const nextRootReducer = require('reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
