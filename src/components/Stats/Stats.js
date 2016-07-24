import React, { Component, PropTypes } from 'react';
import StatsItem from 'components/Stats/StatsItem';

const styles = {
    stats: {
        display: 'flex',
        margin: '20px 0',

    }
};

export default class Stats extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    };

    render() {
        const { items } = this.props;

        return (
            <div style={styles.stats}>
                {items.map((item, index) => (
                    <StatsItem key={index} name={item.name} value={item.value} />
                ))}
            </div>
        );
    }
}
