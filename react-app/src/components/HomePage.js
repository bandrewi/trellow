import { useSelector } from 'react-redux';

import Board from "./Board";
import './home.css'

export default function HomePage() {
    const boards = useSelector(state => Object.values(state.boards))

    return (
        <>
            <div id='home-container'>
                <div id='board-header'>
                    <div id='board-header-start'>
                        <h3>YOUR BOARDS</h3>
                    </div>
                </div>
                <div id='board-container'>
                    <ul id='board-container-inner'>
                        {boards.map(board => (
                            <li key={board.id} className='board-li'>
                                <Board board={board} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}