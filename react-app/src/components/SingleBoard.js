import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { deleteBoard, editBoard } from "../store/board"
import List from "./auth/List"
import './singleboard.css'

export default function SingleBoard() {
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boards)
    const { id } = useParams()
    const board = boards[id]

    if (!board) {
        return <Redirect to='/' />;
    }

    const handleEdit = () => {
        const titleElement = document.getElementById('board-title')
        const title = titleElement.innerText
        dispatch(editBoard(id, title))
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
                </ul>
            </div>
        </>
    )
}