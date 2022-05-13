import { Link } from "react-router-dom";

export default function Board({ board }) {

    return (
        <>
            <Link to={`/boards/${board.id}`}>{board.title}</Link>
        </>

    )
}