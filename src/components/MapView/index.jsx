import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// const [coords, setCoords] = useState([])

// Custom marker icons for different stop types
const getMarkerIcon = (type) => {
    const colors = {
        pickup: 'green',
        dropoff: 'red',
        rest: 'blue',
        fuel: 'orange'
    };

    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color:${colors[type] || 'gray'};" class="marker-pin"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });
};

const MapView = ({ routeData }) => {
    
    // If no route data, return null or a placeholder
    if (!routeData || !routeData.stops) {
        return <div>No route data available</div>;
    }

    // Extract coordinates from stops (mock implementation)
    const stopCoordinates = routeData.stops.map((stop, index) => {
        let coodString = stop.coordinates
        let coodList = coodString.split(',').map(num => parseFloat(num))
        coodList.reverse()
        let stopType = stop.type
        const baseCoords = {};
        baseCoords[stopType] = coodList


        // Slightly offset each coordinate to spread out markers
        return [
            baseCoords[stop.type][0] + (index * 0.05),
            baseCoords[stop.type][1] + (index * 0.05)
        ];
    });

    // Create route line coordinates
    const routeCoordinates = stopCoordinates;

    return (
        <MapContainer
            center={[-0.0236, 37.9062]}
            zoom={7}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Render route line */}
            <Polyline
                positions={routeCoordinates}
                color="blue"
                weight={3}
                opacity={0.7}
            />

            {/* Render markers for each stop */}
            {routeData.stops.map((stop, index) => (
                <Marker
                    key={index}
                    position={stopCoordinates[index]}
                    icon={getMarkerIcon(stop.type)}
                >
                    <Popup>
                        <strong>{stop.type.charAt(0).toUpperCase() + stop.type.slice(1)} Stop</strong>
                        <br />
                        Location: {stop.location}
                        <br />
                        Arrival Time: {stop.arrival_time}
                        <br />
                        Duration: {stop.duration} hrs
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;