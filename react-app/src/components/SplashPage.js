import { Link } from 'react-router-dom'
import './splash.css'

export default function SplashPage() {
    const body = document.querySelector('body')
    body.style.backgroundColor = '#eae6ff'

    return (
        <section>
            <div id='big-container-1'>
                <div id='container-1' className='flex-row'>
                    <div id='container-1-text'>
                        <h1 id='container-1-heading'>Trellow helps teams move work forward.</h1>
                        <p id='container-1-paragraph'>
                            Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Trellow.
                        </p>
                        <button id='sign-up-free'>Sign up-it's free!</button>
                        <Link to='/sign-up' />
                    </div>
                    <div id='img-1-container'>
                        <img id='img-1' src='https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png' alt='' />
                    </div>
                </div>
            </div>
        </section >
    )
}