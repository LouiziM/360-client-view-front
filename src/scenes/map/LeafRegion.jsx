import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, GeoJSON, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MarkerClusterGroup from "react-leaflet-cluster";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RegionDataDisplay from './misc/components/RegionDataDisplay';

import { ORIENTAL_MARKERS, LSH_MARKERS, TTH_MARKERS, FM_MARKERS, RSK_MARKERS, CS_MARKERS, BMK_MARKERS, DT_MARKERS, SM_MARKERS, GON_MARKERS, DOE_MARKERS, MS_MARKERS } from "./misc/data/locations";
import { RSK, BMK, LSH, SM, CS, ORIENTAL, FM, DT, GON, MS, TTH, DOE } from './misc/data/Regions';

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

const LeafRegion = ({ regionId, onReturn, theme }) => {
    const mapRef = useRef();
    const region = regionDataMap[regionId];
    const markersData = {
        1: LSH_MARKERS,
        2: ORIENTAL_MARKERS,
        3: TTH_MARKERS,
        4: FM_MARKERS,
        5: RSK_MARKERS,
        6: CS_MARKERS,
        7: BMK_MARKERS,
        8: DT_MARKERS,
        9: SM_MARKERS,
        10: GON_MARKERS,
        11: DOE_MARKERS,
        12: MS_MARKERS,
    };
    const [hoveredsTooltip, setHoveredsTooltip] = useState(null);
    const [showAllRegions, setShowAllRegions] = useState(false);

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

    const toggleRegionsVisibility = () => {
        setShowAllRegions(!showAllRegions);
    };

    const onEachRegion = (feature, layer) => {
        const regionName = feature.properties.region;

        layer.bindTooltip(regionName, {
            pane: 'tooltipPane',
            direction: 'top',
            permanent: false,
            sticky: false,
            opacity: 0.9,
            className: 'custom-tooltip',
        });

        layer.on('mouseover', function (e) {
            this.openTooltip();
            setHoveredsTooltip(layer?.feature?.properties?.id)
            console.log(hoveredsTooltip);
            console.log("layer", layer)
        });
        layer.on('mouseout', function (e) {
            setHoveredsTooltip(null)
     
        });
    };

    // useEffect(() => {
    //     console.log("hoveredsTooltip : ", hoveredsTooltip);
    // }, [hoveredsTooltip]);
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
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" />
                {showAllRegions && Object.keys(regionDataMap).map((regionKey) => (

                    <MarkerClusterGroup
                        key={regionKey}
                        chunkedLoading
                        showCoverageOnHover={false}
                        spiderfyDistanceMultiplier={2}>

                        {markersData[regionKey].results.map((address, index) => (
                            <Marker
                                key={index}
                                position={[
                                    address.lat ? address.lat : 0,
                                    address.lng ? address.lng : 0
                                ]}
                                title={address.name}
                                icon={customIcon}
                            />
                        ))}
                    </MarkerClusterGroup>
                ))}
                {!showAllRegions && region && (
                    <MarkerClusterGroup
                        chunkedLoading
                        showCoverageOnHover={false}
                        spiderfyDistanceMultiplier={2}>

                        {markersData[regionId].results.map((address, index) => (
                            <Marker
                                key={index}
                                position={[
                                    address.lat ? address.lat : 0,
                                    address.lng ? address.lng : 0
                                ]}
                                title={address.name}
                                icon={customIcon}
                            />
                        ))}
                    </MarkerClusterGroup>
                )}
                {showAllRegions && Object.keys(regionDataMap).map((regionKey) => (
                    <GeoJSON key={regionKey} data={regionDataMap[regionKey]} onEachFeature={onEachRegion} />
                ))}
                {!showAllRegions && region && <GeoJSON data={region} onEachFeature={onEachRegion} />}
                <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: '1000' }}>
                    <button onClick={onReturn} style={{ backgroundColor: theme.palette.secondary.light, border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                        <KeyboardReturnIcon style={{ fontSize: '40px', color: theme.palette.neutral[0] }} />
                    </button>
                    <button onClick={toggleRegionsVisibility} style={{ backgroundColor: theme.palette.secondary.light, border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                        {showAllRegions ? <VisibilityOffIcon style={{ fontSize: '40px', color: theme.palette.neutral[0] }} /> : <VisibilityIcon style={{ fontSize: '40px', color: theme.palette.neutral[0] }} />}
                    </button>
                </div>
              
            </MapContainer>
            {hoveredsTooltip && (
                    <RegionDataDisplay markersData={markersData[hoveredsTooltip]} />
            )}
        </div>
    );
};

export default LeafRegion;
