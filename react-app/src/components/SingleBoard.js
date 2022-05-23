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
    const [boardTitle, setBoardTitle] = useState(board?.title)

    // console.log('BOARD', board)
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
        if (board) {
            const boardInput = document.getElementById(`board-edit-input`)
            const boardLongError = document.getElementById('board-long-error')
            const boardEmptyError = document.getElementById(`board-empty-error`)

            boardInput.style.outlineColor = '#026AA7'

            boardLongError.style.display = 'none'
            boardEmptyError.style.display = 'none'

            if (boardTitle.trim() === '') {
                boardInput.style.outlineColor = 'red'
                boardEmptyError.style.display = 'block'
            }

            if (boardTitle.length === 255) {
                boardInput.style.outlineColor = 'red'
                boardLongError.style.display = 'block'
            }
        }
    }, [boardTitle, board])

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
    function displayBoardInput(e) {
        e.target.style.display = 'none'
        const boardTitleInput = document.getElementById('board-edit-input')
        boardTitleInput.style.display = 'block'
        boardTitleInput.select()
    }

    const handleEdit = (e) => {
        console.log("EDIT")
        const boardTitleInput = document.getElementById('board-edit-input')
        const boardTitleEl = document.getElementById('board-title')
        if (boardTitle.trim() === '') {
            setBoardTitle(board.title)
            // e.target.style.display = 'none'
            boardTitleInput.style.display = 'none'
            boardTitleEl.style.display = 'block'
            document.getElementById(`board-empty-error`).style.display = 'none'
            return
        }

        if (boardTitle.length === 255) {
            boardTitleInput.focus()
            return
        }

        boardTitleInput.style.display = 'none'
        boardTitleEl.style.display = 'block'
        if (board.title !== boardTitle) {
            dispatch(editBoard(id, boardTitle))
        }
    }

    function handleDelete(e) {
        e.preventDefault()

        dispatch(deleteBoard(id))
    }

    return (
        <>
            {/* <div id="board-background">&nbsp;</div> */}
            <div id="board-dash" className="flex-row">
                <div id="spacing">&nbsp;</div>
                <h1
                    id='board-title'
                    onClick={displayBoardInput}
                >
                    {boardTitle.length > 100 ? boardTitle.substring(0, 100) + '...' : boardTitle}
                </h1>
                <input
                    id="board-edit-input"
                    type="text"
                    maxLength={255}
                    value={boardTitle}
                    onChange={e => setBoardTitle(e.target.value)}
                    onBlur={handleEdit}
                    onKeyDown={e => e.key === 'Enter' && handleEdit()}
                >
                </input>
                <div id="board-separator" />
                <button id='board-delete-btn' onClick={handleDelete}>Delete</button>
            </div>
            <div id='board-empty-error' className="board-title-errors">title can not be empty</div>
            <div id='board-long-error' className="board-title-errors">title can not be longer than 255 characters</div>
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
                            {listTitle.length >= 255 && (
                                <div className="list-add-errors">Title can not be longer than 255 characters</div>
                            )}
                            {listTitle.trim() === '' && (
                                <div className="list-add-errors">Title required</div>
                            )}
                            <div id="list-btn-container">
                                <button
                                    id='add-list-btn'
                                    onMouseDown={addList}
                                    disabled={!listTitle || listTitle.length === 255 || listTitle.trim() === ''}
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