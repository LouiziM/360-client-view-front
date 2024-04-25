import React from 'react';

const RegionDataDisplay = ({ markersData }) => {
    return (
        <div >
            <h2>Region Data</h2>
            <ul>
            <strong>Count:</strong> {markersData.count} <br />

                {markersData.results.map((marker, index) => (
                    <li key={index}>

                        <strong>Name:</strong> {marker.name} <br />
                        <strong>Latitude:</strong> {marker.lat} <br />
                        <strong>Longitude:</strong> {marker.lng} <br />
                        <strong>Country:</strong> {marker.country} <br />
                        <strong>Services:</strong> {marker.services} <br />
                        <strong>Model Name:</strong> {marker.model_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegionDataDisplay;
