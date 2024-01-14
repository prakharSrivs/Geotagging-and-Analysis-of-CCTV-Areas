import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const styles = {
    navbarContainer:{
        background:"#282324",
        width:"100vw",
        height:"65px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
    },
    primaryBox:{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        height:"100%",
    },
    secondaryBox:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
        marginRight:"20px",
    },
    menuIcon:{
        color:"white",
        fontSize:"35px",
        margin:"0 15px",
        cursor:"pointer"
    },
    logoutButton:{
        fontFamily:"Mulish",
        fontSize:"16px",
        color:"white",
        border:"2px solid white",
        "& svg":{
            marginRight:"5px",
            color:"white",
        },
    }
}

function Navbar({
    setShowSidebar
}) {

  return ( 
    <Box sx={styles.navbarContainer} >
        <Grid sx={styles.primaryBox}>
            <MenuIcon sx={styles.menuIcon} onClick={()=>setShowSidebar(true)} />
            <Typography
                fontFamily={"Montserrat"}
                fontSize={"20px"}
                color={"white"}
            >
               Dashboard
            </Typography>
        </Grid>
        <Grid sx={styles.secondaryBox}>
            <Typography
                fontFamily={"Ubuntu"}
                fontWeight={400}
                fontSize={"16px"}
                color={"white"} 
                mx={"20px"}
            >
                Hi User12
            </Typography>
            <Button variant={"outlined"} sx={styles.logoutButton} mx={"20px"}> <LogoutOutlinedIcon />  Log out</Button>
        </Grid>
    </Box>
   )
}

export default Navbar