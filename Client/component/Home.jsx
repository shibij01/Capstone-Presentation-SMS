import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import Home1 from "../src/images/Home1.jpg"
import Home2 from "../src/images/Home2.jpg"
import Home3 from "../src/images/Home3.jpg"
import Home4 from "../src/images/Home4.jpg"
import Home5 from "../src/images/Home5.jpg"
import Home6 from "../src/images/Home6.jpg"

export default function Home() {

    const Banner = () => {
        return (
            <>
            <Typography variant="h2" color="secondary" ml={8}>Home</Typography>
            </>
        )
    }

    let imageList = [
        {
            'id': 1,
            'title': 'Home 1',
            'url': Home1
        },
        {
            'id': 5,
            'title': 'Home 5',
            'url': Home5
        },
        {
            'id': 3,
            'title': 'Home 3',
            'url': Home3
        },
        {
            'id': 2,
            'title': 'Home 2',
            'url': Home2
        },
        {
            'id': 4,
            'title': 'Home 4',
            'url': Home4
        },
        {
            'id': 6,
            'title': 'Home 6',
            'url': Home6
        }
    ]

    return (
        <>
        <Banner/>    
        <Container>
        <ImageList sx={{ width: '100%', height: '75%' }} variant="woven" cols={3} gap={15}>
            {imageList.length > 0 && imageList.map((item) => {
                return <ImageListItem key={item.id}>
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

