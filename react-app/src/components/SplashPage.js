import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './splash.css'

export default function SplashPage() {
    const [email, setEmail] = useState('')
    // const body = document.querySelector('body')
    // body.style.backgroundColor = '#eae6ff'

    // REMOVES THE WIDTH PROPERTY OF ROOT SO THAT IT DOESNT AFFECT CSS IN OTHER PAGES
    useEffect(() => {
        const root = document.getElementById('root')
        root.style.removeProperty('width')
    })

    function saveEmail() {
        document.cookie = `email=${email}`
    }

    return (
        <>
            <section id='hero'>
                <div id='big-container-1'>
                    <div id='container-1' className='flex-row'>
                        <div id='container-1-text'>
                            <h1 id='container-1-heading'>Trellow helps teams move work forward.</h1>
                            <p id='container-1-paragraph'>
                                Collaborate, manage projects, and reach new productivity peaks.
                                From high rises to the home office, the way your team works is unique—accomplish it all with Trellow.
                            </p>
                            <input
                                id='splash-email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                            <Link to='/sign-up' >
                                <button id='sign-up-free' onClick={saveEmail}>Sign up-it's free!</button>
                            </Link>
                        </div>
                        <div id='img-1-container'>
                            <img id='img-1' src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png' alt='' />
                        </div>
                    </div>
                </div>
            </section >
            <section>
                <div id='container-2'>
                    <div id='container-2-text'>
                        <div id='text-offset'>
                            <h2 id='container-2-heading'>It's more than work. It's a way of working together.</h2>
                            <p id='container-2-paragraph'>
                                Start with a Trellow board, lists, and cards.
                                Customize and expand with more features as your teamwork grows.
                                Manage projects, organize tasks, and build team spirit—all in one place.
                            </p>
                            <Link to='/sign-up'>
                                <button id='start-doing'>Start doing →</button>
                            </Link>
                        </div>
                    </div>
                    <div id='img-2-container'>
                        <img id='img-2' src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png' alt='' />
                    </div>
                </div>
            </section>
            <footer className='flex-row'>
                {/* <span>Connect with the developer :</span> */}
                <div id="technologies" className="flex-row">
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="" />
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="" />
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="" />
                    <img src="https://camo.githubusercontent.com/023e590d931996855a7a4f8e82c3dd3a8440a0dc7db8d60eff805b8a43703584/68747470733a2f2f7365656b6c6f676f2e636f6d2f696d616765732f462f666c61736b2d6c6f676f2d343443353037414242372d7365656b6c6f676f2e636f6d2e706e67" alt="" />
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="" />
                    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="" />
                    <img src="https://avatars.githubusercontent.com/u/1066203?s=280&v=4" alt="" />
                    {/* <img src="https://i.imgur.com/v4MGQKD.png" alt="" /> */}
                    <img id='last-tech' src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="" />
                    {/* <img src="" /> */}
                </div>
                <div id='about' className='flex-row'>
                    <div className='about-img'>
                        <a href="https://github.com/bandrewi" target='_blank'>
                            <img src="GitHub.png" alt='' />
                        </a>
                    </div>
                    <div>
                        <a href="https://www.linkedin.com/in/andrew-bui-26b718237/" target='_blank'>
                            <img id='linkedIn-logo' src="https://i.imgur.com/hLlhx14.png" alt='' />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}