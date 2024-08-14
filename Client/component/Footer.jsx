import Paper from "@mui/material/Paper"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Footer(){

    return (
        <>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Instagram" icon={<InstagramIcon />} href="https://www.instagram.com/caked.bykim" target="_blank"/>
          <BottomNavigationAction label="Email" icon={<EmailIcon />} href="mailto:cakedbykim1@gmail.com?subject=Inquiry" target="_blank"/>
          <BottomNavigationAction label="Pinterest" icon={<PinterestIcon />} href="https://www.pinterest.com/cakedbykim1" target="_blank"/>
        </BottomNavigation>
      </Paper>
        </>
    )
}