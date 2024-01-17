import { Box, Button, CircularProgress, Dialog, DialogActions, DialogTitle, Grid, LinearProgress, Slider, Typography } from '@mui/material'
import { MapContainer, Marker, Popup, useMapEvents } from 'react-leaflet';
import CustomMarkerIcon from '../CustomMarker.png'
import MyLocationMarker from '../MyLocationMarker.png'
import SelectedMarker from '../SelectedMarker.png'
import { TileLayer } from 'react-leaflet';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import useGeoLocation from '../hooks/useGeoLocation';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
var dist = require('geo-distance-js');

const styles = {
    container:{
        width:"100%",
        height:"calc( 100vh - 65px )",
        background:"#141414",
    },
    mapContainer:{
        height:"100%",
        width:"100%",
        "& .leaflet-container":{
            height:"100%",
        }
    },
    locateMeButton:{
        position:"absolute",
        right:"50px",
        bottom:"50px",
        zIndex:"1000",
        "& svg":{
            marginRight:"5px"
        }
    },
    filtersButton:{
        position:"absolute",
        right:"50px",
        bottom:"100px",
        zIndex:"1000",
        "& svg":{
            marginRight:"5px"
        }
    },
    loadingContainer:{
        width:"100%",
        height:"100%",
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
    },
    dialogBodyContainer:{
        padding:"10px 40px",
        width:"400px",
        paddingTop:"0",
    },
    dialogCloseIcon:{
        cursor:"pointer",
    },
    dialogHeader:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    }
}

const markerIcon = new L.Icon({
    iconUrl: CustomMarkerIcon,
    iconSize:[28,40.5],
    iconAnchor:[15,40],
    popupAnchor:[0,-47]
})

const myLocationMarkerIcon = new L.Icon({
    iconUrl: MyLocationMarker,
    iconSize:[28,40.5],
    iconAnchor:[15,40],
    popupAnchor:[0,-47]
})

const selectedLocationMarkerIcon = new L.Icon({
    iconUrl: SelectedMarker,
    iconSize:[28,40.5],
    iconAnchor:[15,40],
    popupAnchor:[0,-47]
})

const FiltersDialog = ({
    open,
    setOpen,
    radius,
    setRadius,
    setFilters
})=>{

    

    return (
        <Dialog open={open} handleClose={()=>setOpen(false)} >
        <DialogTitle sx={styles.dialogHeader}>Filters  <CloseIcon sx={styles.dialogCloseIcon} onClick={()=>setOpen(false)} /></DialogTitle>
            <Box sx={styles.dialogBodyContainer}>
                <Typography fontFamily={"Mulish"} fontSize={"16px"} ml={"-10px"} mb={"10px"}>
                    Select a radius in KMs - {radius} {radius!==0 ? (radius==1 ? "KM" : "KMs") : ""}
                </Typography>
                <Slider 
                    color={"secondary"} 
                    max={10} 
                    min={0} 
                    value={radius} 
                    onChange={(e)=>setRadius(e.target.value)} 
                    step={1}
                    defaultValue={0}
                />
            </Box>
        <DialogActions>
            <Button onClick={setFilters}>
                Apply Filters
            </Button>
        </DialogActions>
        </Dialog>
    )
}

const CustomPopup = ({ownerId})=>{

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const [ownerDets,setOwnerDets] = useState({name:"",address:"",phone:""});

    const fetchOwnerDetails = async()=>{
        setLoading(true);
        try{
            const token = localStorage.getItem("auth");
            const response = await axios.get(process.env.REACT_APP_API_ENDPOINT+"admin/camOwner?uid="+ownerId,{
                headers:{
                    authorizations:token,
                }
            })
            if(response?.status===200){
                const { data } = response;
                setOwnerDets({
                    name:data?.owner[0]?.Name,
                    address:data?.owner[0]?.addressLine1,
                    phone:data?.owner[0]?.phoneNumber
                })
            }
        }
        catch(e){
            console.log(e?.message);
            setError(e?.message)
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchOwnerDetails();
    },[])
    return (
        <Popup>
        {
            loading ? <CircularProgress /> : error.length>0 ?
                <Typography fontFamily={"Mulish"} fontSize={"16px"} color={"error"}>
                    {error}
                </Typography> :
                <Typography fontFamily={"Mulish"} fontSize={"16px"}>
                {ownerDets?.name} <br/>
                {ownerDets?.address} <br/>
                {ownerDets?.phone}

                </Typography>
        }
        </Popup>
    )
}

const CustomMarker = ({markerCoords,icon,ownerId})=>{
    return (
    <Marker 
        position={[markerCoords.lat,markerCoords.lng]}
        icon={icon}
    >
        <CustomPopup ownerId={ownerId} />
    </Marker>
    )
}

const ClickedPositionMarker = ({markerCoords,icon,name})=>{
    return (
        <Marker 
            position={[markerCoords.lat,markerCoords.lng]}
            icon={icon}
        >
            <Popup>
                <Typography fontFamily={"Mulish"} fontSize={"16px"} color={"error"}>
                    {name}
                </Typography>
            </Popup>
        </Marker>
        )
}

function AllCameras() {

    const center = { lat: 26.866909705626284, lng: 75.81898335919493 }
    const ZOOM_LEVEL = 12;
    const markerCoords = { lat:26.826818472679427, lng:75.80604369304889}
    const { location, fetchLocation } = useGeoLocation();
    const mapRef = useRef();
    const [error,setError] = useState("");
    const [fetching,setFetching] = useState(false);
    const [camerasData,setCamerasData] = useState([]);
    const [markedPosition,setMarkedPosition] = useState({lat:"",lng:""});
    const [filteredData,setFilteredData] = useState([]);
    const [radius,setRadius] = useState(0);
    const [showFiltersDialog,setShowFilterDialog] = useState(false);
    const navigate = useNavigate();

    const setFilters = ()=>{
        if(radius===0){
            setFilteredData([]);
        }else{
            const tempFilteredData = camerasData.filter((camera)=>{
                return calculateDistance(markedPosition,{ lat:camera.latitude, lng:camera.longitude }) < radius ;
            })
            setFilteredData(tempFilteredData);
        }
        setShowFilterDialog(false);
    }

    const handleLocationFetch = ()=>{
        fetchLocation();
        if(location.loaded){
            mapRef?.current?.flyTo(
                [location.coordinates.lat, location.coordinates.lng],
                ZOOM_LEVEL,
                { animate: true }
            );
        }
    }

    const handleFiltersButtonClick = ()=>{
        if(markedPosition.lat.length && markedPosition.lng.length){
            if(radius==0){
                setShowFilterDialog(true);
            }else{
                setRadius(0);
            }
        }else{
            alert("First select a location on the map, by clicking anywhere on the map")
        }
    }

    const MapEvents = () => {
        useMapEvents({
          click(e) {
            setMarkedPosition({
                lat:`${e.latlng.lat}`,
                lng:`${e.latlng.lng}`
            });
          },
        });
        return false;
    }

    const calculateDistance = (coord1, coord2) => {
        const R = 6371; // Earth radius in kilometers
        const dLat = deg2rad(coord2.lat - coord1.lat);
        const dLng = deg2rad(coord2.lng - coord1.lng);
    
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(coord1.lat)) *
            Math.cos(deg2rad(coord2.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
    
        return distance;
    };
    
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    useEffect(()=>{

        const token = localStorage.getItem("auth");

        const fetchCameraData = async()=>{
            setFetching(true);
            const uid = localStorage.getItem("userId");
            try{
                const response = await axios.get(process.env.REACT_APP_API_ENDPOINT+"admin/getCameras?uid="+uid,{
                    headers:{
                        authorizations:token,
                    }
                })
                const { data } = response;
                setCamerasData([...data?.camera])
            }
            catch(e){
                if(e.response.status===401){
                    setError("Unauthorized Redirecting to login Page ...");
                    setTimeout(()=>{
                        navigate("/login")
                    },2000)
                }else{
                    setError(e.message)
                }
            }
            setFetching(false);
        }
        fetchCameraData();
    },[])

    if(fetching || error.length ){
        return (
            <Grid sx={styles.container}>
                <Box sx={styles.mapContainer}>
                    <Box sx={styles.loadingContainer}> 
                    <Typography fontFamily={"Mulish"} fontSize={"20px"} color={"#CDCDCD"}>
                    {
                        error.length>0 ? error : "Fetching Cameras Data..."
                    }
                    </Typography>
                    {
                        !error.length>0 &&
                        <LinearProgress sx={{height:"8px",width:"300px",borderRadius:"2px",background:"black",margin:"40px"}} />
                    }
                    </Box>
                </Box>
            </Grid>
        )
    }

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
                <MapEvents />
                <FiltersDialog 
                    setOpen={setShowFilterDialog}
                    open={showFiltersDialog}
                    radius={radius}
                    setRadius={setRadius}
                    setFilters={setFilters}
                />
                {
                    markedPosition.lat.length>0 && markedPosition.lng.length>0 &&
                    <ClickedPositionMarker 
                        markerCoords={markedPosition}
                        icon={selectedLocationMarkerIcon}
                        name={" Picked Location "}
                    />
                }
                {
                    location.loaded &&
                    <ClickedPositionMarker 
                        markerCoords={location.coordinates}
                        icon={myLocationMarkerIcon}
                        name={" Your Location "}
                    />
                }
                {
                    filteredData.length>0 ?
                    filteredData.map((data,index)=>{
                        const coordinates = {
                            lat:data.latitude,
                            lng:data.longitude
                        }
                        return (
                            <CustomMarker 
                                key={index}
                                markerCoords={coordinates}
                                icon={markerIcon}
                                ownerId={data?.owner_id}
                            />
                        )
                    }) :                    
                    camerasData.map((data,index)=>{
                        const coordinates = {
                            lat:data.latitude,
                            lng:data.longitude
                        }
                        return (
                            <CustomMarker 
                                key={index}
                                markerCoords={coordinates}
                                icon={markerIcon}
                                ownerId={data?.owner_id}
                            />
                        )
                    })
                }
            </MapContainer>
            <Button 
                variant={"contained"} 
                color='secondary' 
                sx={styles.filtersButton} 
                p={"10px 40px"} 
                onClick={handleFiltersButtonClick}
            >
                {
                    radius>0 ? <><CloseIcon/> Clear Filters </> : <><TuneIcon mr={"5px"}/> Filters </>
                }
                
            </Button>
            <Button 
                variant={"contained"} 
                color='primary' 
                sx={styles.locateMeButton} 
                p={"10px 40px"} 
                onClick={handleLocationFetch}
            >
                <MyLocationIcon mr={"5px"} /> Locate Me
            </Button>
        </Box>

    </Grid>
  )
}

export default AllCameras