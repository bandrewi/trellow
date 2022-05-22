import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBoard } from "../../store/board";

export default function Create() {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState('')
    const history = useHistory()
    // CODE TO IMPLEMENT WHEN WORKPLACE OR TEMPLATES HAVE BEEN MADE
    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     };

    //     document.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);


    const handleCreate = async (e) => {
        e.preventDefault()
        const board = await dispatch(createBoard(title))
        setTitle('')
        history.push(`/boards/${board.id}`)
    }

    return (
        <>
            <div id="nav-create-container">
                <div id="nav-create">Create</div>
            </div>
            <form onSubmit={handleCreate} style={{ display: 'none' }}>
                <label className="required"> Board title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                >
                </input>
                <button id="create-btn" disabled={!title}>Create</button>
            </form>
            {/* CODE TO IMPLEMENT WHEN WORKPLACE OR TEMPLATES HAVE BEEN MADE */}
            {/* {!showMenu && (
                <p onClick={openMenu}>Create</p>
            )}

            {showMenu && (
                <>
                    <p onClick={openMenu}>Create</p>
                    <p>Create Board</p>
                    <p>
                        A board is made up of cards ordered on lists.
                        Use it to manage projects, track information, or organize anything.
                    </p>
                </>
            )} */}
        </>
    )
}