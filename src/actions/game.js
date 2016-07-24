export const PLAYER_EMPTY_VALUE = null;
export const BOARD_EMPTY_VALUE = null;

export const GAME_WIN = 'GAME_WIN';
export const GAME_TIES = 'GAME_TIES';

export function gameWinPlayer(player) {
    return {
        type: GAME_WIN,
        player
    };
}

export function gameTies() {
    return {
        type: GAME_TIES
    };
}

export const CLEAR_SCORES = 'CLEAR_SCORES';

export function clearScores() {
    return {
        type: CLEAR_SCORES
    };
}

export const SET_PLAYER = 'SET_PLAYER';
export const CLEAR_PLAYER = 'CLEAR_PLAYER';

export function setPlayer(player) {
    return {
        type: SET_PLAYER,
        player
    };
}

export function clearPlayer() {
    return {
        type: CLEAR_PLAYER
    };
}

export const SET_BOARD = 'SET_BOARD';
export const CLEAR_BOARD = 'CLEAR_BOARD';

export function setBoard(player, index) {
    return {
        type: SET_BOARD,
        player,
        index
    };
}

export function clearBoard() {
    return {
        type: CLEAR_BOARD
    };
}

export const BLOCK_BOARD = 'BLOCK_BOARD';
export const UNBLOCK_BOARD = 'UNBLOCK_BOARD';

export function blockBoard() {
    return {
        type: BLOCK_BOARD
    };
}

export function unblockBoard() {
    return {
        type: UNBLOCK_BOARD
    };
}
