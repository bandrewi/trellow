import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { createBoard } from "../../store/board";

export default function Create() {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState('')

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


    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createBoard(title))
    }

    return (
        <>
            <form onSubmit={handleCreate}>
                <label> Board title
                    <span>*</span>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    >
                    </input>
                </label>
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