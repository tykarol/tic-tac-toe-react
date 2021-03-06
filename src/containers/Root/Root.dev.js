import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from 'containers/DevTools/DevTools';
import App from 'containers/App/App';

export default class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div>
                    <App />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}
