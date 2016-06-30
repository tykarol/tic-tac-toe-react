import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { clearBoard, setBoard, setPlayer } from 'actions/game';

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
        setBoard: PropTypes.func.isRequired,
        setPlayer: PropTypes.func.isRequired,
        game: PropTypes.object.isRequired
    };
    
    componentDidMount() {
        const players = ['x', 'o'];
        const index = Math.floor( Math.random()*100 ) % 2;
        const player = players[index];

        this.props.setPlayer(player);
    }

    getPlayer() {
        const players = ['x', 'o'];
        const player = this.props.game.player;
        const index = (players.indexOf(player) + 1) % 2;

        return players[index];
    }

    onItemClick(index) {
        if (this.props.game.board[index] !== null) {
            return;
        }

        const player = this.props.game.player;

        this.props.setBoard(player, index);
        this.props.setPlayer(this.getPlayer());
    }

    render() {
        const { game } = this.props;

        return (
            <ul style={styles.list}>
                {game.board.map((item, index) => {
                    const itemStyles = {
                        ...styles.item,
                        cursor: (item === null) ? 'pointer' : 'default'
                    };
                    const onItemClick = (item === null) ? this.onItemClick.bind(this, index) : '';

                    return (<li key={index} onClick={onItemClick} style={itemStyles}>{item}</li>);
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
        setBoard,
        setPlayer
    }
)(Board);
