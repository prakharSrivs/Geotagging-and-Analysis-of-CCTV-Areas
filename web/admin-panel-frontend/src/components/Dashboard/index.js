import { Grid } from "@mui/material"
import { styles } from "./styles"
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AllCameras from "./components/AllCameras";
import SearchVehicle from "./components/SearchVehicle";

function Dashboard() {

  const [showSidebar,setShowSidebar] = useState(false);
  const [menuState,setMenuState] = useState("All Cameras");

  const renderMenuScreen = ()=>{
    switch(menuState){
      case "All Cameras":
        return <AllCameras />
      case "Search Vehicle":
        return <SearchVehicle/>
      deafult:
        return <AllCameras />
    }
  } 

  return (
    <Grid>
      <Navbar setShowSidebar={setShowSidebar} menuState={menuState} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} setMenuState={setMenuState} />
      {renderMenuScreen()}
    </Grid>
  )
}

export default Dashboard