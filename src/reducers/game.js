import {
    GAME_WIN_X,
    GAME_WIN_O,
    GAME_TIES,
    SET_PLAYER,
    CLEAR_PLAYER,
    CLEAR_BOARD,
    SET_BOARD
} from 'actions/game';

const initialState = {
    player: null,
    score: {
        x: 0,
        o: 0,
        ties: 0
    },
    board: [
        null, null, null,
        null, null, null,
        null, null, null
    ]
};

function score(state = initialState.score, action) {
    switch (action.type) {
        case GAME_WIN_X: {
            return {
                ...state,
                x: state.x++
            };
        }
        case GAME_WIN_O: {
            return {
                ...state,
                o: state.o++
            };
        }
        case GAME_TIES: {
            return {
                ...state,
                ties: state.ties++
            };
        }
        default:
            return state;
    }
}

function board(state = initialState.board, action) {
    switch (sction.type) {
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
        default:
            return {
                ...state,
                board: board(state.board, action),
                score: score(state.stats, action)
            };
    }
}

export default game;