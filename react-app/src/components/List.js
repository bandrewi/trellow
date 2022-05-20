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

    // ADD CARD DISPLAY
    function displayInput(e) {
        document.getElementById(`add-card-${list.id}`).style.display = 'none'
        document.getElementById(`add-card-div-${list.id}`).style.display = 'block'
        document.getElementById(`add-card-input-${list.id}`).focus()
        const addCardContainerElements = Array.from(document.getElementsByClassName('add-card-container'))
        const addCardContainer = addCardContainerElements.find(el => el.id.split('-').pop() === e.target.id.split('-').pop())
        // console.log('----------el', addCardContainerElements)
        // console.log('----------', addCardContainer)
        // console.log('----------e', e.target.id.split('-').pop())
        addCardContainer.classList.remove('add-card-container')
        addCardContainer.classList.add('add-card-container-input')
    }

    function hideInput(e) {
        document.getElementById(`add-card-${list.id}`).style.display = 'block'
        document.getElementById(`add-card-div-${list.id}`).style.display = 'none'
        const addCardContainer = document.getElementsByClassName('add-card-container-input')[0]
        // const addCardContainerElements = Array.from(document.getElementsByClassName('add-card-container-input'))
        // const addCardContainer = addCardContainerElements.find(el => el.id.split('-').pop() === e.target.id.split('-').pop())
        // console.log('----------el', addCardContainerElements)
        // console.log('----------', addCardContainer)
        // console.log('----------e', e.target.id.split('-').pop())
        addCardContainer?.classList.remove('add-card-container-input')
        addCardContainer?.classList.add('add-card-container')
    }

    function addCard() {
        dispatch(createCard(list.cards.length + 1, cardTitle, list.id))
        hideInput()
        setCardTitle('')
    }

    // DISPLAY LIST TITLE INPUT
    function displayListInput(e) {
        e.target.style.display = 'none'
        document.getElementById(`list-title-input-${list.id}`).style.display = 'block'
        document.getElementById(`list-title-input-${list.id}`).select()
    }

    function hideListInput(e) {
        e.target.style.display = 'none'
        document.getElementById(`list-title-${list.id}`).style.display = 'block'
    }

    // LIST FUNCTIONS
    function handleDelete() {
        dispatch(deleteList(list.id, list.board_id))
    }

    const handleEdit = (e) => {
        // CHANGE ORDER BASED ON DRAG DROP
        if (listTitle === '') {
            e.target.innerText = list.title
            return
        }
        if (list.title !== listTitle) {
            dispatch(editList(list.id, list.order, listTitle))
        }
        return
    }
    // const handleEdit = (e) => {
    //     // CHANGE ORDER BASED ON DRAG DROP
    //     const listTitle = e.target.innerText
    //     if (listTitle === '') {
    //         e.target.innerText = list.title
    //         return
    //     }
    //     if (list.title !== listTitle) {
    //         dispatch(editList(list.id, list.order, listTitle))
    //     }
    //     return
    // }
    // console.log('TITLE', listTitle)
    return (
        <>
            <div id="list-title-container" className="flex-row">
                <h2
                    id={`list-title-${list.id}`}
                    className='list-title'
                    onClick={displayListInput}
                >
                    {list.title}
                </h2>
                <TextareaAutosize
                    id={`list-title-input-${list.id}`}
                    className="list-title"
                    value={listTitle}
                    onChange={e => setListTitle(e.target.value)}
                    maxLength='255'
                    onBlur={hideListInput}
                    style={{
                        resize: 'none',
                        display: 'none'
                    }}
                />
                <div id='list-delete-btn' onClick={handleDelete}>ⓧ</div>
            </div>
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
                        >
                        </input>
                        <div>
                            <button
                                id='add-card-btn'
                                onMouseDown={addCard}
                                disabled={!cardTitle}
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