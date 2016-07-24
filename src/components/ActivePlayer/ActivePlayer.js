import React, { Component, PropTypes } from 'react';

const styles = {
    playerInfo: {
        margin: '20px 0'
    }
};


export default class ActivePlayer extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        info: PropTypes.string.isRequired
    };

    render() {
        const { show, info } = this.props;

        const playerInfoStyles = {
            ...styles.playerInfo,
            display: show ? 'block' : 'none'
        };

        return (
            <div style={playerInfoStyles}>Current player: {info}</div>
        );
    }
}
