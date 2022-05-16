import { useDispatch } from "react-redux"
import { deleteList, editList } from "../../store/list"
import Card from "./Card"

export default function List({ list }) {
    const dispatch = useDispatch()

    function handleDelete() {
        dispatch(deleteList(list.id, list.board_id))
    }

    const handleEdit = () => {
        const titleElement = document.getElementById(`list-title-${list.id}`)
        const title = titleElement.innerText
        console.log("ELEMENT", titleElement)
        console.log('TITLE', title)
        // CHANGE ORDER BASED ON DRAG DROP
        dispatch(editList(list.id, list.order, title))
    }

    return (
        <>
            <h2
                id={`list-title-${list.id}`}
                contentEditable='true'
                onBlur={handleEdit}
            >
                {list.title}
            </h2>
            <button onClick={handleDelete}>Delete</button>
            <ul>
                {list.cards.map(card => (
                    <li key={card.id}>
                        <Card card={card} />
                    </li>
                ))}
            </ul>
        </>
    )
}