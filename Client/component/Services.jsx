import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ServicesBanner from "../src/images/ServicesBanner.jpg";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

export default function Services() {
    return (
        <>
        <Box
            sx={{
                
                width: '100%',
                height: '250px',
                overflow: "hidden",
                my: '16px',
                backgroundImage: `url(${ServicesBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 5
            }}
        > 
        <Typography variant="h2" color="primary" ml={8}>Services</Typography>
        </Box>
        <Container>
        <Typography variant="h4" color="secondary" ml={8}>Makeup Services</Typography>
        <List>
            <ListItemText sx={{mx:10, px:2, pb:1}}>Makeup including lashes</ListItemText>
            <ListItemText sx={{mx:10, px:2, pb:1}}>Makeup excluding lashes</ListItemText>
            <ListItemText sx={{mx:10, px:2, pb:1}}>Hair Styling</ListItemText> 
            <ListItemText sx={{mx:10, px:2, pb:1}}>Makeup & Hair Styling</ListItemText>
        </List>
        <Typography variant="h4" color="secondary" ml={8}>Esthetician Services</Typography>
        <List>
            <ListItemText sx={{mx:10, px:2, pb:1}}>Facials</ListItemText> 
            <ListItemText sx={{mx:10, px:2, pb:1}}>Eyelash Extensions</ListItemText>
            <ListItemText sx={{mx:10, px:2, pb:1}}>Chemical Peels</ListItemText>
        </List>
        </Container>
        </>
    )
}