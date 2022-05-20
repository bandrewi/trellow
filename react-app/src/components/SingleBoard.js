import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"

import { deleteBoard, editBoard } from "../store/board"
import { createList } from "../store/list"
import List from "./List"
import './singleboard.css'

export default function SingleBoard() {
    const dispatch = useDispatch()
    const [listTitle, setListTitle] = useState('')
    const boards = useSelector(state => state.boards)
    const { id } = useParams()
    const board = boards[id]

    // MAKES THE ROOT FIT CONTENT SO THAT THE NAVBAR & BOARD DASH CAN BE STICKY
    useEffect(() => {
        if (board?.lists.length >= 6) {
            const root = document.getElementById('root')
            root.style.width = 'fit-content'
        }
    })

    // PREVIOUS METHOD
    // useEffect(() => {
    //     const listUl = document.getElementById('list-ul')
    //     const root = document.getElementById('root')
    //     root.style.width = listUl?.scrollWidth > listUl?.clientWidth && 'fit-content'
    //     // console.log('SCROLL WIDTH', listUl.scrollWidth)
    //     // console.log('CLIENT WIDTH', listUl.clientWidth)
    //     // if (listUl?.scrollWidth > listUl?.clientWidth) console.log('SCROLL')
    // })

    useEffect(() => {
        const addListInput = document.getElementById(`add-list-input`)
        const listLongError = document.getElementById('add-list-long-error')

        addListInput.style.outlineColor = '#026AA7'

        listLongError.style.display = 'none'

        if (listTitle.length === 255) {
            addListInput.style.outlineColor = 'red'
            listLongError.style.display = 'block'
        }
    }, [listTitle])

    if (!board) {
        return <Redirect to='/' />;
    }

    //DISPLAY INPUT FOR ADD LIST
    function displayInput() {
        document.getElementById('add-list-text-container').style.display = 'none'
        document.getElementById('add-list-details').style.display = 'block'
        document.getElementById('add-list-input').select()
    }

    function hideInput() {
        document.getElementById('add-list-text-container').style.display = 'block'
        document.getElementById('add-list-details').style.display = 'none'
    }

    function addList() {
        dispatch(createList(board.lists.length + 1, listTitle, +id))
        hideInput()
        setListTitle('')
    }

    // BOARD FUNCTIONS
    const handleEdit = (e) => {
        // const titleElement = document.getElementById('board-title')
        // const title = titleElement.innerText
        // dispatch(editBoard(id, title))
        // CAN ADD AUTOSELECT TEXT LATER ON (ONLY WORKS ON INPUT FIELD)
        const boardTitle = e.target.innerText
        if (boardTitle === '') {
            e.target.innerText = board.title
            return
        }
        if (board.title !== boardTitle) {
            dispatch(editBoard(id, e.target.innerText))
        }
        return
    }

    function handleDelete(e) {
        e.preventDefault()

        dispatch(deleteBoard(id))
    }

    return (
        <>
            <div id="board-dash" className="flex-row">
                <h1
                    id='board-title'
                    // contentEditable='true'
                    onBlur={handleEdit}
                >
                    {board.title}
                </h1>
                <div id="board-separator" />
                <button id='board-delete-btn' onClick={handleDelete}>Delete</button>
            </div>
            <div id="list-container">
                <ul id="list-ul" className="flex-row">
                    {board.lists.map(list => (
                        <li key={list.id} className='list-li list'>
                            <List list={list} />
                        </li>
                    ))}
                    <li id="add-list-container" className="list-li">
                        <div id='add-list-text-container' onClick={displayInput}>
                            <span id='add-list-text'>＋Add a list</span>
                        </div>
                        <div id="add-list-details"
                            style={{ display: 'none' }}
                            onBlur={hideInput}
                        >
                            <div id="list-input-container">
                                <input
                                    id="add-list-input"
                                    type="text"
                                    placeholder="Enter list title..."
                                    maxLength={255}
                                    value={listTitle}
                                    onChange={e => setListTitle(e.target.value)}
                                >
                                </input>
                            </div>
                            <div id='add-list-long-error' className="list-edit-error">title can not be longer than 255 characters</div>
                            <div id="list-btn-container">
                                <button
                                    id='add-list-btn'
                                    onMouseDown={addList}
                                    disabled={!listTitle || listTitle.length === 255}
                                >
                                    Add List
                                </button>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}