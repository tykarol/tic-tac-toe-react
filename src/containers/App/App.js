import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Board from 'containers/Board/Board';
import Stats from 'components/Stats/Stats';
import ActivePlayer from 'components/ActivePlayer/ActivePlayer';

import {
    PLAYER_EMPTY_VALUE
} from 'actions/game';

const styles = {
    wrapper: {
        margin: '30px auto',
        width: '500px',
        textAlign: 'center'
    },
    playerInfo: {
        margin: '20px 0'
    }
};

class App extends Component {
    static propTypes = {
        game: PropTypes.object.isRequired
    };

    render() {
        const { game } = this.props;
        const { player, names, score } = game;
        const showCurrentPlayerInfo = player !== PLAYER_EMPTY_VALUE;
        const statsItems = [
            { name: `${names.x} (x)`, value: score.x },
            { name: 'Ties', value: score.ties },
            { name: `${names.o} (o)`, value: score.o }
        ];

        return (
            <div style={styles.wrapper}>
                <Board />
                <ActivePlayer show={showCurrentPlayerInfo} info={`${names[player]} (${player})`} />
                <Stats items={statsItems} />
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
