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
    // const lists = useSelector(state => state.lists)
    const { id } = useParams()
    const board = boards[id]

    // const body = document.querySelector('body')
    // body.style.backgroundColor = '#ffffff'
    // useEffect(() => {
    //     const listUl = document.getElementById('list-ul')
    //     console.log('SCROLL WIDTH', listUl.scrollWidth)
    //     console.log('CLIENT WIDTH', listUl.clientWidth)
    // })
    useEffect(() => {
        const listUl = document.getElementById('list-ul')
        const root = document.getElementById('root')
        root.style.width = listUl?.scrollWidth > listUl?.clientWidth && 'fit-content'
        // console.log('SCROLL WIDTH', listUl.scrollWidth)
        // console.log('CLIENT WIDTH', listUl.clientWidth)
        if (listUl?.scrollWidth > listUl?.clientWidth) console.log('SCROLL')
    })


    if (!board) {
        return <Redirect to='/' />;
    }

    //DISPLAY INPUT FOR ADD LIST
    function displayInput() {
        document.getElementById('add-list-text-container').style.display = 'none'
        document.getElementById('add-list-details').style.display = 'block'
        document.getElementById('add-list-input').focus()
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
        return <Redirect to='/' />;
    }

    return (
        <>
            <div id="board-dash">
                <h1
                    id='board-title'
                    contentEditable='true'
                    onBlur={handleEdit}
                >
                    {board.title}
                </h1>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div id="list-container">
                <ul id="list-ul" className="flex-row">
                    {board.lists.map(list => (
                        <li key={list.id} className='list-li'>
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
                                    value={listTitle}
                                    onChange={e => setListTitle(e.target.value)}
                                >
                                </input>
                            </div>
                            <div id="list-btn-container">
                                <button
                                    id='add-list-btn'
                                    onMouseDown={addList}
                                    disabled={!listTitle}
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