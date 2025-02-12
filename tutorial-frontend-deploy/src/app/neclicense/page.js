"use client";
import { Box, Typography } from "@mui/material";
import ProgramList from "../components/programs";
import SloganCarousel from "../components/carousel";
import Footer from "../components/footer";

export default function CourseListPage() {
  return (
    <Box
      sx={{
        // backgroundImage: 'url("/background/image6.jpg")',
        backgroundSize: "cover", // Ensures the image covers the entire area
        backgroundPosition: "center", // Centers the image within the grid item
        height: "100%", // Makes sure the Grid item takes the full height of its container
        minHeight: 300, // Sets a minimum height if needed
      }}
    >
      <SloganCarousel />
      <ProgramList />
      <Footer />
    </Box>
  );
}
