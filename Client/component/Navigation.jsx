import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from "@mui/material/Tooltip";
import { Container, IconButton } from "@mui/material"
import { useContext } from "react"
import AdminContext from "../src/context/AdminContext";

export default function Navigation(){
    const adminContext = useContext(AdminContext);
    const isAdminLoggedIn = adminContext.loggedIn; 
    
    const handleLogout = () => {
        adminContext.logOut();
        sessionStorage.removeItem("token");
    }

    return (
        <>
        {isAdminLoggedIn && <Container >
        <Tooltip title="Log Out">
        <IconButton color="secondary" sx={{float:"right", stroke: "darkgray", strokeWidth: 1, pt: 2, pr: 0}} onClick={handleLogout}>
            <LogoutIcon fontSize="medium"/>
        </IconButton>
        </Tooltip>
        </Container> }

        <Typography color="secondary" sx={{mt: 2, px: 3, float: 'left'}} style={{fontFamily: "Abril Fatface", color: "gray", fontSize: 28}}>Caked. by Kim</Typography>
        <img src="/images/Nav.jpg" height={100} width={100}/>
        <Typography color="secondary" sx={{mt: 2, px: 3, float: 'right'}}>
        Kim Coles <br/> Makeup Artist | Esthetician
        </Typography>
        
        <Box display="flex" flexDirection="column" alignItems="center" >
        <Divider orientation="horizontal" variant="fullWidth" flexItem />
        <ButtonGroup color="secondary" variant="text" aria-label="Basic button group" sx={{alignContent: "center"}}>
            <Button href="/" >HOME</Button>
            <Button href="portfolio">PORTFOLIO</Button>
            <Button href="weddings">WEDDINGS</Button>
            <Button href="editorials">EDITORIALS</Button>
            <Button href="about">ABOUT</Button>
            <Button href="inquire">INQUIRE</Button>
            <Button href="services">SERVICES</Button>
        </ButtonGroup>
        </Box>
        </>
    )
}