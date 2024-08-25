import { Container, Typography, Box } from "@mui/material";
import KimColesPortrait from "../src/images/KimColesPortrait.jpg";

export default function About() {
  return (
    <>
      <Container>
      <Typography variant="h2" color="secondary" ml={8}>About</Typography>
        <Box display= "flex" justifyContent= "center" alignItems= "center" sx={{m:4}}>
          <img src={KimColesPortrait} width="40%"/>
        </Box>
        <Typography paragraph sx={{mx:"10%", mb:2}}>
          Kim is a certified makeup artist located in the New Jersey/New York area. She attended school in Manhattan where she received a scholarship and completed the school's master program. 
          </Typography>
          <Typography  paragraph sx={{mx:"10%", mb:2}}>
          She enjoys creating looks for brides, bridal parties and photoshoots. She also enjoys working at New York Fashion Week every season. Her goal as an artist is to make you feel like the best version of yourself while maintaining your natural beauty.
          </Typography>
          <Typography  paragraph sx={{mx:"10%", mb:2}}>
          As an experienced makeup artist, her love for makeup drives her to create versatile and luxurious looks inspired by your natural beauty. She loves creating an overall experience that helps her clients look and feel their best.
          </Typography>
          <Typography  paragraph sx={{mx:"10%", mb:2}}>
          She is also a dedicated esthetician with a deep love for skincare and makeup artistry. Her journey into the world of skincare is fueled by a genuine passion for helping others achieve radiant, healthy skin that empowers confidence from within.
          </Typography>
          <Typography  paragraph sx={{mx:"10%", mb:15}}>
          Her motto is Less is More
        </Typography>
      </Container>
    </>
  );
}
