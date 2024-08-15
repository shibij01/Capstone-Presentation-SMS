import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import ModalImage from "react-modal-image";

export default function Weddings() {

    let imageList = [
        {
          "id": 1,
          "title": "Image 1",
          "url": "../src/images/Wedding3.jpg"
        },
        {
          "id": 2,
          "title": "Image 2",
          "url": "../src/images/Wedding4.jpg"
        },
        {
          "id": 3,
          "title": "Image 3",
          "url": "../src/images/Wedding5.jpg"
        }
    ]

    return (
        <>
        <Typography variant="h2" color="secondary" ml={8}>Wedding</Typography>
        <Container>
        <ImageList variant="masonry" cols={3} gap={8}>
            {imageList.length > 0 && imageList.map((item) => { 
                return <ImageListItem key={item.id}>
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