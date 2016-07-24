import React, { Component, PropTypes } from 'react';

const styles = {
    statsItem: {
        flex: '1 1 auto'
    }
};


export default class StatsItem extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
    };

    render() {
        const { name, value } = this.props;

        return (
            <div style={styles.statsItem}>{name}: {value}</div>
        );
    }
}
