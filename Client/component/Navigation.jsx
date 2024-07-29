import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"

export default function Navigation(){

    return (
        <>
        <img src="/images/CakedByKim.jpg" height={100} width={100} />
        <Typography color="secondary" sx={{mt: 2, px: 2, float: 'right'}}>
        Kim Coles <br/> Makeup Artist | Esthetician
        </Typography>
        
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
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