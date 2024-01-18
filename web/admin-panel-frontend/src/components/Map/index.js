import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import SelectedMarker from '../Dashboard/SelectedMarker.png'
import L from "leaflet"


const styles ={
    container:{
        width:"100%",
        height:"calc( 100vh )",
        background:"#141414",
    },
    mapContainer:{
        height:"100%",
        width:"100%",
        "& .leaflet-container":{
            height:"100%",
        }
    },
}

const selectedLocationMarkerIcon = new L.Icon({
    iconUrl: SelectedMarker,
    iconSize:[28,40.5],
    iconAnchor:[15,40],
    popupAnchor:[0,-47]
})

function Map() {

    const location = useLocation();
    const center = { lat: 26.866909705626284, lng: 75.81898335919493 }
    const ZOOM_LEVEL = 12;
    const urlSearchParams = new URLSearchParams(location.search);
    const mapRef= useRef();
    const [coordinates,setCoordinates] = useState({
        lat:"",
        lng:""
    })
    
    useEffect(()=>{
        const lat = urlSearchParams.get("lat");
        const lng = urlSearchParams.get("lng");
        setCoordinates({lat,lng})
    },[])

  return (
    <Grid sx={styles.container}>
    <Box sx={styles.mapContainer}>
    <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
    >
                <TileLayer
                    url={"https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=2H9Bu3Li6Uk3CfX4DE79"}
                    attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                />
        <Marker
            position={[coordinates.lat,coordinates.lng]}
            icon={selectedLocationMarkerIcon}
        >
            <Popup>
                <Typography fontFamily={"Mulish"} fontSize={"16px"} color={"error"}>
                    Selected Location
                </Typography>
            </Popup>
        </Marker>
    </MapContainer>
    </Box>
    </Grid>
  )
}

export default Map