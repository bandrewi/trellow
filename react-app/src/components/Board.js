import { Link } from "react-router-dom";

export default function Board({ board }) {

    return (
        <>
            <div id="board-link">
                <Link to={`/boards/${board.id}`}>
                    <div id="clickable-div">
                        {board.title.length > 20 ? board.title.substring(0, 20) + '...' : board.title}
                    </div>
                </Link>
            </div>
        </>

    )
}