import "../styles/nav.scss"
import { useNavigate } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()


    return (
        <nav className='nav-bar' >
            <p>Insta</p>
            <div className="right">
                <button onClick={() => { navigate("/login") }}
                    className='button login'>Login
                </button>
                <button onClick={() => { navigate("/register") }}
                    className='button register'>Register
                </button>
                <button
                    onClick={() => { navigate("/create-post") }}
                    className='button primary-button' >new post
                </button>
            </div>

        </nav>
    )
}

export default Nav