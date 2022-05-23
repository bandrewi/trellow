import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TextareaAutosize from 'react-textarea-autosize';

import { createCard } from "../store/card"
import { deleteList, editList } from "../store/list"
import Card from "./Card"
import './list.css'



export default function List({ list }) {
    const dispatch = useDispatch()
    const [cardTitle, setCardTitle] = useState('')
    const [listTitle, setListTitle] = useState(list.title)

    //-------------------------- LIST FUNCTIONS ----------------------------
    //ERROR HANDLING FOR LIST TITLE EDIT
    useEffect(() => {
        const listTitleInput = document.getElementById(`list-title-input-${list.id}`)
        const listEmptyError = document.getElementById(`list-empty-error-${list.id}`)
        const listLongError = document.getElementById(`list-long-error-${list.id}`)

        listTitleInput.style.outlineColor = '#026AA7'
        listEmptyError.style.display = 'none'
        listLongError.style.display = 'none'

        if (listTitle.trim() === '') {
            listTitleInput.style.outlineColor = 'red'
            listEmptyError.style.display = 'block'
        }
        if (listTitle.length === 255) {
            listTitleInput.style.outlineColor = 'red'
            listLongError.style.display = 'block'
        }
    }, [listTitle, list.id])

    // DISPLAY LIST TITLE INPUT
    function displayListInput(e) {
        const listTitleInput = document.getElementById(`list-title-input-${list.id}`)
        e.target.style.display = 'none'
        listTitleInput.style.display = 'block'
        listTitleInput.select()
    }

    function handleDelete() {
        dispatch(deleteList(list.id, list.board_id))
    }

    const handleEdit = (e) => {
        // CHANGE ORDER BASED ON DRAG DROP
        const listTitleInput = document.getElementById(`list-title-input-${list.id}`)
        const listTitleEl = document.getElementById(`list-title-${list.id}`)

        if (listTitle.trim() === '') {
            setListTitle(list.title)
            listTitleInput.style.display = 'none'
            listTitleEl.style.display = 'block'
            document.getElementById(`list-empty-error-${list.id}`).style.display = 'none'
            return
        }

        if (listTitle.length === 255) {
            listTitleInput.focus()
            return
        }

        listTitleInput.style.display = 'none'
        listTitleEl.style.display = 'block'

        if (list.title !== listTitle) {
            dispatch(editList(list.id, list.order, listTitle))
        }
    }

    // --------------------------------------------------------------------------------------

    //-------------------------- CARD FUNCTIONS ----------------------------------------------

    // ADD CARD DISPLAY
    function displayInput(e) {
        document.getElementById(`add-card-${list.id}`).style.display = 'none'
        document.getElementById(`add-card-div-${list.id}`).style.display = 'block'
        document.getElementById(`add-card-input-${list.id}`).focus()
        const addCardContainerElements = Array.from(document.getElementsByClassName('add-card-container'))
        const addCardContainer = addCardContainerElements.find(el => el.id.split('-').pop() === e.target.id.split('-').pop())
        addCardContainer.classList.remove('add-card-container')
        addCardContainer.classList.add('add-card-container-input')
    }

    function hideInput(e) {
        document.getElementById(`add-card-${list.id}`).style.display = 'block'
        document.getElementById(`add-card-div-${list.id}`).style.display = 'none'
        const addCardContainer = document.getElementsByClassName('add-card-container-input')[0]
        addCardContainer?.classList.remove('add-card-container-input')
        addCardContainer?.classList.add('add-card-container')
    }

    function addCard() {
        dispatch(createCard(list.cards.length + 1, cardTitle, list.id))
        hideInput()
        setCardTitle('')
    }
    // -----------------------------------------------------------------------------------------

    return (
        <>
            <div id="list-title-container" className="flex-row">
                <h2
                    id={`list-title-${list.id}`}
                    className='list-title'
                    onClick={displayListInput}
                >
                    {listTitle}
                </h2>
                <TextareaAutosize
                    id={`list-title-input-${list.id}`}
                    className="list-title"
                    value={listTitle}
                    onChange={e => setListTitle(e.target.value)}
                    maxLength='255'
                    // METHOD TO RUN TWO FUNCTIONS ON ONE EVENT LISTENER
                    // onBlur={(e) => { hideListInput(e); handleEdit(e); }}
                    onBlur={handleEdit}
                    onKeyDown={e => e.key === 'Enter' && handleEdit()}
                    style={{
                        resize: 'none',
                        display: 'none'
                    }}
                />
                <div id='list-delete-btn' onClick={handleDelete}>✖</div>
            </div>
            <div id={`list-empty-error-${list.id}`} className="list-edit-error">title can not be empty</div>
            <div id={`list-long-error-${list.id}`} className="list-edit-error">title can not be longer than 255 characters</div>
            <ul id="card-container">
                {list.cards.map(card => (
                    <li key={card.id} className='card-li'>
                        <Card card={card} />
                    </li>
                ))}
                <li id={`add-card-container-${list.id}`} className="add-card-container">
                    <div
                        id={`add-card-${list.id}`}
                        className='add-card-text-container'
                        onClick={displayInput}
                    >
                        <span id={`add-card-text-${list.id}`}>＋Add a card</span>
                    </div>
                    <div id={`add-card-div-${list.id}`}
                        style={{ display: 'none' }}
                        onBlur={hideInput}
                    >
                        <input
                            id={`add-card-input-${list.id}`}
                            className='add-card-input'
                            type="text"
                            placeholder="Enter a title for this card..."
                            value={cardTitle}
                            onChange={e => setCardTitle(e.target.value)}
                            maxLength='255'
                        >
                        </input>
                        {cardTitle.length >= 255 && (
                            <div className="card-add-errors">Title can not be longer than 255 characters</div>
                        )}
                        {cardTitle.trim() === '' && (
                            <div className="card-add-errors">Title required</div>
                        )}
                        <div>
                            <button
                                id='add-card-btn'
                                onMouseDown={addCard}
                                disabled={!cardTitle || cardTitle.length >= 255 || cardTitle.trim() === ''}
                            >
                                Add Card
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}