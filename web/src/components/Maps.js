import React,{useMemo} from 'react'
import {Wrapper , Status } from '@googlemaps/react-wrapper'
import {GoogleMap,useLoadScript,Marker} from '@react-google-maps/api';
import '../cssFiles/Maps.css'
export default function Home(){
    const {isLoaded}=useLoadScript({
        googleMapsApiKey:"AIzaSyD5h8m7IuUtu2p1XZhnC2KH2oPjWUBqpG0"
    });
    if(!isLoaded) return <div>Loading ....</div>
    return <Map />
}

function Map(){
    const center =useMemo(()=>({ lat:23.86680256304501, lng:91.30977065036134}),[]);
    return (
        <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
        <Marker position={center} />
        </GoogleMap>
    )
}
