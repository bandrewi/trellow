import { useDispatch } from "react-redux"
import { deleteCard } from "../../store/card"

export default function Card({ card }) {
    const dispatch = useDispatch()

    function handleDelete() {
        dispatch(deleteCard(card))
    }

    return (
        <>
            <h3>{card.title}</h3>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}