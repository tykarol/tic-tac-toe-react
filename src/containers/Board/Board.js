import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
    BOARD_EMPTY_VALUE,
    PLAYER_EMPTY_VALUE,
    clearPlayer,
    clearBoard,
    blockBoard,
    unblockBoard,
    setBoard,
    setPlayer,
    gameWinPlayer,
    gameTies
} from 'actions/game';

import {
    COMPUTER_PLAYER_KEY,
    getRandomPlayerKey,
    getNextPlayerKey,
    getBestBoardIndex,
    isWinnerPlayer,
    isGameEnd
} from 'helpers/game';

const styles = {
    board: {
        display: 'inline-block',
        position: 'relative'
    },
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
    },
    resetButton: {
        display: 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        width: '100%',
        padding: 0,
        margin: 0,
        border: 'none',
        background: 'rgba(255, 255, 255, 0.65)',
        textAlign: 'center',
        color: '#000000',
        fontSize: '25px',
        textTransform: 'uppercase',
        lineHeight: '300px',
        cursor: 'pointer'
    }
};

class Board extends Component {
    static propTypes = {
        clearPlayer: PropTypes.func.isRequired,
        clearBoard: PropTypes.func.isRequired,
        blockBoard: PropTypes.func.isRequired,
        unblockBoard: PropTypes.func.isRequired,
        setBoard: PropTypes.func.isRequired,
        setPlayer: PropTypes.func.isRequired,
        gameWinPlayer: PropTypes.func.isRequired,
        gameTies: PropTypes.func.isRequired,
        game: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleComputerItemClick = this.handleComputerItemClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);

        this.state = {
            newGameButton: true
        };
    }

    componentWillUnmount() {
        this.props.clearPlayer();
        this.props.clearBoard();
        this.props.blockBoard();
        this.setState({ newGameButton: true });
    }

    onItemChange(index) {
        const { game } = this.props;

        if (game.player === PLAYER_EMPTY_VALUE) {
            return;
        }

        if (game.board[index] !== BOARD_EMPTY_VALUE) {
            return;
        }

        this.props.setBoard(game.player, index);

        // @TODO Fix this - without this no correct (updated) board data
        setTimeout(() => {
            this.checkForGameEnd();

            const newPlayer = getNextPlayerKey(game.player);
            this.props.setPlayer(newPlayer);

            if (newPlayer === COMPUTER_PLAYER_KEY) {
                this.handleComputerItemClick();
            }
        });
    }

    onReset() {
        const currentPlayerKey = this.props.game.player;
        const playerNotSet = currentPlayerKey === PLAYER_EMPTY_VALUE;
        const newPlayer = playerNotSet ? getRandomPlayerKey() : currentPlayerKey;

        this.props.clearBoard();
        this.setState({ newGameButton: false });

        // @TODO Fix this - without this no correct (updated) board data
        setTimeout(() => {
            this.props.setPlayer(newPlayer);
            this.props.unblockBoard();

            if (newPlayer === COMPUTER_PLAYER_KEY) {
                this.handleComputerItemClick();
            }
        });
    }

    checkForGameEnd() {
        const { player, board } = this.props.game;

        if (isWinnerPlayer(board, player)) {
            this.props.gameWinPlayer(player);
            this.props.blockBoard();
            this.setState({ newGameButton: true });
        } else if (isGameEnd(board)) {
            this.props.gameTies();
            this.props.blockBoard();
            this.setState({ newGameButton: true });
        }
    }

    handleComputerItemClick() {
        const { game } = this.props;
        const index = getBestBoardIndex(game.board, game.player);

        if (game.boardBlocked === true) {
            return;
        }

        if (game.player !== COMPUTER_PLAYER_KEY) {
            return;
        }

        // Simulate some delay for better effect
        this.props.blockBoard();

        setTimeout(() => {
            this.onItemChange(index);
            this.props.unblockBoard();
        }, 500);
    }

    handleItemClick(event) {
        const { game } = this.props;
        const index = parseInt(event.currentTarget.dataset.index, 10);

        if (game.boardBlocked === true) {
            return;
        }

        if (game.player === COMPUTER_PLAYER_KEY) {
            return;
        }

        this.onItemChange(index);
    }

    handleResetClick() {
        this.onReset();
    }

    render() {
        const { game } = this.props;
        const resetButtonStyles = {
            ...styles.resetButton,
            display: this.state.newGameButton ? 'block' : 'none'
        };

        return (<div style={styles.board}>
                <button type="button" onClick={this.handleResetClick} style={resetButtonStyles}>
                    Start new game
                </button>
                <ul style={styles.list}>
                    {game.board.map((item, index) => {
                        const isClickable
                            = game.boardBlocked !== true
                            && item === BOARD_EMPTY_VALUE;
                        const itemStyles = {
                            ...styles.item,
                            cursor: isClickable ? 'pointer' : 'default'
                        };

                        return (
                            <li
                                key={index}
                                data-index={index}
                                onClick={isClickable ? this.handleItemClick : null}
                                style={itemStyles}
                            >
                                {item}
                            </li>
                        );
                    })}
                </ul>
            </div>);
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
        clearPlayer,
        clearBoard,
        blockBoard,
        unblockBoard,
        setBoard,
        setPlayer,
        gameWinPlayer,
        gameTies
    }
)(Board);
