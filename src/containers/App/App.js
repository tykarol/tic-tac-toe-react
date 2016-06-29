import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Board from 'containers/Board/Board';

const styles = {
    wrapper: {
        margin: '30px auto',
        width: '500px'
    }
};

class App extends Component {
    render() {
        return (
            <div style={styles.wrapper}>
                <Board />
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
