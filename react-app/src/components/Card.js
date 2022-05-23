import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteCard, editCard } from "../store/card"
import TextareaAutosize from 'react-textarea-autosize';

import './card.css'

export default function Card({ card }) {
    const dispatch = useDispatch()
    const [cardTitle, setCardTitle] = useState(card.title)

    //ERROR HANDLING FOR LIST TITLE EDIT
    useEffect(() => {
        const cardTitleInput = document.getElementById(`card-title-input-${card.id}`)
        const cardEmptyError = document.getElementById(`card-empty-error-${card.id}`)
        const cardLongError = document.getElementById(`card-long-error-${card.id}`)

        cardTitleInput.style.outlineColor = '#026AA7'
        cardEmptyError.style.display = 'none'
        cardLongError.style.display = 'none'

        if (cardTitle.trim() === '') {
            cardTitleInput.style.outlineColor = 'red'
            cardEmptyError.style.display = 'block'
        }
        if (cardTitle.length === 255) {
            cardTitleInput.style.outlineColor = 'red'
            cardLongError.style.display = 'block'
        }
    }, [cardTitle, card.id])

    // DISPLAY CARD TITLE INPUT
    function displayCardInput(e) {
        const cardTitleInput = document.getElementById(`card-title-input-${card.id}`)
        e.target.style.display = 'none'
        cardTitleInput.style.display = 'block'
        cardTitleInput.select()
    }

    function handleDelete() {
        dispatch(deleteCard(card))
    }

    const handleEdit = (e) => {
        // CHANGE ORDER BASED ON DRAG DROP
        // ADD IN EDIT FOR DESCRIPTION
        const cardTitleInput = document.getElementById(`card-title-input-${card.id}`)
        const cardTitleEl = document.getElementById(`card-title-${card.id}`)

        if (cardTitle.trim() === '') {
            setCardTitle(card.title)
            cardTitleInput.style.display = 'none'
            cardTitleEl.style.display = 'block'
            document.getElementById(`card-empty-error-${card.id}`).style.display = 'none'
            return
        }

        if (cardTitle.length === 255) {
            cardTitleInput.focus()
            return
        }

        cardTitleInput.style.display = 'none'
        cardTitleEl.style.display = 'block'
        if (card.title !== cardTitle) {
            dispatch(editCard(card.id, card.order, cardTitle, ''))
        }

    }

    return (
        <>
            <div id='card-title-container' className="flex-row">
                <h2
                    id={`card-title-${card.id}`}
                    className="card-title"
                    onClick={displayCardInput}
                >
                    {cardTitle}
                </h2>
                <TextareaAutosize
                    id={`card-title-input-${card.id}`}
                    className="card-title"
                    value={cardTitle}
                    onChange={e => setCardTitle(e.target.value)}
                    maxLength='255'
                    onBlur={handleEdit}
                    onKeyDown={e => e.key === 'Enter' && handleEdit()}
                    style={{
                        resize: 'none',
                        display: 'none'
                    }}
                />
                <div id="card-delete-btn" onClick={handleDelete}>✖</div>
            </div>
            <div id={`card-empty-error-${card.id}`} className="card-edit-errors">title can not be empty</div>
            <div id={`card-long-error-${card.id}`} className="card-edit-errors">title can not be longer than 255 characters</div>
        </>
    )
}