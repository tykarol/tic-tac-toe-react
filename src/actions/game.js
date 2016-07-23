export const GAME_WIN_X = 'GAME_WIN_X';
export const GAME_WIN_O = 'GAME_WIN_O';
export const GAME_TIES = 'GAME_TIES';

export function gameWinPlayerX() {
    return {
        type: GAME_WIN_X
    };
}

export function gameWinPlayerO() {
    return {
        type: GAME_WIN_O
    };
}

export function gameTies() {
    return {
        type: GAME_TIES
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
