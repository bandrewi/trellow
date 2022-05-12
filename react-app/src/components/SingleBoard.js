import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import List from "./auth/List"

export default function SingleBoard() {
    const boards = useSelector(state => state.boards)
    const { id } = useParams()
    const board = boards[id]

    return (
        <>
            <h1>{board.title}</h1>
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