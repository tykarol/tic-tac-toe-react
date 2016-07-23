import {
    BOARD_EMPTY_VALUE,
    PLAYER_EMPTY_VALUE,
    GAME_WIN_X,
    GAME_WIN_O,
    GAME_TIES,
    CLEAR_SCORES,
    SET_PLAYER,
    CLEAR_PLAYER,
    CLEAR_BOARD,
    SET_BOARD,
    BLOCK_BOARD,
    UNBLOCK_BOARD
} from 'actions/game';

const initialState = {
    player: PLAYER_EMPTY_VALUE,
    score: {
        x: 0,
        o: 0,
        ties: 0
    },
    boardBlocked: true,
    board: [
        BOARD_EMPTY_VALUE, BOARD_EMPTY_VALUE, BOARD_EMPTY_VALUE,
        BOARD_EMPTY_VALUE, BOARD_EMPTY_VALUE, BOARD_EMPTY_VALUE,
        BOARD_EMPTY_VALUE, BOARD_EMPTY_VALUE, BOARD_EMPTY_VALUE
    ]
};

function score(state = initialState.score, action) {
    switch (action.type) {
        case GAME_WIN_X: {
            return {
                ...state,
                x: state.x + 1
            };
        }
        case GAME_WIN_O: {
            return {
                ...state,
                o: state.o + 1
            };
        }
        case GAME_TIES: {
            return {
                ...state,
                ties: state.ties + 1
            };
        }
        case CLEAR_SCORES: {
            return initialState.score;
        }
        default:
            return state;
    }
}

function board(state = initialState.board, action) {
    switch (action.type) {
        case CLEAR_BOARD: {
            return initialState.board;
        }
        case SET_BOARD: {
            return [
                ...state.slice(0, action.index),
                action.player,
                ...state.slice(action.index + 1)
            ];
        }
        default:
            return state;
    }
}

function game(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYER: {
            return {
                ...state,
                player: action.player
            };
        }
        case CLEAR_PLAYER: {
            return {
                ...state,
                player: initialState.player
            };
        }
        case BLOCK_BOARD: {
            return {
                ...state,
                boardBlocked: true
            };
        }
        case UNBLOCK_BOARD: {
            return {
                ...state,
                boardBlocked: false
            };
        }
        default:
            return {
                ...state,
                board: board(state.board, action),
                score: score(state.stats, action)
            };
    }
}

export default game;
