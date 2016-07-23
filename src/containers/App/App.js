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
    static propTypes = {
        game: PropTypes.object.isRequired
    };

    render() {
        const { game } = this.props;
        const { score } = game;

        return (
            <div style={styles.wrapper}>
                <Board />
                <div>
                    <div>Player (x): {score.x}</div>
                    <div>Ties: {score.ties}</div>
                    <div>Computer (o): {score.o}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        game: state.game
    };
}

export default connect(
    mapStateToProps,
    {}
)(App);
