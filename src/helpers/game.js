export const COMPUTER_PLAYER_KEY = 'o';

export const WINNING_COMBINATIONS = [
    // Horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Verticals
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];

export function getPlayersKeys() {
    return ['x', 'o'];
}

export function getPlayerKeyByIndex(index) {
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

function getPlayerIndexesFromBoard(board = [], player) {
    let playerIndexes = [];

    board.forEach((item, index) => {
        if (item === player) {
            playerIndexes.push(index);
        }
    });

    return playerIndexes;
}

export function getBestBoardIndex(board = [], player) {
    // @TODO This is only temporary random position

    const playersKeys = getPlayersKeys();
    let emptyIndexes = [];

    board.forEach((item, index) => {
        if (playersKeys.indexOf(item) === -1) {
            emptyIndexes.push(index);
        }
    });

    const emptyIndex = Math.floor(Math.random() * 100) % emptyIndexes.length;
    return emptyIndexes[emptyIndex];
}

export function isWinnerPlayer(board = [], player) {
    const combinations = WINNING_COMBINATIONS;
    const playerIndexes = getPlayerIndexesFromBoard(board, player);

    return combinations.some(
        combination => combination.every(item => playerIndexes.indexOf(item) !== -1)
    );
}

export function isGameEnd(board = []) {
    const playersKeys = getPlayersKeys();

    return board.every(item => playersKeys.indexOf(item) !== -1);
}
