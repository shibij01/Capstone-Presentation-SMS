import { useEffect, useState } from "react"
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ModalImage from "react-modal-image";

export default function Portfolio() {
    const [mediaList, setMediaList] = useState([]);

    useEffect(() => {
        getIGMedia();
    }, []);

    async function getIGMedia() { 
        const response = await fetch("http://localhost:3000/cakedByKim/getIGMedia", {
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
        <Typography variant="h2" color="secondary" ml={8}>Portfolio</Typography>
        <Container>
        <ImageList variant="masonry" cols={3} gap={8}>
                {mediaList.length > 0 && mediaList.map((item) => {
                   return item.mediaType == "IMAGE" ?
                     <ImageListItem key={item.mediaId}>
                          <ModalImage 
                            small={`${item.mediaURL}`}
                            large={`${item.mediaURL}`}
                            hideDownload
                            hideZoom
                            loading="lazy"
                            />
                        </ImageListItem> 
                        : item.childrenURL.map((child) => {
                            return <ImageListItem key={child.id}>
                            <ModalImage 
                            small={`${child.media_url}`}
                            large={`${child.media_url}`}
                            hideDownload
                            hideZoom
                            loading="lazy"
                            />
                            </ImageListItem>})
                })}
        </ImageList>
        </Container>
        </>
    )
}