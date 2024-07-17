import { Button, Container, Typography, ImageList, ImageListItem} from "@mui/material"

export default function SamplePage(){
    let imageList = [
        {
          "id": 1,
          "title": "Image 1",
          "url": "/images/image1.jpg"
        },
        {
          "id": 2,
          "title": "Image 2",
          "url": "/images/image2.jpg"
        },
        {
          "id": 3,
          "title": "Image 3",
          "url": "/images/image3.jpg"
        },
        {
          "id": 4,
          "title": "Image 4",
          "url": "/images/image4.jpg"
        },
        {
          "id": 5,
          "title": "Image 5",
          "url": "/images/image5.jpg"
        }
    ]
        
   return (
        <>
            <Container>            
                <Typography variant="h2">
                Hello World
                </Typography>
                <Button color="primary" variant="contained">clickclick</Button>
                <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis 
                ipsum. Praesent mauris. Maecenas in magna mollis dolor sollicitudin 
                tempor. Cras ultricies mi eu turpis hendrerit fringilla
                <a>Here is a link to nowhere</a>
                </Typography>
                <ImageList variant="masonry" cols={3} gap={8}>
                {imageList.length > 0 && imageList.map((item) => { 
                    return <ImageListItem key={item.id} sx={{boxShadow: 5}}>
                        <img
                            src={`${item.url}?w=248&fit=crop&auto=format`}
                            alt={item.title}
                                loading="lazy"
                        />
                        </ImageListItem>
                })}
                </ImageList>
            </Container>
        </>
    )

}