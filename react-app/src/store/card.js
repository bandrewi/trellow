import { CLEAR_STORE } from "./clear"

const LOAD_CARDS = 'cards/LOAD_CARDS'
export const ADD_CARD = 'cards/ADD_CARD'
export const UPDATE_CARD = 'cards/UPDATE_CARD'
export const REMOVE_CARD = 'cards/REMOVE_CARD'

const loadCards = ({ cards }) => ({
    type: LOAD_CARDS,
    cards
})

const addCard = (card) => ({
    type: ADD_CARD,
    card
})

const updateCard = (card) => ({
    type: UPDATE_CARD,
    card
})

const removeCard = (card) => ({
    type: REMOVE_CARD,
    card
})

export const fetchCards = () => async (dispatch) => {
    const res = await fetch('/api/cards/')
    const data = await res.json()
    dispatch(loadCards(data))
}

export const createCard = (order, title, list_id, description) => async (dispatch) => {
    const res = await fetch('/api/cards/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order,
            title,
            description,
            list_id
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addCard(data))
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return { errors: 'An error occurred. Please try again.' }
    }
}

export const editCard = (id, order, title, description) => async (dispatch) => {
    const res = await fetch(`/api/cards/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order,
            title,
            description
        })
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(updateCard(data))
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return { errors: 'An error occurred. Please try again.' }
    }
}

export const deleteCard = (card) => async (dispatch) => {
    const { id } = card
    await fetch(`/api/cards/${id}`, {
        method: "DELETE"
    })
    dispatch(removeCard(card))
}

const initialState = {}
export default function cards(state = {}, action) {
    let newState;
    switch (action.type) {
        case LOAD_CARDS:
            newState = {}
            action.cards.forEach(card => newState[card.id] = card)
            return newState
        case ADD_CARD:
            newState = { ...state }
            newState[action.card.id] = action.card
            return newState
        case UPDATE_CARD:
            newState = { ...state }
            newState[action.card.id] = action.card
            return newState
        case REMOVE_CARD:
            newState = { ...state }
            delete newState[action.card.id]
            return newState
        case CLEAR_STORE:
            return initialState
        default:
            return state;
    }
}