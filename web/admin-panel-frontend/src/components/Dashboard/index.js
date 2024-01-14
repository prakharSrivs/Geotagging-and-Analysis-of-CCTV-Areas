import { Grid } from "@mui/material"
import { styles } from "./styles"
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Navbar from "./components/Navbar";
import AllCameras from "./components/AllCameras";

function Dashboard() {

  const [showSidebar,setShowSidebar] = useState(false);
  const [menuState,setMenuState] = useState("All Cameras");

  const renderMenuScreen = ()=>{
    switch(menuState){
      case "All Cameras":
        return <AllCameras />
      deafult:
        return <AllCameras />
    }
  }

  return (
    <Grid>
      <Navbar setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {renderMenuScreen()}
    </Grid>
  )
}

export default Dashboard