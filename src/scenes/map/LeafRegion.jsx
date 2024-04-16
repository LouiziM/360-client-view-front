import React, { useRef, useEffect } from 'react';
import { MapContainer, GeoJSON, TileLayer,Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MarkerClusterGroup from "react-leaflet-cluster";

import { data } from "./misc/data/locations";
import { RSK, BMK, LSH, SM, CS, ORIENTAL, FM, DT, GON, MS, TTH, DOE } from './misc/data/Regions';
// map.flyToBounds([center]);

const regionDataMap = {
    1: LSH,  // Laayoune-Saguia Hamra
    2: ORIENTAL,
    3: TTH,  // Tanger-Tetouan-Hoceima
    4: FM,   // Fes-Meknes
    5: RSK,  // Rabat-Sale-Kenitra
    6: CS,   // Casablanca-Settat
    7: BMK,  // Beni Mellal-Khenifra
    8: DT,   // Daraa-Tafilelt
    9: SM,   // Souss Massa
    10: GON, // Guelmim-Oued Noun
    11: DOE, // Dakhla-Oued Eddahabs
    12: MS,  // Marrakech-Safi
  
};

const LeafRegion = ({ regionId, onReturn ,theme }) => {
    const mapRef = useRef();
    const region = regionDataMap[regionId];
    console.log(regionId)

    const customIcon = new L.Icon({
        iconUrl: require("./misc/image.svg").default,
        iconSize: new L.Point(40, 47)
      });

    useEffect(() => {
        if (mapRef.current && region) {
            const bounds = L.geoJSON(region).getBounds();
            mapRef.current.leafletElement.fitBounds(bounds);
        }
    }, [region, regionId]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer
                center={[31.7917, -7.0926]} 
                zoom={4}
                style={{ height: "100%", width: "100%" }}
                whenCreated={mapInstance => {
                    mapRef.current = mapInstance;
                }}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"/>
                {region && <GeoJSON data={region} />}
                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '1000' }}>
                    <button onClick={onReturn} style={{ backgroundColor: theme.palette.secondary.light, border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                        <KeyboardReturnIcon style={{ fontSize: '40px', color:theme.palette.neutral[0] }}/>
                    </button>
                </div>
                <MarkerClusterGroup chunkedLoading>
                    {data.results.map((address, index) => (
                        <Marker
                        key={index}
                        position={[
                            address.lat ? address.lat : 0,
                            address.lng ? address.lng : 0
                        ]}
                        title={address.name}
                        icon={customIcon}
                        ></Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};

export default LeafRegion;
