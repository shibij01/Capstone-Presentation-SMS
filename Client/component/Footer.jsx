import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Footer(){

    return (
        <>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Instagram" icon={<InstagramIcon />} href="https://www.instagram.com/caked.bykim" target="_blank"/>
          <BottomNavigationAction label="Email" icon={<EmailIcon />} href="mailto:cakedbykim1@gmail.com?subject=Interest Email" target="_blank"/>
          <BottomNavigationAction label="Facebook" icon={<FacebookIcon />} href="#" target="_blank"/>
          <BottomNavigationAction label="Pinterest" icon={<PinterestIcon />} href="#" target="_blank"/>
        </BottomNavigation>
      </Paper>
        </>
    )
}