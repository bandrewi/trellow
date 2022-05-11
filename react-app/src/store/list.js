const LOAD_LISTS = 'lists/LOAD_LISTS'
const ADD_LIST = 'lists/ADD_LIST'
const UPDATE_LIST = 'lists/UPDATE_LIST'
const REMOVE_LIST = 'lists/REMOVE_LIST'

const loadLists = ({ lists }) => ({
    type: LOAD_LISTS,
    lists
})

const addList = (list) => ({
    type: ADD_LIST,
    list
})

const updateList = (list) => ({
    type: UPDATE_LIST,
    list
})

const removeList = (id) => ({
    type: REMOVE_LIST,
    id
})

export const fetchLists = () => async (dispatch) => {
    const res = await fetch('/api/lists/')
    const data = await res.json()
    dispatch(loadLists(data))
}

export const createList = ({ order, title, board_id }) => async (dispatch) => {
    const res = await fetch('/api/lists/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order,
            title,
            board_id
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addList(data))
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return { errors: 'An error occurred. Please try again.' }
    }
}

export const editList = ({ id, order, title }) => async (dispatch) => {
    const res = await fetch(`/api/lists/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order,
            title
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateList(data))
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return { errors: 'An error occurred. Please try again.' }
    }
}

export const deleteList = ({ id }) => async (dispatch) => {
    await fetch(`/api/lists/${id}`, {
        method: "DELETE"
    })
    dispatch(removeList(id))
}
export default function lists(state = {}, action) {
    let newState;
    switch (action.type) {
        case LOAD_LISTS:
            newState = {}
            action.lists.forEach(list => newState[list.id] = list)
            return newState
        case ADD_LIST:
            newState = { ...state }
            newState[action.list.id] = action.list
            return newState
        case UPDATE_LIST:
            newState = { ...state }
            newState[action.list.id] = action.list
            return newState
        case REMOVE_LIST:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}