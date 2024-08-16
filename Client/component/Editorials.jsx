import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { Box } from "@mui/material";
import EditorialBanner from "../src/images/EditorialBanner.jpg"
import Editorial1 from "../src/images/Editorials1.jpg"
import Editorial2 from "../src/images/Editorials2.jpg"
import Editorial3 from "../src/images/Editorials3.jpg"

import ModalImage from "react-modal-image";

export default function Editorials() {

    let imageList = [
        {
          "id": 1,
          "title": "Image 1",
          "url": Editorial1
        },
        {
          "id": 2,
          "title": "Image 2",
          "url": Editorial2
        },
        {
          "id": 3,
          "title": "Image 3",
          "url": Editorial3
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
                backgroundImage: `url(${EditorialBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 5
            }}
        > 
        <Typography variant="h2" color="primary" ml={8}>Editorials</Typography>
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
