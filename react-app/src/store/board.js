const LOAD_BOARDS = 'boards/LOAD_BOARDS'
const ADD_BOARD = 'boards/ADD_BOARD'
const UPDATE_BOARD = 'boards/UPDATE_BOARD'
const REMOVE_BOARD = 'boards/REMOVE_BOARD'

const loadBoards = ({ boards }) => ({
    type: LOAD_BOARDS,
    boards
})

const addBoard = (board) => ({
    type: ADD_BOARD,
    board
})

export const fetchBoards = () => async (dispatch) => {
    const res = await fetch('/api/boards/')
    const data = await res.json()
    dispatch(loadBoards(data))
}

export const createBoard = (title) => async (dispatch) => {
    const res = await fetch('/api/boards/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    })
    const data = await res.json()
    dispatch(addBoard(data))
}

export default function boards(state = {}, action) {
    let newState;
    switch (action.type) {
        case LOAD_BOARDS:
            newState = {}
            action.boards.forEach(board => newState[board.id] = board)
            return newState
        case ADD_BOARD:
            newState = { ...state }
            newState[action.board.id] = action.board
            return newState
        default:
            return state;
    }
}

