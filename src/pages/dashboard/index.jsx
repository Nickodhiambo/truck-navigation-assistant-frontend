import { NavLink } from "react-router-dom"

export default function Dashboard() {
    return (

        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Welcome, John</h1>
                <NavLink to={'/plan-trip'} className={'btn-primary'}>Plan New Trip</NavLink>
            </div>

            <div className="dashboard-grid">
                <div className="card hours-card">
                    <h2>Hours of Service</h2>
                    <div className="hours-info">
                        <div className="hours-item">
                            <h3>Cycle Used</h3>
                            <p className="hours-value">45.5 / 70 hrs</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ 'width': '65%' }}></div>
                            </div>
                        </div>
                        <div className="hours-item">
                            <h3>Daily Limit</h3>
                            <p className="hours-value">8.5 / 14 hrs</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ 'width': '60%' }}></div>
                            </div>
                        </div>
                        <div className="hours-item">
                            <h3>Driving Limit</h3>
                            <p className="hours-value">6.5 / 11 hrs</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ 'width': '59%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card trips-card">
                    <h2>Recent Trips</h2>
                    <ul className="trip-list">
                        <li className="trip-item">
                            <div className="trip-header">
                                <h3>Chicago, IL → Detroit, MI</h3>
                                <span className="trip-status status-active">ACTIVE</span>
                            </div>
                            <div className="trip-details">
                                <p><strong>Distance:</strong> 283 miles</p>
                                <p><strong>Estimated Time:</strong> 5.2h</p>
                                <p><strong>Started:</strong> 3/20/2025</p>
                            </div>
                        </li>
                        <li className="trip-item">
                            <div className="trip-header">
                                <h3>Minneapolis, MN → Chicago, IL</h3>
                                <span className="trip-status status-completed">COMPLETED</span>
                            </div>
                            <div className="trip-details">
                                <p><strong>Distance:</strong> 407 miles</p>
                                <p><strong>Estimated Time:</strong> 7.5h</p>
                                <p><strong>Started:</strong> 3/18/2025</p>
                            </div>
                        </li>
                        <li className="trip-item">
                            <div className="trip-header">
                                <h3>Detroit, MI → Cleveland, OH</h3>
                                <span className="trip-status status-pending">SCHEDULED</span>
                            </div>
                            <div className="trip-details">
                                <p><strong>Distance:</strong> 169 miles</p>
                                <p><strong>Estimated Time:</strong> 3.1h</p>
                                <p><strong>Starts:</strong> 3/22/2025</p>
                            </div>
                        </li>
                    </ul>
                    <NavLink to={'/log-sheets'} className={'btn-secondary'}>
                        View All Logs
                    </NavLink>
                </div>
            </div>
        </div>
    )
}