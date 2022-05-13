import { useSelector } from 'react-redux';

import Board from "./Board";

export default function HomePage() {
    const boards = useSelector(state => Object.values(state.boards))

    return (
        <>
            <h1>Home Page</h1>
            <ul>
                {boards.map(board => (
                    <li key={board.id}>
                        <Board board={board} />
                    </li>
                ))}
            </ul>
        </>
    )
}