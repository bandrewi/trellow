import { ADD_LIST, UPDATE_LIST, REMOVE_LIST } from './list'
import { ADD_CARD, UPDATE_CARD, REMOVE_CARD } from './card'
import { CLEAR_STORE } from './clear'

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

const updateBoard = (board) => ({
    type: UPDATE_BOARD,
    board
})

const removeBoard = (id) => ({
    type: REMOVE_BOARD,
    id
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

    if (res.ok) {
        const data = await res.json()
        dispatch(addBoard(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return { errors: 'An error occurred. Please try again.' }
    }
}

export const editBoard = (id, title) => async (dispatch) => {
    const res = await fetch(`/api/boards/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateBoard(data))
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return { errors: 'An error occurred. Please try again.' }
    }
}

export const deleteBoard = (id) => async (dispatch) => {
    await fetch(`/api/boards/${id}`, {
        method: "DELETE"
    })
    dispatch(removeBoard(id))
}
const initialState = {}
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
        case UPDATE_BOARD:
            newState = { ...state }
            newState[action.board.id] = action.board
            return newState
        case REMOVE_BOARD:
            newState = { ...state }
            delete newState[action.id]
            return newState
        case ADD_LIST:
            newState = { ...state }
            // console.log('===========ACTION', action)
            // console.log('===========LIST', action.list)
            // console.log('===========BOARD', newState[action.list.board_id])
            // console.log('===========LISTS', newState[action.list.board_id].lists)
            newState[action.list.board_id].lists =
                [...newState[action.list.board_id].lists, action.list]
            return newState
        case UPDATE_LIST:
            newState = { ...state }
            newState[action.list.board_id].lists =
                newState[action.list.board_id].lists.map(list => {
                    if (list.id === action.list.id) {
                        return action.list
                    } else {
                        return list
                    }
                })
            return newState
        case REMOVE_LIST:
            newState = { ...state }
            // console.log('===========ACTION', action)
            // console.log('===========BOARD', newState[action.boardId])
            // console.log('===========LISTS', newState[action.boardId].lists)
            newState[action.boardId].lists =
                newState[action.boardId].lists.filter(list => list.id !== +action.id)
            return newState
        case ADD_CARD:
            newState = { ...state }
            const listIdx = newState[action.card.board_id].lists.findIndex(list => list.id === action.card.list_id)
            newState[action.card.board_id].lists[listIdx].cards =
                [...newState[action.card.board_id].lists[listIdx].cards, action.card]
            return newState
        case UPDATE_CARD:
            newState = { ...state }
            const listI = newState[action.card.board_id].lists.findIndex(list => list.id === action.card.list_id)
            newState[action.card.board_id].lists[listI].cards =
                newState[action.card.board_id].lists[listI].cards.map(card => {
                    if (card.id === action.card.id) {
                        return action.card
                    } else {
                        return card
                    }
                })
            return newState
        case REMOVE_CARD:
            newState = { ...state }
            const listIndex = newState[action.card.board_id].lists.findIndex(list => list.id === action.card.list_id)
            newState[action.card.board_id].lists[listIndex].cards =
                newState[action.card.board_id].lists[listIndex].cards.filter(card => card.id !== +action.card.id)
            return newState
        case CLEAR_STORE:
            return initialState
        default:
            return state;
    }
}

