import { Box, Grid, TextField, Button, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const styles = {
    root:{
        height:"100vh",
        width:"100%",
        background:"grey",
        paddingTop:"20px",
    },
    container:{
        maxWidth:"800px",
        width:"800px",
        height:"100%",
        margin:"0px auto 0 auto",
        borderRadius:"10px",
    },
    searchInput:{
        position:"relative",
        "& svg":{
            position:"absolute",
            right:"10px",
            fontSize:"40px",
            top:"8px",
        },
        "& .MuiInputBase-input":{
            background:"#CDCDCD",
            borderRadius:"4px",
        }
    },
    searchResultsCard:{
        fontFamily:"Poppins",
        fontSize:"20px",
        backgroundColor:"#CDCDCD",
        borderRadius:"4px",
        padding:"20px 15px",
    },
    cardHeader:{
        display:'flex',
        justifyContent:"space-between",
        alignItems:"center",
    }
}

function SearchVehicle() {
  return (
    <Grid sx={styles.root}>
        <Grid sx={styles.container}>
            <Box sx={styles.searchInput} mb={"20px"}>
            <TextField label={""} id="margin-none" placeholder="Enter a number plate" background={"white"} fullWidth />
            <SearchIcon />
            </Box>
            <Typography
                fontFamily={"Mulish"}
                fontSize={"20px"}
                fontStyle={500}
                textAlign={"left"}
                ml={"10px"}
            >
                Search Results
            </Typography>
            <Box sx={styles.searchResultsCard} my={"20px"}>
                <Grid sx={styles.cardHeader}>
                    <Box>Vehicle No - RJ 23 X 2343</Box>
                    <Box>12:34 PM 12 January 2023</Box>
                </Grid>
                <Button variant="contained" color={"primary"} sx={{marginTop:"20px"}}>
                    <LocationOnIcon mr={"2px"}/> Check on map 
                </Button>
            </Box> 
        </Grid>

    </Grid>
  )
}

export default SearchVehicle