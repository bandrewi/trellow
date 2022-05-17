import { useDispatch } from "react-redux"
import { deleteCard, editCard } from "../store/card"

import './card.css'

export default function Card({ card }) {
    const dispatch = useDispatch()

    function handleDelete() {
        dispatch(deleteCard(card))
    }

    const handleEdit = (e) => {
        // CHANGE ORDER BASED ON DRAG DROP
        // ADD IN EDIT FOR DESCRIPTION
        const cardTitle = e.target.innerText
        if (cardTitle === '') {
            e.target.innerText = card.title
            return
        }
        if (card.title !== cardTitle) {
            dispatch(editCard(card.id, card.order, cardTitle, ''))
        }
        return
    }

    return (
        <>
            <h3
                id={`list-title-${card.id}`}
                contentEditable='true'
                onBlur={handleEdit}
            >
                {card.title}
            </h3>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}