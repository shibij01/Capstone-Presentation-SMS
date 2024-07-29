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
          "id": 1,
          "title": "Image 1",
          "url": "https://scontent-lga3-2.cdninstagram.com/v/t39.30808-6/386424843_17986149329386735_4643925345267283537_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=Y0HstHN6j5oQ7kNvgFFtJqY&edm=AFg4Q8wAAAAA&ccb=7-5&ig_cache_key=MzIwNzE4NjI5NDU4NTUyNzczMA%3D%3D.2-ccb7-5&oh=00_AYDE6rbdgnMHlBZqmqPJZxSMtpHfRZirs6CvJxRXn_1iUg&oe=66A8918C&_nc_sid=0b30b7"
        },
        {
          "id": 2,
          "title": "Image 2",
          "url": "https://scontent-lga3-2.cdninstagram.com/v/t39.30808-6/369536781_17980661591386735_4670352454046182693_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=107&_nc_ohc=5CQbutkg0BAQ7kNvgEbX4ux&edm=AFg4Q8wAAAAA&ccb=7-5&ig_cache_key=MzE3NTMwNzI2OTUzMzYxOTc1NQ%3D%3D.2-ccb7-5&oh=00_AYAuDu2VXd7X0WeWJ_9IFhFoiF7E7lLMqEcc4Yyl8C5F3Q&oe=66A8B758&_nc_sid=0b30b7"
        },
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