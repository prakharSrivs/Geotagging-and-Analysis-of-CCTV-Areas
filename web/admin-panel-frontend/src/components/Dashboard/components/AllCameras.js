import { Box, Button, CircularProgress, Grid, LinearProgress, Typography } from '@mui/material'
import { MapContainer, Marker, Popup } from 'react-leaflet';
import CustomMarkerIcon from '../CustomMarker.png'
import MyLocationMarker from '../MyLocationMarker.png'
import { TileLayer } from 'react-leaflet';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import useGeoLocation from '../hooks/useGeoLocation';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    loadingContainer:{
        width:"100%",
        height:"100%",
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
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

function AllCameras() {

    const center = { lat: 26.866909705626284, lng: 75.81898335919493 }
    const ZOOM_LEVEL = 12;
    const markerCoords = { lat:26.826818472679427, lng:75.80604369304889}
    const { location, fetchLocation } = useGeoLocation();
    const mapRef = useRef();
    const [error,setError] = useState("");
    const [fetching,setFetching] = useState(false);
    const [camerasData,setCamerasData] = useState([]);
    const navigate = useNavigate();

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
                {
                    location.loaded &&
                    <CustomMarker 
                        markerCoords={location.coordinates}
                        icon={myLocationMarkerIcon}
                        name={" Your Location "}
                    />
                }
                {
                    camerasData.map((data,index)=>{
                        return (
                            <CustomMarker 
                                key={index}
                                markerCoords={{lat:data.latitude,lng:data.longitude}}
                                icon={markerIcon}
                                ownerId={data?.owner_id}
                            />
                        )
                    })
                }
            </MapContainer>
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