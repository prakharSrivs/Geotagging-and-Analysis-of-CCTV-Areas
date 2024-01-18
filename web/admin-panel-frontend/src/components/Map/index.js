import { Box, Grid, LinearProgress, Typography } from '@mui/material';
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
    const ZOOM_LEVEL = 12;
    const urlSearchParams = new URLSearchParams(location.search);
    const mapRef= useRef();
    const [coordinates,setCoordinates] = useState({
        lat:"",
        lng:""
    })
    const center = coordinates;

    
    useEffect(()=>{
        const lat = urlSearchParams.get("lat");
        const lng = urlSearchParams.get("lng");
        setCoordinates({
            lat,lng
        })
    },[])

  return (
    <Grid sx={styles.container}>
    <Box sx={styles.mapContainer}>
    {
        (coordinates.lat.length>0 && coordinates.lng.length>0) ?
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
        </MapContainer> :
        <Grid width={"100vw"} height={"100vh"}>
            <LinearProgress />
        </Grid>
    }
    </Box>
    </Grid>
  )
}

export default Map