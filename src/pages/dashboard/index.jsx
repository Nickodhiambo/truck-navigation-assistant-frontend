import { NavLink } from "react-router-dom"
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/index.jsx';
import api from '../../services/api';

export default function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [hoursData, setHoursData] = useState(null);
    const [recentTrips, setRecentTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [hoursResponse, tripsResponse] = await Promise.all([
                    api.get('/api/hours-of-service/current/'),
                    api.get('/api/trips/recent/')
                ]);

                setHoursData(hoursResponse.data);
                setRecentTrips(tripsResponse.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {currentUser.first_name}</h1>
                <Link to="/plan-trip" className="btn-primary">Plan New Trip</Link>
            </div>

            <div className="dashboard-grid">
                <div className="card hours-card">
                    <h2>Hours of Service</h2>
                    {hoursData ? (
                        <div className="hours-info">
                            <div className="hours-item">
                                <h3>Cycle Used</h3>
                                <p className="hours-value">{hoursData.cycle_used} / 70 hrs</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${(hoursData.cycle_used / 70) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="hours-item">
                                <h3>Daily Limit</h3>
                                <p className="hours-value">{hoursData.daily_used} / 14 hrs</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${(hoursData.daily_used / 14) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="hours-item">
                                <h3>Driving Limit</h3>
                                <p className="hours-value">{hoursData.driving_used} / 11 hrs</p>
                                <div className="progress-bar">
                                    <div
                                        className="progress"
                                        style={{ width: `${(hoursData.driving_used / 11) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No hours data available</p>
                    )}
                </div>

                <div className="card trips-card">
                    <h2>Recent Trips</h2>
                    {recentTrips.length > 0 ? (
                        <ul className="trip-list">
                            {recentTrips.map(trip => (
                                <li key={trip.id} className="trip-item">
                                    <div className="trip-header">
                                        <h3>{trip.pickup_location} → {trip.dropoff_location}</h3>
                                        <span className={`trip-status status-${trip.status.toLowerCase()}`}>
                                            {trip.status}
                                        </span>
                                    </div>
                                    <div className="trip-details">
                                        <p><strong>Distance:</strong> {trip.distance} miles</p>
                                        <p><strong>Estimated Time:</strong> {trip.estimated_hours}h</p>
                                        {trip.start_time && (
                                            <p><strong>Started:</strong> {new Date(trip.start_time).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No recent trips</p>
                    )}
                    <Link to="/log-sheets" className="btn-secondary">View All Logs</Link>
                </div>
            </div>
        </div>
    );
};