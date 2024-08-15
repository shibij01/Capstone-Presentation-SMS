import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import { Link, NavLink } from "react-router-dom"

export default function Navigation(){

    return (
        <>
        <img src="/images/CakedByKim.jpg" height={100} width={100} />
        <Typography color="secondary" sx={{mt: 2, px: 2, float: 'right'}}>
        Kim Coles <br/> Makeup Artist | Esthetician
        </Typography>
        
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Divider orientation="horizontal" variant="fullWidth" flexItem />
        <Link to="/about">About</Link>
        <ButtonGroup color="secondary" variant="text" aria-label="Basic button group" sx={{alignContent: "center"}}>
            <Button><NavLink to="/">HOME</NavLink></Button>
            <Button><NavLink to="/portfolio">PORTFOLIO</NavLink></Button>
            <Button><NavLink to="/weddings">WEDDINGS</NavLink></Button>
            <Button><NavLink to="/editorials">EDITORIALS</NavLink></Button>
            <Button><NavLink to="/about">About</NavLink></Button>
            <Button><NavLink to="/inquire">INQUIRE</NavLink></Button>
            <Button><NavLink to="/services">SERVICES</NavLink></Button>
        </ButtonGroup>
        </Box>
        </>
    )
}