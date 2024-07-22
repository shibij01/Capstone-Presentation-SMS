import { Box, Container, ImageList,ImageListItem, Typography } from "@mui/material";
import homeBanner from "../src/images/homeBanner.jpg"

export default function Home() {

    const Banner = () => {
        return (
            <>
            <Box
                sx={{
                    width: '100%',
                    height: '280px',
                    marginTop: '16px',
                    backgroundImage: `url(${homeBanner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: 5
                }}                
            >
                <Typography variant="h2" color="primary" ml={8}>Home.</Typography>
            </Box>
            </>
        )
    }

    let imageList = [
        {
            'id': 1,
            'title': 'sample 1',
            'url': '../src/images/sample1.jpg'
        },
        {
            'id': 2,
            'title': 'sample 2',
            'url': '../src/images/sample2.jpg'
        },
        {
            'id': 3,
            'title': 'sample 3',
            'url': '../src/images/sample3.jpg'
        },
        {
            'id': 4,
            'title': 'sample 4',
            'url': '../src/images/sample4.jpg'
        },
        {
            'id': 5,
            'title': 'sample 5',
            'url': '../src/images/sample5.jpg'
        },
        {
            'id': 6,
            'title': 'sample 6',
            'url': '../src/images/sample6.jpg'
        },
    ]

    return (
        <>
        <Banner/>    
        <Container>
        <ImageList sx={{ width: '100%', height: '75%' }} variant="woven" cols={3} gap={15}>
  {imageList.length > 0 && imageList.map((item) => {
    return <ImageListItem key={item.img} sx={{boxShadow: 5}}>
      <img
        srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
        src={`${item.url}?w=161&fit=crop&auto=format`}
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

