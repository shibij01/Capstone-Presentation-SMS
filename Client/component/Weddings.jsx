import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { Box } from "@mui/material";
import WeddingBanner from "../src/images/WeddingBanner.jpg"
import ModalImage from "react-modal-image";

export default function Weddings() {

    let imageList = [
        {
          "id": 3,
          "title": "Image 3",
          "url": "../src/images/Wedding3.jpg"
        },
        {
          "id": 4,
          "title": "Image 4",
          "url": "../src/images/Wedding4.jpg"
        },
        {
          "id": 5,
          "title": "Image 5",
          "url": "../src/images/Wedding5.jpg"
        }
    ]

    return (
        <>
        <Box
            sx={{
                
                width: '100%',
                height: '250px',
                overflow: "hidden",
                my: '16px',
                backgroundImage: `url(${WeddingBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 5
            }}
        > 
        <Typography variant="h2" color="primary" ml={8}>Wedding</Typography>
        </Box>
        <Container>
        <ImageList variant="masonry" cols={3} gap={8}>
            {imageList.length > 0 && imageList.map((item) => { 
                return <ImageListItem key={item.id} sx={{boxShadow: 5}}>
                    <ModalImage key={item.id} 
                      small={`${item.url}`}
                      large={`${item.url}`}
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