import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import homeBanner from "../src/images/homeBanner.jpg"
import sample1 from "../src/images/sample1.jpg"
import sample2 from "../src/images/sample2.jpg"
import sample3 from "../src/images/sample3.jpg"
import sample4 from "../src/images/sample4.jpg"
import sample5 from "../src/images/sample5.jpg"
import sample6 from "../src/images/sample6.jpg"

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
            'url': sample1
        },
        {
            'id': 2,
            'title': 'sample 2',
            'url': sample2
        },
        {
            'id': 3,
            'title': 'sample 3',
            'url': sample3
        },
        {
            'id': 4,
            'title': 'sample 4',
            'url': sample4
        },
        {
            'id': 5,
            'title': 'sample 5',
            'url': sample5
        },
        {
            'id': 6,
            'title': 'sample 6',
            'url': sample6
        },
    ]

    return (
        <>
        <Banner/>    
        <Container>
        <ImageList sx={{ width: '100%', height: '75%' }} variant="woven" cols={3} gap={15}>
            {imageList.length > 0 && imageList.map((item) => {
                return <ImageListItem key={item.id} sx={{boxShadow: 5}}>
                <img
                    srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
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

