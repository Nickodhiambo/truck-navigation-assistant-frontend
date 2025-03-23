import { NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to={'/dashboard'}>TruckerLog</NavLink>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/plan-trip'}>Plan Trip</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/log-sheets'}>Log Sheets</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/profile'}>Profile</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/signup'}>Sign Up</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/login'}>Sign In</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/dashboard'}><button className="btn-logout">Logout</button></NavLink>
                </li>
            </ul>
        </nav>
    )
}