import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function AppHeader() {
    const navigate = useNavigate()


    return (
        <header className={`app-header `}>
            <section className="container">
                <h1>Toys</h1>
                <button onClick={() => navigate(-1)}>Back</button>
                <nav>
                    <NavLink to='/' >Home</NavLink>
                    <NavLink to='/about' >About</NavLink>
                    <NavLink to='/toy' >Robots</NavLink>
                </nav>
            </section>

        </header>
    )
}
