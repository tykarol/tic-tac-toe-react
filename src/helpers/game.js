export function getPlayersKeys() {
    return ['x', 'o'];
}

function getPlayerKeyByIndex(index) {
    const players = getPlayersKeys();
    return players[index];
}

export function getRandomPlayerKey() {
    const index = Math.floor(Math.random() * 100) % 2;
    return getPlayerKeyByIndex(index);
}

export function getNextPlayerKey(currentPlayerKey) {
    const players = getPlayersKeys();
    const index = (players.indexOf(currentPlayerKey) + 1) % 2;
    return getPlayerKeyByIndex(index);
}
