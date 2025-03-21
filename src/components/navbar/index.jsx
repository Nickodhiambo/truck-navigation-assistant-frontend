import { NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <nav class="navbar">
            <div class="navbar-brand">
                <NavLink to={'/dashboard'}>TruckerLog</NavLink>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <NavLink to={'/dashboard'}>Dashboard</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to={'/plan-trip'}>Plan Trip</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to={'/log-sheets'}>Log Sheets</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to={'/profile'}>Profile</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to={'/dashboard'}><button class="btn-logout">Logout</button></NavLink>
                </li>
            </ul>
        </nav>
    )
}