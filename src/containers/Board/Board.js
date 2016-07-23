import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    BOARD_EMPTY_VALUE,
    clearBoard,
    blockBoard,
    unblockBoard,
    setBoard,
    setPlayer
} from 'actions/game';

import { getRandomPlayerKey, getNextPlayerKey } from 'helpers/game';

const styles = {
    board: {},
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '300px',
        margin: 0,
        padding: 0,
        boxSizing: 'content-box',
        borderTop: '1px solid #ddd',
        borderLeft: '1px solid #ddd'
    },
    item: {
        flex: '0 1 100px',
        height: '100px',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        borderBottom: '1px solid #ddd',
        borderRight: '1px solid #ddd',
        fontSize: '70px',
        lineHeight: '100px',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Arial, Helvetica, sans-serif'
    }
};

class Board extends Component {
    static propTypes = {
        clearBoard: PropTypes.func.isRequired,
        blockBoard: PropTypes.func.isRequired,
        unblockBoard: PropTypes.func.isRequired,
        setBoard: PropTypes.func.isRequired,
        setPlayer: PropTypes.func.isRequired,
        game: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.onItemClick = this.onItemClick.bind(this);

        this.props.clearBoard();
        this.props.setPlayer(getRandomPlayerKey());
        this.props.unblockBoard();
    }

    componentWillUnmount() {
        this.props.clearBoard();
        this.props.blockBoard();
    }

    onItemClick(event) {
        const { game } = this.props;
        const index = parseInt(event.currentTarget.dataset.index, 10);

        if (game.boardBlocked === true) {
            return;
        }

        if (game.board[index] !== BOARD_EMPTY_VALUE) {
            return;
        }

        this.props.blockBoard();
        this.props.setBoard(game.player, index);
        this.props.setPlayer(getNextPlayerKey(game.player));
        this.props.unblockBoard();
    }

    render() {
        const { game } = this.props;

        return (
            <ul style={styles.list}>
                {game.board.map((item, index) => {
                    const isClickable = game.boardBlocked !== true && item === BOARD_EMPTY_VALUE;
                    const itemStyles = {
                        ...styles.item,
                        cursor: isClickable ? 'pointer' : 'default'
                    };

                    return (
                        <li
                            key={index}
                            data-index={index}
                            onClick={isClickable ? this.onItemClick : null}
                            style={itemStyles}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
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
    {
        clearBoard,
        blockBoard,
        unblockBoard,
        setBoard,
        setPlayer
    }
)(Board);
