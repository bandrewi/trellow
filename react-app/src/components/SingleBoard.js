import { useState } from "react"
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

    if (!board) {
        return <Redirect to='/' />;
    }

    function displayInput() {
        document.getElementById('add-list').style.display = 'none'
        document.getElementById('add-list-div').style.display = 'block'
        document.getElementById('add-list-input').focus()
    }

    function hideInput() {
        document.getElementById('add-list').style.display = 'block'
        document.getElementById('add-list-div').style.display = 'none'
    }

    function addList() {
        dispatch(createList(board.lists.length + 1, listTitle, +id))
        hideInput()
        setListTitle('')
    }

    const handleEdit = (e) => {
        // const titleElement = document.getElementById('board-title')
        // const title = titleElement.innerText
        // dispatch(editBoard(id, title))
        const boardTitle = e.target.innerText
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
            <div >
                <h1
                    id='board-title'
                    contentEditable='true'
                    onBlur={handleEdit}
                >
                    {board.title}
                </h1>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div>
                <ul>
                    {board.lists.map(list => (
                        <li key={list.id}>
                            <List list={list} />
                        </li>
                    ))}
                    <li>
                        <div id='add-list' onClick={displayInput}>
                            <span>+</span>
                            <span>Add a list</span>
                        </div>
                        <div id="add-list-div"
                            style={{ display: 'none' }}
                            onBlur={hideInput}
                        >
                            <input
                                id="add-list-input"
                                type="text"
                                placeholder="Enter a list title..."
                                value={listTitle}
                                onChange={e => setListTitle(e.target.value)}
                            >
                            </input>
                            <button id='add-list-btn' onMouseDown={addList}>Add List</button>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}