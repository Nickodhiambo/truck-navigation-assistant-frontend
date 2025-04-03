
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import MapView from '../../components/MapView/index.jsx';


const TripPlanner = () => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [currentHours, setCurrentHours] = useState(0);
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Get current hours data
        const fetchHoursData = async () => {
            try {
                const response = await api.get('/api/hours-of-service/current/');
                setCurrentHours(response.data.cycle_used);
            } catch (err) {
                console.error('Error fetching hours data:', err);
            }
        };

        // Get current location
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        reverseGeocode(latitude, longitude);
                    },
                    error => {
                        console.error('Error getting location:', error);
                    }
                );
            }
        };

        const reverseGeocode = async (lat, lng) => {
            try {
                const response = await api.get(`/api/geocode/reverse/?lat=${lat}&lng=${lng}`);
                setCurrentLocation(response.data.formatted_address);
            } catch (err) {
                console.error('Error with reverse geocoding:', err);
            }
        };

        fetchHoursData();
        getCurrentLocation();
    }, []);

    const handlePlanTrip = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/routes/plan/', {
                current_location: currentLocation,
                pickup_location: pickupLocation,
                dropoff_location: dropoffLocation,
            });

            setRouteData(response.data);
        } catch (err) {
            setError('Failed to plan route. Please check your inputs and try again.');
            console.error('Error planning route:', err);
        } finally {
            setLoading(false);
        }

    };

    const handleGenerateLog = async () => {
        try {
            // Set responseType to 'blob' to handle binary data
            const response = await api.get('/api/driver-logs/pdf/', {
                responseType: 'blob'
            });

            // Create a blob URL for the PDF
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'driver_log.pdf');
            document.body.appendChild(link);
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <div className="trip-planner">
            <h1>Plan Your Trip</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="trip-planner-grid">
                <div className="planner-form-container">
                    <form onSubmit={handlePlanTrip} className="planner-form">
                        <div className="form-group">
                            <label htmlFor="currentLocation">Current Location</label>
                            <input
                                type="text"
                                id="currentLocation"
                                value={currentLocation}
                                onChange={(e) => setCurrentLocation(e.target.value)}
                                required
                                placeholder="Enter your current location"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pickupLocation">Pickup Location</label>
                            <input
                                type="text"
                                id="pickupLocation"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                required
                                placeholder="Enter pickup location"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dropoffLocation">Dropoff Location</label>
                            <input
                                type="text"
                                id="dropoffLocation"
                                value={dropoffLocation}
                                onChange={(e) => setDropoffLocation(e.target.value)}
                                required
                                placeholder="Enter dropoff location"
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Planning...' : 'Plan Route'}
                        </button>
                    </form>
                </div>

                <div className="map-container">
                    {routeData ? (
                        <MapView routeData={routeData} />
                    ) : (
                        <div className="map-placeholder">
                            <p>Enter locations to see your route</p>
                        </div>
                    )}
                </div>
            </div>

            {routeData && (
                <div className="route-details">
                    <h2>Route Summary</h2>
                    <div className="route-summary">
                        <div className="summary-item">
                            <h3>Total Distance</h3>
                            <p>{routeData.total_distance} miles</p>
                        </div>
                        <div className="summary-item">
                            <h3>Driving Time</h3>
                            <p>{routeData.driving_hours} hours</p>
                        </div>
                        <div className="summary-item">
                            <h3>Total Trip Time</h3>
                            <p>{routeData.total_hours} hours</p>
                        </div>
                        <div className="summary-item">
                            <h3>Required Stops</h3>
                            <p>{routeData.required_stops} stops</p>
                        </div>
                    </div>

                    <h2>Stop Schedule</h2>
                    <div className="stops-list">
                        {routeData.stops.map((stop, index) => (
                            <div key={index} className="stop-item">
                                <div className="stop-marker">{index + 1}</div>
                                <div className="stop-details">
                                    <h3>{stop.type === 'rest' ? 'Required Rest Stop' : stop.type}</h3>
                                    <p><strong>Location:</strong> {stop.location}</p>
                                    <p><strong>Arrival:</strong> {stop.arrival_time}</p>
                                    <p><strong>Duration:</strong> {stop.duration} hours</p>
                                    {stop.type === 'fuel' && <p><strong>Type:</strong> Fuel Stop</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-buttons">
                        {/* <button onClick={handleAllTrips} className="btn-primary">Save Trip</button> */}
                        <button onClick={handleGenerateLog} className="btn-secondary">Generate Log Sheets</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripPlanner