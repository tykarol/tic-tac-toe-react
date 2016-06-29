import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { clearBoard, setBoard, setPlayer } from 'actions/game';

const styles = {
    board: {},
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '300px',
        margin: '0',
        padding: '0',
        boxSizing: 'content-box',
        borderTop: '1px solid #ddd',
        borderLeft: '1px solid #ddd'
    },
    item: {
        flex: '0 1 100px',
        height: '100px',
        listStyle: 'none',
        margin: '0',
        padding: '0',
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
        setBoard: PropTypes.func.isRequired,
        setPlayer: PropTypes.func.isRequired,
        game: PropTypes.object.isRequired
    };

    // constructor(props) {
    //     super(props);
    // }
    
    getPlayer() {
        const players = ['x', 'o'];
        const player = this.props.game.player;

        if (!player) {
            return players[0];
        } else {
            const index = players.indexOf(player);
            return players[(index + 1) % 2];
        }
    }

    onItemClick(index) {
        if (this.props.game.board[index] !== null) {
            return;
        }

        const player = this.getPlayer();
        this.props.setPlayer(player);
        this.props.setBoard(player, index);
    }

    render() {
        const { game } = this.props;

        return (
            <div>
                Board
                <ul style={styles.list}>
                {game.board.map((item, index) => {
                    const itemStyles = {
                        ...styles.item,
                        cursor: (item === null) ? 'pointer' : 'default'
                    };
                    return (<li key={index} onClick={this.onItemClick.bind(this, index)} style={itemStyles}>{item}</li>);
                })}
                </ul>
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
    {
        clearBoard,
        setBoard,
        setPlayer
    }
)(Board);
