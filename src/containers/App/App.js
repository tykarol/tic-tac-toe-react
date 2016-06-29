import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export class App extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;

        return (
            <div>
                Test
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    {}
)(App);
