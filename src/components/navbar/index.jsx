import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { useContext } from "react";


export default function Navbar() {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!currentUser) return null;

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
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </li>
            </ul>
        </nav>
    )
}