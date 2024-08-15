import { useEffect, useState } from "react"
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/material";
import PortfolioBanner from "../src/images/PortfolioBanner.jpg"
import ModalImage from "react-modal-image";

export default function Portfolio() {
    const url = "https://cakedbykim-capstone-presentation-sms.onrender.com";
    const [mediaList, setMediaList] = useState([]);

    useEffect(() => {
        getIGMedia();
    }, []);

    async function getIGMedia() { 
        const response = await fetch(url+"/cakedByKim/getIGMedia", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            });

        const data = await response.json();
        setMediaList(data);
    }

    return (
        <>
        <Box
            sx={{
                
                width: '100%',
                height: '250px',
                overflow: "hidden",
                my: '16px',
                backgroundImage: `url(${PortfolioBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 5
            }}
        > 
        <Typography variant="h2" color="primary" ml={8}>Portfolio</Typography>
        </Box>
        <Container>
        <ImageList variant="masonry" cols={3} gap={8}>
                {mediaList.length > 0 && mediaList.map((item) => { 
                    return <ImageListItem key={item.mediaId} sx={{boxShadow: 5}}>
                         <ModalImage 
                            small={`${item.mediaURL}`}
                            large={`${item.mediaURL}`}
                            hideDownload
                            hideZoom
                            loading="lazy"
                            />
                        </ImageListItem>
                })}
        </ImageList>
        </Container>
        </>
    )
}