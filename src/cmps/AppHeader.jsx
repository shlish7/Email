import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="app-header">
        <h1>Emails</h1>
        <nav>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/aboutUs" >About Us</NavLink>
            <NavLink to="/emailIndex" >Email</NavLink>
        </nav>
    </header>
}
