import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root/Root';
import configureStore from 'stores/configureStore';

const store = configureStore();

ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root')
);
