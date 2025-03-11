import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography } from "@mui/material";

const slogans = [
  {
    slogan: "Empowering Knowledge, One Step at a Time",
    tagline:
      "Unlock your potential with expert-led tutorials designed for every skill level.",
    image: "/background/image1.png", // Replace with the actual image path
  },
  {
    slogan: "Learn, Build, and Grow Your Skills",
    tagline:
      "From basics to advanced, turn ideas into mastery with hands-on learning.",
    image: "/background/image2.png", // Replace with the actual image path
  },
];

const SloganCarousel = () => (
  <Carousel
    autoPlay
    interval={5000}
    infiniteLoop
    showThumbs={false}
    showStatus={false}
  >
    {slogans.map((slide, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on larger screens
          height: "500px",
          textAlign: "center",
        }}
      >
        {/* Left side for text */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            // backgroundColor: "#3f51b5",
            color: "#3f51b5",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            {slide.slogan}
          </Typography>
          <Typography variant="h6">{slide.tagline}</Typography>
        </Box>

        {/* Right side for image */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    ))}
  </Carousel>
);

export default SloganCarousel;
