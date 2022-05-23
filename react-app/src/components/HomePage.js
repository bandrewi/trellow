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
                        {boards.length === 0 && (
                            <>
                                <p>You haven't created any boards yet. </p>
                                <p>To create a board, click on the Create button and enter a title.</p>
                            </>
                        )}
                    </div>
                </div>
                <div id='board-container'>
                    <ul id='board-container-inner'>
                        {boards.map(board => (
                            <li key={board.id} className='board-li'>
                                <Board board={board} />
                            </li>
                        ))}
                        {/* <li id='add-board-container' className='board-li flex-column' >
                            <div id='add-board'>
                                Create new board
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}