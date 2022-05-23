import { useState } from "react"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBoard } from "../../store/board";

export default function Create() {
    const dispatch = useDispatch()
    // const [showMenu, setShowMenu] = useState(false);
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

    function showCreate() {
        const createForm = document.getElementById('nav-create-form-container')
        const createFormInput = document.getElementById('nav-create-input')
        createForm.style.display = 'block'
        createFormInput.focus()

    }

    function hideCreate() {
        const createForm = document.getElementById('nav-create-form-container')
        createForm.style.display = 'none'
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        const board = await dispatch(createBoard(title))
        setTitle('')
        hideCreate()
        if (board) history.push(`/boards/${board.id}`)
    }

    return (
        <>
            <div id="nav-create-container" onClick={showCreate}>
                <div id="nav-create">Create</div>
            </div>
            <div
                id="nav-create-form-container"
                className="flex-column"
                onBlur={hideCreate}
                style={{ display: 'none' }}
            >
                {/* FORM ALLOWS PRESSING ENTER TO SUBMIT */}
                <form id='nav-create-form' className='flex-column' onSubmit={handleCreate}>
                    <div id="nav-create-label">Create</div>
                    <label id='nav-create-title' className="required"> Board title
                    </label>
                    <input
                        id='nav-create-input'
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maxLength='255'
                    >
                    </input>
                    {!title && <div id='create-required'>Board title is required</div>}
                    {title.length === 255 &&
                        <div id='create-required'>Board title can not be longer than 255 characters</div>
                    }
                    <button
                        id="create-btn"
                        disabled={!title || title.trim() === '' || title.length >= 255}
                        onMouseDown={handleCreate}
                    >
                        Create</button>
                </form>
            </div>
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